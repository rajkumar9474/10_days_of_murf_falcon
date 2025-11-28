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



class Assistant(Agent):
    def __init__(self) -> None:
        super().__init__(
            instructions="""You are a friendly and helpful food & grocery ordering assistant for QuickMart Express.
            You help customers order groceries, snacks, and prepared food items through natural conversation.
            
            Your capabilities:
            - Add items to cart with quantities
            - Remove items from cart
            - Update quantities of items already in cart
            - Show what's currently in the cart
            - Intelligently add ingredients for recipes (e.g., "ingredients for pasta")
            - Place orders when the customer is ready
            
            Guidelines:
            - Be conversational and friendly
            - Confirm actions clearly (e.g., "I've added 2 loaves of bread to your cart")
            - Ask for clarification when needed (quantity, size, brand preferences)
            - Suggest items when appropriate
            - Keep responses concise and natural for voice interaction
            - Don't use emojis, asterisks, or complex formatting
            - When placing an order, ask for the customer's name
            """,
        )
        
        # Load catalog and recipes
        self.data_dir = Path(__file__).parent / "data"
        self.catalog = self._load_catalog()
        self.recipes = self._load_recipes()
        
        # Initialize cart (item_id -> quantity)
        self.cart = {}
    
    def _load_catalog(self):
        """Load the product catalog from JSON"""
        catalog_path = self.data_dir / "catalog.json"
        try:
            with open(catalog_path, 'r') as f:
                data = json.load(f)
                # Create a dict for easy lookup by ID
                return {item['id']: item for item in data['items']}
        except Exception as e:
            logger.error(f"Failed to load catalog: {e}")
            return {}
    
    def _load_recipes(self):
        """Load recipe mappings from JSON"""
        recipes_path = self.data_dir / "recipes.json"
        try:
            with open(recipes_path, 'r') as f:
                data = json.load(f)
                return data['recipes']
        except Exception as e:
            logger.error(f"Failed to load recipes: {e}")
            return {}
    
    def _find_item_by_name(self, item_name: str):
        """Find an item in catalog by name (fuzzy matching)"""
        item_name_lower = item_name.lower()
        
        # First try exact match
        for item_id, item in self.catalog.items():
            if item['name'].lower() == item_name_lower:
                return item_id, item
        
        # Then try partial match
        for item_id, item in self.catalog.items():
            if item_name_lower in item['name'].lower():
                return item_id, item
        
        return None, None
    
    @function_tool
    async def add_to_cart(self, context: RunContext, item_name: str, quantity: int = 1):
        """Add an item to the shopping cart.
        
        Use this tool when the customer wants to add a specific item to their cart.
        
        Args:
            item_name: The name of the item to add (e.g., "bread", "milk", "peanut butter")
            quantity: The number of items to add (default is 1)
        """
        logger.info(f"Adding to cart: {item_name} x {quantity}")
        
        item_id, item = self._find_item_by_name(item_name)
        
        if not item:
            return f"Sorry, I couldn't find '{item_name}' in our catalog. Could you try a different item or be more specific?"
        
        # Add to cart or update quantity
        if item_id in self.cart:
            self.cart[item_id] += quantity
        else:
            self.cart[item_id] = quantity
        
        total_qty = self.cart[item_id]
        return f"Added {quantity} {item['name']} to your cart. You now have {total_qty} in total."
    
    @function_tool
    async def remove_from_cart(self, context: RunContext, item_name: str):
        """Remove an item completely from the shopping cart.
        
        Use this tool when the customer wants to remove an item from their cart.
        
        Args:
            item_name: The name of the item to remove
        """
        logger.info(f"Removing from cart: {item_name}")
        
        item_id, item = self._find_item_by_name(item_name)
        
        if not item:
            return f"I couldn't find '{item_name}' in the catalog."
        
        if item_id not in self.cart:
            return f"{item['name']} is not in your cart."
        
        del self.cart[item_id]
        return f"Removed {item['name']} from your cart."
    
    @function_tool
    async def update_quantity(self, context: RunContext, item_name: str, quantity: int):
        """Update the quantity of an item already in the cart.
        
        Use this tool when the customer wants to change the quantity of an item.
        
        Args:
            item_name: The name of the item to update
            quantity: The new quantity (must be greater than 0)
        """
        logger.info(f"Updating quantity: {item_name} to {quantity}")
        
        if quantity <= 0:
            return "Quantity must be greater than 0. Use remove_from_cart to remove items."
        
        item_id, item = self._find_item_by_name(item_name)
        
        if not item:
            return f"I couldn't find '{item_name}' in the catalog."
        
        if item_id not in self.cart:
            return f"{item['name']} is not in your cart. Use add_to_cart to add it first."
        
        self.cart[item_id] = quantity
        return f"Updated {item['name']} quantity to {quantity}."
    
    @function_tool
    async def view_cart(self, context: RunContext):
        """Show the current contents of the shopping cart with prices and total.
        
        Use this tool when the customer asks what's in their cart or wants to review their order.
        """
        logger.info("Viewing cart")
        
        if not self.cart:
            return "Your cart is empty."
        
        cart_items = []
        total = 0
        
        for item_id, quantity in self.cart.items():
            item = self.catalog[item_id]
            item_total = item['price'] * quantity
            total += item_total
            cart_items.append(f"{item['name']} x {quantity} - ₹{item_total}")
        
        cart_summary = "\n".join(cart_items)
        return f"Your cart:\n{cart_summary}\n\nTotal: ₹{total}"
    
    @function_tool
    async def add_ingredients_for(self, context: RunContext, recipe_name: str):
        """Add all ingredients needed for a specific recipe or meal.
        
        Use this tool when the customer asks for ingredients for a specific dish or meal.
        
        Args:
            recipe_name: The name of the recipe or meal (e.g., "pasta", "peanut butter sandwich", "salad")
        """
        logger.info(f"Adding ingredients for: {recipe_name}")
        
        recipe_name_lower = recipe_name.lower()
        
        # Find matching recipe
        recipe = None
        for recipe_key, recipe_data in self.recipes.items():
            if recipe_key.lower() == recipe_name_lower or recipe_name_lower in recipe_key.lower():
                recipe = recipe_data
                break
        
        if not recipe:
            return f"Sorry, I don't have a recipe for '{recipe_name}'. I can help you add specific items instead."
        
        # Add all items from the recipe
        added_items = []
        for item_id in recipe['items']:
            if item_id in self.catalog:
                if item_id in self.cart:
                    self.cart[item_id] += 1
                else:
                    self.cart[item_id] = 1
                added_items.append(self.catalog[item_id]['name'])
        
        items_list = ", ".join(added_items)
        return f"I've added the ingredients for {recipe['description']}: {items_list}."
    
    @function_tool
    async def place_order(self, context: RunContext, customer_name: str):
        """Place the order and save it to a file.
        
        Use this tool when the customer is ready to finalize and place their order.
        
        Args:
            customer_name: The customer's name for the order
        """
        logger.info(f"Placing order for: {customer_name}")
        
        if not self.cart:
            return "Your cart is empty. Please add some items before placing an order."
        
        # Calculate order details
        order_items = []
        total = 0
        
        for item_id, quantity in self.cart.items():
            item = self.catalog[item_id]
            item_total = item['price'] * quantity
            total += item_total
            order_items.append({
                "item_id": item_id,
                "name": item['name'],
                "quantity": quantity,
                "price_per_unit": item['price'],
                "total": item_total
            })
        
        # Create order object
        timestamp = datetime.now()
        order_id = f"ORD{timestamp.strftime('%Y%m%d%H%M%S')}"
        
        order = {
            "order_id": order_id,
            "customer_name": customer_name,
            "timestamp": timestamp.isoformat(),
            "items": order_items,
            "total": total,
            "status": "received"
        }
        
        # Save order to file
        orders_dir = self.data_dir / "orders"
        orders_dir.mkdir(exist_ok=True)
        
        order_file = orders_dir / f"{order_id}.json"
        
        try:
            with open(order_file, 'w') as f:
                json.dump(order, f, indent=2)
            
            # Clear the cart
            self.cart = {}
            
            return f"Order placed successfully! Your order ID is {order_id}. Total amount: ₹{total}. Thank you for shopping with QuickMart Express, {customer_name}!"
        
        except Exception as e:
            logger.error(f"Failed to save order: {e}")
            return "Sorry, there was an error placing your order. Please try again."



def prewarm(proc: JobProcess):
    proc.userdata["vad"] = silero.VAD.load()


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
