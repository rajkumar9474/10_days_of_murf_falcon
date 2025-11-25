import logging
import json
import os
from datetime import datetime
from pathlib import Path

from dotenv import load_dotenv
from livekit.agents import (
    Agent,
    AgentSession,
    JobContext,
    JobProcess,
    MetricsCollectedEvent,
    RoomInputOptions,
    WorkerOptions,
    cli,
    metrics,
    tokenize,
    function_tool,
    RunContext
)
from livekit.plugins import murf, silero, google, deepgram, noise_cancellation
from livekit.plugins.turn_detector.multilingual import MultilingualModel

logger = logging.getLogger("agent")

load_dotenv(".env.local")

# Load FAQ data
FAQ_FILE = Path(__file__).parent / "company_faq.json"
with open(FAQ_FILE, 'r') as f:
    COMPANY_DATA = json.load(f)


class Assistant(Agent):
    def __init__(self) -> None:
        # Initialize lead data for this session
        self.lead_data = {
            "name": None,
            "student_class": None,  # Class 11, 12, or Dropper
            "target_exam": None,  # JEE or NEET
            "contact": None,  # Phone or email
            "current_preparation": None,  # Taking coaching, self-study, etc.
            "weak_subjects": None,
            "timeline": None  # When planning to enroll
        }
        super().__init__(
            instructions=f"""You are Harsha, an enthusiastic and helpful Sales Development Representative (SDR) for {COMPANY_DATA['company']['name']}.

Company Overview: {COMPANY_DATA['company']['description']}

Your role:
- Greet visitors warmly and professionally - introduce yourself as Harsha from Physics Wallah
- ALWAYS ask for their name early in the conversation - this is mandatory , wait for their response before proceeding
- Ask what they are preparing for (JEE, NEET, or both) and how you can help them
- Understand their needs, challenges, and exam preparation goals
- Answer questions about our products, pricing, and services using the available tools
- Naturally collect important information about the lead during the conversation
- Keep the conversation focused and engaging
- Be curious, friendly, and helpful

Important - You MUST collect these details during the conversation:
1. Student's name (ask early)
2. Current class (Class 11, Class 12, or Dropper)
3. Target exam (JEE or NEET)
4. Contact information - phone number OR email (ask for the best way to reach them)
5. Current preparation approach
6. Weak subjects if any
7. Timeline for enrollment

Remember:
- You are speaking via voice, so keep responses conversational and concise
- Avoid complex formatting, emojis, asterisks, or symbols
- Use the FAQ tool to answer specific questions about our company, products, and pricing
- Use the lead capture tools to store information as you learn it during natural conversation
- Don't ask for all information at once - gather it naturally throughout the conversation
- When asking for contact, ask "What's the best way to reach you - phone number or email?" and save whatever they provide
- When the user indicates they are done, use the end_call_summary tool to save all information

Key products: {', '.join([p['name'] for p in COMPANY_DATA['products']])}
""",
        )

    @function_tool
    async def search_faq(self, context: RunContext, question: str):
        """Search the company FAQ to answer questions about products, services, pricing, or company information.
        
        Use this tool when the user asks about:
        - What the company does
        - Product features and capabilities
        - Pricing and fees
        - How to get started
        - Who the service is for
        - Any other company or product related questions
        
        Args:
            question: The user's question about the company, products, or services
        """
        logger.info(f"Searching FAQ for: {question}")
        
        # Simple keyword matching - find the most relevant FAQ entry
        question_lower = question.lower()
        
        # Check pricing if that's what they're asking about
        if any(word in question_lower for word in ['price', 'cost', 'fee', 'charge', 'free', 'afford', 'cheap', 'expensive']):
            pricing_info = COMPANY_DATA['pricing']
            return f"Pricing: {pricing_info['lakshya_2year']}. {pricing_info['arjuna_1year']}. Test series: {pricing_info['test_series']}. We also have {pricing_info['youtube_free']}. {pricing_info['comparison']}."
        
        # Search through FAQ entries
        best_match = None
        best_score = 0
        
        for faq in COMPANY_DATA['faq']:
            # Simple scoring based on keyword overlap
            faq_words = set(faq['question'].lower().split() + faq['answer'].lower().split())
            question_words = set(question_lower.split())
            overlap = len(faq_words.intersection(question_words))
            
            if overlap > best_score:
                best_score = overlap
                best_match = faq
        
        if best_match and best_score > 0:
            return best_match['answer']
        else:
            # Return general company info
            return COMPANY_DATA['company']['description']
    
    @function_tool
    async def save_lead_name(self, context: RunContext, name: str):
        """Save the lead's name when they mention it during conversation.
        
        Args:
            name: The lead's full name
        """
        logger.info(f"Saving lead name: {name}")
        self.lead_data['name'] = name
        return f"Got it, {name}. Nice to meet you!"
    
    @function_tool
    async def save_student_class(self, context: RunContext, student_class: str):
        """Save the student's current class or status when they mention it.
        
        Args:
            student_class: The student's current class (e.g., Class 11, Class 12, Dropper, 12th pass)
        """
        logger.info(f"Saving student class: {student_class}")
        self.lead_data['student_class'] = student_class
        return f"Got it, you're in {student_class}. Perfect!"
    
    @function_tool
    async def save_contact(self, context: RunContext, contact: str):
        """Save the student's contact information when they provide it.
        
        Args:
            contact: The student's phone number or email address
        """
        logger.info(f"Saving contact: {contact}")
        self.lead_data['contact'] = contact
        return "Perfect, I have your contact details."
    
    @function_tool
    async def save_target_exam(self, context: RunContext, target_exam: str):
        """Save the student's target exam when they mention it.
        
        Args:
            target_exam: The exam student is preparing for (e.g., JEE Main, JEE Advanced, NEET, Both JEE and NEET)
        """
        logger.info(f"Saving target exam: {target_exam}")
        self.lead_data['target_exam'] = target_exam
        return f"Excellent! So you're preparing for {target_exam}. That's great!"
    
    @function_tool
    async def save_current_preparation(self, context: RunContext, current_preparation: str):
        """Save information about the student's current preparation status.
        
        Args:
            current_preparation: How student is currently preparing (e.g., taking coaching, self-study, school only, dropped year)
        """
        logger.info(f"Saving current preparation: {current_preparation}")
        self.lead_data['current_preparation'] = current_preparation
        return "I understand. I've noted your current preparation approach."
    
    @function_tool
    async def save_weak_subjects(self, context: RunContext, weak_subjects: str):
        """Save information about subjects where the student needs help.
        
        Args:
            weak_subjects: Subjects student struggles with (e.g., Physics, Chemistry, Mathematics, Biology, specific topics)
        """
        logger.info(f"Saving weak subjects: {weak_subjects}")
        self.lead_data['weak_subjects'] = weak_subjects
        return "Don't worry, our teachers are excellent at making difficult topics easy to understand!"
    
    @function_tool
    async def save_timeline(self, context: RunContext, timeline: str):
        """Save when the student plans to enroll or start preparation.
        
        Args:
            timeline: When they plan to start (e.g., immediately, next week, next month, after exams, just exploring)
        """
        logger.info(f"Saving timeline: {timeline}")
        self.lead_data['timeline'] = timeline
        return "Great! I've noted when you're planning to start."
    
    @function_tool
    async def end_call_summary(self, context: RunContext):
        """Generate and save the final lead summary when the call is ending.
        
        Use this when the user indicates they are done, finished, or ready to end the call.
        This will create a summary of all collected information.
        """
        logger.info("Generating end-of-call summary")
        
        # Save to JSON file
        output_dir = Path(__file__).parent.parent / "KMS" / "logs"
        output_dir.mkdir(parents=True, exist_ok=True)
        
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output_file = output_dir / f"lead_{timestamp}.json"
        
        summary_data = {
            "timestamp": datetime.now().isoformat(),
            "lead_info": self.lead_data.copy(),
            "company": COMPANY_DATA['company']['name']
        }
        
        with open(output_file, 'w') as f:
            json.dump(summary_data, f, indent=2)
        
        logger.info(f"Lead data saved to {output_file}")
        
        # Generate verbal summary
        summary_parts = []
        if self.lead_data['name']:
            summary_parts.append(f"We spoke with {self.lead_data['name']}")
        if self.lead_data['student_class']:
            summary_parts.append(f"who is in {self.lead_data['student_class']}")
        if self.lead_data['target_exam']:
            summary_parts.append(f"preparing for {self.lead_data['target_exam']}")
        if self.lead_data['current_preparation']:
            summary_parts.append(f"Currently {self.lead_data['current_preparation']}")
        if self.lead_data['weak_subjects']:
            summary_parts.append(f"Needs help with {self.lead_data['weak_subjects']}")
        if self.lead_data['timeline']:
            summary_parts.append(f"Planning to start: {self.lead_data['timeline']}")
        
        verbal_summary = ". ".join(summary_parts) if summary_parts else "We had a great conversation about your exam preparation"
        
        return f"Thank you so much for your time today! {verbal_summary}. I've saved all your information and our academic counselor will reach out to you soon to help you with the best batch and study plan. All the best for your preparation! Padhega India Tab Badhega India!"


def prewarm(proc: JobProcess):
    proc.userdata["vad"] = silero.VAD.load()
    # Preload FAQ data
    logger.info(f"Preloaded FAQ data for {COMPANY_DATA['company']['name']}")


async def entrypoint(ctx: JobContext):
    # Logging setup
    # Add any other context you want in all log entries here
    ctx.log_context_fields = {
        "room": ctx.room.name,
    }

    # Set up a voice AI pipeline using OpenAI, Cartesia, AssemblyAI, and the LiveKit turn detector
    session = AgentSession(
        # Speech-to-text (STT) is your agent's ears, turning the user's speech into text that the LLM can understand
        # See all available models at https://docs.livekit.io/agents/models/stt/
        stt=deepgram.STT(model="nova-3"),
        # A Large Language Model (LLM) is your agent's brain, processing user input and generating a response
        # See all available models at https://docs.livekit.io/agents/models/llm/
        llm=google.LLM(
                model="gemini-2.5-flash",
            ),
        # Text-to-speech (TTS) is your agent's voice, turning the LLM's text into speech that the user can hear
        # See all available models as well as voice selections at https://docs.livekit.io/agents/models/tts/
        tts=murf.TTS(
                voice="en-US-matthew", 
                style="Conversation",
                tokenizer=tokenize.basic.SentenceTokenizer(min_sentence_len=2),
                text_pacing=True
            ),
        # VAD and turn detection are used to determine when the user is speaking and when the agent should respond
        # See more at https://docs.livekit.io/agents/build/turns
        turn_detection=MultilingualModel(),
        vad=ctx.proc.userdata["vad"],
        # allow the LLM to generate a response while waiting for the end of turn
        # See more at https://docs.livekit.io/agents/build/audio/#preemptive-generation
        preemptive_generation=True,
    )

    # To use a realtime model instead of a voice pipeline, use the following session setup instead.
    # (Note: This is for the OpenAI Realtime API. For other providers, see https://docs.livekit.io/agents/models/realtime/))
    # 1. Install livekit-agents[openai]
    # 2. Set OPENAI_API_KEY in .env.local
    # 3. Add `from livekit.plugins import openai` to the top of this file
    # 4. Use the following session setup instead of the version above
    # session = AgentSession(
    #     llm=openai.realtime.RealtimeModel(voice="marin")
    # )

    # Metrics collection, to measure pipeline performance
    # For more information, see https://docs.livekit.io/agents/build/metrics/
    usage_collector = metrics.UsageCollector()

    @session.on("metrics_collected")
    def _on_metrics_collected(ev: MetricsCollectedEvent):
        metrics.log_metrics(ev.metrics)
        usage_collector.collect(ev.metrics)

    async def log_usage():
        summary = usage_collector.get_summary()
        logger.info(f"Usage: {summary}")

    ctx.add_shutdown_callback(log_usage)

    # # Add a virtual avatar to the session, if desired
    # # For other providers, see https://docs.livekit.io/agents/models/avatar/
    # avatar = hedra.AvatarSession(
    #   avatar_id="...",  # See https://docs.livekit.io/agents/models/avatar/plugins/hedra
    # )
    # # Start the avatar and wait for it to join
    # await avatar.start(session, room=ctx.room)

    # Start the session, which initializes the voice pipeline and warms up the models
    await session.start(
        agent=Assistant(),
        room=ctx.room,
        room_input_options=RoomInputOptions(
            # For telephony applications, use `BVCTelephony` for best results
            noise_cancellation=noise_cancellation.BVC(),
        ),
    )

    # Join the room and connect to the user
    await ctx.connect()


if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint, prewarm_fnc=prewarm))
