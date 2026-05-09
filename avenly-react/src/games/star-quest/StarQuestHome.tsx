import React from 'react';
import { motion } from 'framer-motion';
import { Play, Shield, Settings, Info, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../store/GameStore';

export const StarQuestHome: React.FC = () => {
  const { state } = useGame();
  const navigate = useNavigate();

  const modes = [
    { id: 'fraction-blaster', title: 'Fraction Blaster', desc: 'Arcade Space Action', icon: '🚀', color: 'from-cyan-500 to-blue-600' },
    { id: 'fraction-builder', title: 'Fraction Builder', desc: 'Tactile Construction', icon: '🏗️', color: 'from-purple-500 to-indigo-600' },
    { id: 'number-line-dash', title: 'Number Line Dash', desc: 'High-speed Precision', icon: '⚡', color: 'from-pink-500 to-rose-600' },
    { id: 'fraction-kitchen', title: 'Fraction Kitchen', desc: 'Slicing & Measuring', icon: '🍕', color: 'from-orange-500 to-yellow-600' },
  ];

  return (
    <div className="min-h-screen bg-game-background text-white relative overflow-hidden font-['Lexend']">
      {/* Dynamic Cosmic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(124,58,237,0.15)_0%,transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(0,242,255,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-[10%] right-[5%] w-96 h-96 bg-game-primary/10 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[10%] left-[5%] w-80 h-80 bg-game-secondary/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-12 pb-24">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="w-14 h-14 bg-gradient-to-br from-game-primary via-game-secondary to-game-accent rounded-2xl flex items-center justify-center text-3xl shadow-xl shadow-game-primary/20 cursor-pointer"
            >
              ✨
            </motion.div>
            <div>
              <h1 className="text-3xl font-black tracking-tight leading-none">STAR QUEST</h1>
              <span className="text-game-primary text-xs font-bold tracking-[0.3em] uppercase opacity-80">Fraction Mastery</span>
            </div>
          </div>
          
          <div className="flex gap-4">
             <button className="group p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10 hover:border-game-primary/30">
                <BarChart3 className="w-6 h-6 text-white/50 group-hover:text-game-primary transition-colors" />
             </button>
             <button className="group p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10 hover:border-game-accent/30">
                <Settings className="w-6 h-6 text-white/50 group-hover:text-game-accent transition-colors" />
             </button>
          </div>
        </header>

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row gap-16 items-center mb-32">
          <div className="flex-1 space-y-10">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full backdrop-blur-md"
            >
                <div className="w-2 h-2 bg-game-primary rounded-full animate-ping"></div>
                <span className="text-white/80 text-xs font-bold tracking-widest uppercase">ADAPTIVE SENSORY ENGINE ACTIVE</span>
            </motion.div>
            
            <div className="space-y-4">
              <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-7xl font-black leading-[1.05] tracking-tight"
              >
                  Master <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-game-primary via-white to-game-accent">Fractions</span> <br />
                  in Deep Space
              </motion.h2>
              <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-white/50 text-xl max-w-xl font-medium leading-relaxed"
              >
                  A neuro-inclusive journey designed for the ADHD mind. Use your eyes, hands, and focus to conquer the galaxy of numbers.
              </motion.p>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-6 pt-4"
            >
                <button 
                  onClick={() => navigate('/games/star-quest/play/blaster')}
                  className="group px-10 py-5 bg-game-primary text-black font-black rounded-[2rem] shadow-2xl shadow-game-primary/30 flex items-center gap-4 hover:scale-105 transition-all active:scale-95 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                    <Play className="fill-black w-6 h-6" /> 
                    <span className="relative z-10">LAUNCH MISSION</span>
                </button>
                <button className="px-10 py-5 bg-white/5 text-white font-bold rounded-[2rem] flex items-center gap-4 hover:bg-white/10 transition-all border border-white/10 hover:border-white/20">
                    <Shield className="w-5 h-5 text-white/60" /> PARENT DASHBOARD
                </button>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, type: 'spring', damping: 15 }}
            className="flex-1 relative group"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-game-primary/30 to-game-secondary/30 rounded-[4rem] blur-3xl opacity-50 group-hover:opacity-80 transition-opacity"></div>
             <img 
                src="https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1000&auto=format&fit=crop" 
                alt="Astronaut in Space" 
                className="w-full h-auto rounded-[4rem] shadow-[0_32px_64px_rgba(0,0,0,0.5)] border-2 border-white/20 relative z-10 animate-float"
             />
             
             {/* Decorative HUD Elements */}
             <div className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-game-primary/40 rounded-tr-3xl z-20"></div>
             <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-game-secondary/40 rounded-bl-3xl z-20"></div>
          </motion.div>
        </div>

        {/* Modes Grid */}
        <div className="space-y-10">
            <div className="flex items-end justify-between">
              <div>
                <h3 className="text-3xl font-black flex items-center gap-4">
                    CHOOSE YOUR MISSION
                </h3>
                <p className="text-white/40 font-medium mt-2">Unlock new galaxies by completing challenges</p>
              </div>
              <div className="hidden md:flex items-center gap-2 text-game-primary text-sm font-bold bg-game-primary/5 px-4 py-2 rounded-full border border-game-primary/20">
                <Info size={16} /> 4 MISSIONS AVAILABLE
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {modes.map((mode, i) => (
                    <motion.div
                        key={mode.id}
                        onClick={() => state.unlockedModes.includes(mode.id) && navigate(`/games/star-quest/play/${mode.id.replace('fraction-', '')}`)}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ y: -10 }}
                        className={`group relative p-10 rounded-[3rem] bg-white/5 border border-white/10 hover:border-white/20 transition-all cursor-pointer overflow-hidden backdrop-blur-sm`}
                    >
                        <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${mode.color} opacity-0 group-hover:opacity-20 blur-[50px] transition-all duration-500`}></div>
                        
                        <div className="relative z-10">
                          <div className="text-5xl mb-8 transform group-hover:scale-125 transition-transform duration-500 origin-left">
                            {mode.icon}
                          </div>
                          <h4 className="text-2xl font-black mb-3 tracking-tight">{mode.title}</h4>
                          <p className="text-white/50 text-sm font-medium leading-relaxed">{mode.desc}</p>
                          
                          <div className="mt-8 flex items-center gap-2">
                             <div className={`h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden`}>
                                <div className={`h-full bg-gradient-to-r ${mode.color} w-[60%]`}></div>
                             </div>
                             <span className="text-[10px] font-bold text-white/30">LEVEL 4</span>
                          </div>
                        </div>
                        
                        {!state.unlockedModes.includes(mode.id) && (
                             <div className="absolute inset-0 bg-game-background/80 backdrop-blur-md flex flex-col items-center justify-center z-20 rounded-[3rem] space-y-4">
                                <div className="bg-white/10 w-16 h-16 rounded-full border border-white/20 flex items-center justify-center text-2xl">
                                  🔒
                                </div>
                                <span className="text-xs font-bold tracking-widest text-white/40 uppercase">Locked</span>
                             </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
