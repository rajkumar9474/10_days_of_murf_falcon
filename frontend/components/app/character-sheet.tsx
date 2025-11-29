'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface CharacterSheetProps {
    className?: string;
}

export const CharacterSheet = ({ className }: CharacterSheetProps) => {
    const [isOpen, setIsOpen] = React.useState(false);

    // Mock character data - in a real implementation, this would come from the agent's game state
    const character = {
        name: 'Adventurer',
        class: 'Wanderer',
        hp: 20,
        maxHp: 20,
        inventory: ['rusty sword', 'leather pouch with 10 gold coins'],
        traits: ['curious', 'brave']
    };

    return (
        <div className={cn('fixed right-4 top-4 z-50', className)}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="character-panel px-5 py-3 font-semibold text-sm hover:scale-105 transition-all duration-200 cursor-pointer shadow-lg"
                style={{
                    color: 'var(--fantasy-ink)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
                }}
            >
                📜 Character Sheet
            </button>

            {isOpen && (
                <div
                    className="character-panel mt-2 min-w-[280px] space-y-3 animate-in fade-in slide-in-from-top-2 duration-300"
                    style={{ color: 'var(--fantasy-ink)' }}
                >
                    <div className="border-b pb-2" style={{ borderColor: 'var(--fantasy-gold-dark)' }}>
                        <h3 className="font-bold text-lg">{character.name}</h3>
                        <p className="text-sm opacity-80">{character.class}</p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm mb-1">Health</h4>
                        <div className="flex items-center gap-2">
                            <div className="flex-1 h-3 rounded-full overflow-hidden" style={{ background: 'var(--fantasy-scroll)' }}>
                                <div
                                    className="h-full rounded-full transition-all"
                                    style={{
                                        width: `${(character.hp / character.maxHp) * 100}%`,
                                        background: 'var(--fantasy-gold)'
                                    }}
                                />
                            </div>
                            <span className="text-xs font-mono font-semibold">
                                {character.hp}/{character.maxHp}
                            </span>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm mb-1">Inventory</h4>
                        <ul className="text-xs space-y-1">
                            {character.inventory.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-1">
                                    <span className="opacity-60">•</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-sm mb-1">Traits</h4>
                        <div className="flex flex-wrap gap-1">
                            {character.traits.map((trait, idx) => (
                                <span
                                    key={idx}
                                    className="text-xs px-2 py-0.5 rounded"
                                    style={{
                                        background: 'var(--fantasy-scroll)',
                                        color: 'var(--fantasy-ink)'
                                    }}
                                >
                                    {trait}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
