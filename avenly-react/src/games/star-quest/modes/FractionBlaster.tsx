import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../../store/GameStore';
import confetti from 'canvas-confetti';

interface Fraction {
    num: number;
    den: number;
}

interface Asteroid {
    id: number;
    fraction: Fraction;
    x: number;
    y: number;
    speed: number;
}

export const FractionBlaster: React.FC = () => {
    const { addScore, state } = useGame();
    const [target, setTarget] = useState<Fraction>({ num: 1, den: 2 });
    const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
    const [gameOver, setGameOver] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);

    const generateFraction = useCallback(() => {
        const den = Math.floor(Math.random() * 8) + 2;
        const num = Math.floor(Math.random() * (den - 1)) + 1;
        return { num, den };
    }, []);

    const spawnAsteroid = useCallback(() => {
        const isTarget = Math.random() > 0.6;
        const fraction = isTarget ? { ...target } : generateFraction();
        const id = Math.random();
        setAsteroids(prev => [...prev, {
            id,
            fraction,
            x: Math.random() * 80 + 10,
            y: -10,
            speed: (Math.random() * 2 + 1) * (1 + state.level * 0.1)
        }]);
    }, [target, generateFraction, state.level]);

    useEffect(() => {
        const interval = setInterval(spawnAsteroid, 1500 / (1 + state.level * 0.2));
        return () => clearInterval(interval);
    }, [spawnAsteroid, state.level]);

    useEffect(() => {
        const moveInterval = setInterval(() => {
            setAsteroids(prev => prev.map(a => ({ ...a, y: a.y + a.speed }))
                                     .filter(a => a.y < 110));
        }, 30);
        return () => clearInterval(moveInterval);
    }, []);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setGameOver(true);
        }
    }, [timeLeft]);

    const handleShoot = (asteroid: Asteroid) => {
        const isCorrect = asteroid.fraction.num / asteroid.fraction.den === target.num / target.den;
        
        if (isCorrect) {
            addScore(100);
            confetti({
                particleCount: 40,
                spread: 70,
                origin: { x: asteroid.x / 100, y: asteroid.y / 100 },
                colors: ['#00f2ff', '#7000ff']
            });
            setTarget(generateFraction());
        } else {
            // Shake effect or feedback
        }

        setAsteroids(prev => prev.filter(a => a.id !== asteroid.id));
    };

    return (
        <div className="relative w-full h-[650px] bg-[#050518] rounded-[3.5rem] border-2 border-white/10 overflow-hidden cursor-crosshair shadow-2xl">
            {/* Dynamic Space Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.1)_0%,transparent_70%)]"></div>
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(0,242,255,0.08)_0%,transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
            </div>

            {/* Target Display */}
            <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20 text-center">
                <motion.div 
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white/5 backdrop-blur-2xl border border-white/20 px-10 py-6 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                >
                    <div className="text-white/40 text-[10px] font-black uppercase tracking-[0.3em] mb-3">Target Fraction</div>
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col items-center">
                            <span className="text-4xl font-black text-game-primary drop-shadow-[0_0_15px_rgba(0,242,255,0.5)]">{target.num}</span>
                            <div className="w-10 h-1.5 bg-white/20 rounded-full my-1.5"></div>
                            <span className="text-4xl font-black text-game-primary drop-shadow-[0_0_15px_rgba(0,242,255,0.5)]">{target.den}</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Timer & Stats */}
            <div className="absolute top-10 right-10 z-20 flex flex-col gap-4">
                 <div className="bg-rose-500/10 backdrop-blur-xl border border-rose-500/30 px-6 py-3 rounded-2xl flex items-center gap-4 shadow-lg shadow-rose-500/10">
                    <div className="w-2.5 h-2.5 bg-rose-500 rounded-full animate-pulse"></div>
                    <span className="font-mono text-2xl font-black text-rose-500">{timeLeft}s</span>
                 </div>
                 <div className="bg-game-primary/10 backdrop-blur-xl border border-game-primary/30 px-6 py-3 rounded-2xl flex items-center gap-4 shadow-lg shadow-game-primary/10">
                    <div className="w-2.5 h-2.5 bg-game-primary rounded-full"></div>
                    <span className="font-mono text-2xl font-black text-game-primary">{state.score}</span>
                 </div>
            </div>

            {/* Game Canvas / Asteroids */}
            <AnimatePresence>
                {asteroids.map(asteroid => (
                    <motion.div
                        key={asteroid.id}
                        className="absolute w-24 h-24 -ml-12 -mt-12 flex items-center justify-center cursor-pointer z-10"
                        style={{ left: `${asteroid.x}%`, top: `${asteroid.y}%` }}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        onClick={() => handleShoot(asteroid)}
                    >
                        <div className="relative group">
                             {/* Asteroid Glow */}
                             <div className="absolute inset-[-20px] bg-gradient-to-br from-game-primary/30 to-game-secondary/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                             
                             <div className="relative w-20 h-20 bg-white/5 border-2 border-white/10 rounded-[2rem] backdrop-blur-xl flex flex-col items-center justify-center group-hover:scale-110 group-hover:border-game-primary/50 group-hover:bg-game-primary/10 transition-all duration-300 shadow-2xl">
                                <span className="text-xl font-black text-white leading-none">{asteroid.fraction.num}</span>
                                <div className="w-8 h-1 bg-white/20 my-1.5 rounded-full"></div>
                                <span className="text-xl font-black text-white leading-none">{asteroid.fraction.den}</span>
                                
                                {/* Corner Accents */}
                                <div className="absolute top-2 left-2 w-1.5 h-1.5 border-t border-l border-white/20"></div>
                                <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-b border-r border-white/20"></div>
                             </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Space Particles */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {[...Array(40)].map((_, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0.2, 0.5, 0.2] }}
                        transition={{ duration: Math.random() * 3 + 2, repeat: Infinity }}
                        className="absolute bg-white rounded-full shadow-[0_0_10px_white]" 
                        style={{ 
                            width: Math.random() * 2 + 1, 
                            height: Math.random() * 2 + 1, 
                            left: `${Math.random() * 100}%`, 
                            top: `${Math.random() * 100}%`,
                        }}
                    ></motion.div>
                ))}
                
                {/* Colorful Nebulas */}
                <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-game-primary/5 rounded-full blur-[80px] animate-pulse"></div>
                <div className="absolute bottom-[20%] right-[10%] w-64 h-64 bg-game-secondary/5 rounded-full blur-[80px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {gameOver && (
                <div className="absolute inset-0 bg-game-background/95 z-50 flex items-center justify-center backdrop-blur-xl">
                    <motion.div 
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-center p-16 rounded-[4rem] bg-white/5 border border-white/10"
                    >
                        <div className="text-7xl mb-8">🏆</div>
                        <h2 className="text-6xl font-black mb-4 tracking-tight">MISSION COMPLETE</h2>
                        <p className="text-white/40 text-xl mb-12 font-medium">You mastered <span className="text-game-primary font-black">{state.score}</span> fractions!</p>
                        <div className="flex gap-6 justify-center">
                          <button 
                              onClick={() => window.location.reload()}
                              className="px-10 py-5 bg-game-primary text-black font-black rounded-2xl shadow-xl shadow-game-primary/20 hover:scale-105 transition-transform"
                          >
                              PLAY AGAIN
                          </button>
                          <button 
                              onClick={() => window.history.back()}
                              className="px-10 py-5 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all"
                          >
                              BACK TO BASE
                          </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};
