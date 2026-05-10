import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../../../store/GameStore';
import { CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const FractionBuilder: React.FC = () => {
    const { addScore } = useGame();
    const [target, setTarget] = useState({ num: 3, den: 4 });
    const [selected, setSelected] = useState<number[]>([]);

    const togglePiece = (idx: number) => {
        if (selected.includes(idx)) {
            setSelected(selected.filter(i => i !== idx));
        } else if (selected.length < target.den) {
            setSelected([...selected, idx]);
        }
    };

    const checkResult = () => {
        if (selected.length === target.num) {
            addScore(200);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
            // Reset with new target
            const nextDen = Math.floor(Math.random() * 5) + 4;
            setTarget({
                num: Math.floor(Math.random() * (nextDen - 1)) + 1,
                den: nextDen
            });
            setSelected([]);
        }
    };

    return (
        <div className="bg-[#050518] backdrop-blur-2xl rounded-[4rem] p-16 border-2 border-white/10 max-w-5xl mx-auto shadow-[0_32px_64px_rgba(0,0,0,0.4)] relative overflow-hidden font-['Lexend']">
            <div className="relative z-10">
                <div className="text-center mb-16">
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-1.5 bg-game-primary/10 border border-game-primary/20 rounded-full text-game-primary text-[10px] font-black tracking-[0.2em] uppercase mb-4"
                    >
                        Engineering Phase
                    </motion.div>
                    <h2 className="text-5xl font-black mb-4 tracking-tight text-white">FRACTION BUILDER</h2>
                    <p className="text-white/40 text-lg font-medium">Construct the target: <span className="text-game-primary font-black ml-2 px-3 py-1 bg-game-primary/10 rounded-lg">{target.num} / {target.den}</span></p>
                </div>

                <div className="flex flex-col lg:flex-row gap-20 items-center justify-center">
                    {/* Visual Model */}
                    <div className="relative w-80 h-80 group">
                        <div className="absolute inset-[-40px] bg-game-primary/5 blur-[60px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
                        
                        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90 drop-shadow-[0_0_20px_rgba(0,242,255,0.2)]">
                            {/* Background Circle */}
                            <circle cx="50" cy="50" r="46" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
                            
                            {/* Slices */}
                            {[...Array(target.den)].map((_, i) => {
                                const angle = (360 / target.den);
                                const startAngle = i * angle;
                                const endAngle = (i + 1) * angle;
                                
                                const x1 = 50 + 45 * Math.cos((startAngle * Math.PI) / 180);
                                const y1 = 50 + 45 * Math.sin((startAngle * Math.PI) / 180);
                                const x2 = 50 + 45 * Math.cos((endAngle * Math.PI) / 180);
                                const y2 = 50 + 45 * Math.sin((endAngle * Math.PI) / 180);
                                
                                const largeArcFlag = angle > 180 ? 1 : 0;
                                const d = `M 50 50 L ${x1} ${y1} A 45 45 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
                                
                                const isSelected = i < selected.length;

                                return (
                                    <motion.path
                                        key={i}
                                        d={d}
                                        fill={isSelected ? "url(#sliceGradient)" : "transparent"}
                                        stroke="rgba(255,255,255,0.15)"
                                        strokeWidth="1.5"
                                        initial={false}
                                        animate={{ 
                                            fill: isSelected ? "url(#sliceGradient)" : "rgba(255,255,255,0.02)",
                                            scale: isSelected ? 1.05 : 1,
                                        }}
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    />
                                );
                            })}
                            <defs>
                                <linearGradient id="sliceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#00f2ff" />
                                    <stop offset="100%" stopColor="#7c3aed" />
                                </linearGradient>
                            </defs>
                        </svg>
                        
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <motion.div 
                                animate={{ scale: [1, 1.05, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="bg-[#050518]/90 backdrop-blur-xl w-32 h-32 rounded-full border-2 border-white/10 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(0,242,255,0.2)]"
                            >
                                 <span className="text-4xl font-black text-white">{selected.length}</span>
                                 <div className="w-14 h-1 bg-white/20 my-1.5 rounded-full"></div>
                                 <span className="text-xl font-bold text-white/40">{target.den}</span>
                            </motion.div>
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col gap-10 w-full lg:w-80">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center px-1">
                                <span className="text-xs font-black text-white/40 uppercase tracking-widest">Toggle Blocks</span>
                                <span className="text-xs font-bold text-game-primary">{selected.length} of {target.den}</span>
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {[...Array(target.den)].map((_, i) => (
                                    <motion.button
                                        key={i}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => togglePiece(i)}
                                        className={`w-16 h-16 rounded-2xl border-2 transition-all flex items-center justify-center text-xl font-black ${
                                            i < selected.length 
                                            ? 'bg-game-primary/20 border-game-primary text-game-primary shadow-[0_0_20px_rgba(0,242,255,0.2)]' 
                                            : 'bg-white/5 border-white/10 text-white/20 hover:border-white/30'
                                        }`}
                                    >
                                        {i + 1}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        <button
                            disabled={selected.length === 0}
                            onClick={checkResult}
                            className={`w-full py-6 rounded-3xl flex items-center justify-center gap-4 font-black text-xl transition-all relative overflow-hidden ${
                                selected.length === target.num
                                ? 'bg-game-primary text-black shadow-[0_20px_40px_rgba(0,242,255,0.3)] hover:scale-105'
                                : 'bg-white/5 text-white/20 grayscale cursor-not-allowed'
                            }`}
                        >
                            <CheckCircle2 className="w-7 h-7" /> 
                            <span>SUBMIT MODEL</span>
                        </button>
                        
                        <p className="text-center text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">All systems operational</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
