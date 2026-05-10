import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../../store/GameStore';
import { Activity, Zap, Target, Award } from 'lucide-react';

export const HUD: React.FC = () => {
  const { state } = useGame();

  const getFocusColor = () => {
    if (state.focusScore > 70) return 'text-cyan-400 shadow-cyan-500/50';
    if (state.focusScore > 30) return 'text-yellow-400 shadow-yellow-500/50';
    return 'text-rose-500 shadow-rose-500/50';
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 p-6 flex flex-col justify-between">
      {/* Top Bar */}
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <StatCard 
            icon={<Target className="w-5 h-5" />} 
            label="SCORE" 
            value={state.score.toLocaleString()} 
            color="cyan"
          />
          <StatCard 
            icon={<Zap className="w-5 h-5" />} 
            label="STREAK" 
            value={`${state.streak}x`} 
            color="purple"
          />
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="bg-game-background/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-4 min-w-[200px]">
            <Activity className={`w-6 h-6 ${getFocusColor()}`} />
            <div className="flex-1">
              <div className="flex justify-between text-[10px] text-white/50 mb-1">
                <span>FOCUS METER</span>
                <span>{Math.round(state.focusScore)}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className={`h-full ${state.focusScore > 70 ? 'bg-cyan-400' : state.focusScore > 30 ? 'bg-yellow-400' : 'bg-rose-500'}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${state.focusScore}%` }}
                  transition={{ type: 'spring', stiffness: 50 }}
                />
              </div>
            </div>
          </div>
          
          <AnimatePresence>
            {state.multiplier > 1 && (
              <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="bg-game-accent/20 border border-game-accent/50 text-game-accent px-3 py-1 rounded-full text-xs font-bold"
              >
                {state.multiplier}X MULTIPLIER
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between items-end">
        <div className="flex gap-2">
            <div className="bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                <div className="text-[10px] text-white/40">LEVEL</div>
                <div className="text-xl font-bold text-white leading-none">{state.level}</div>
            </div>
        </div>

        <div className="flex items-center gap-4 bg-white/5 backdrop-blur-sm p-1 rounded-2xl border border-white/10">
            {state.unlockedModes.map(mode => (
                <div key={mode} className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-white/60">
                    <Award className="w-5 h-5" />
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode, label: string, value: string, color: 'cyan' | 'purple' }> = ({ icon, label, value, color }) => (
  <div className="bg-game-background/80 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-4 min-w-[140px]">
    <div className={`p-2 rounded-lg ${color === 'cyan' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-purple-500/10 text-purple-400'}`}>
      {icon}
    </div>
    <div>
      <div className="text-[10px] text-white/40 font-medium tracking-wider uppercase">{label}</div>
      <div className="text-xl font-black text-white leading-tight">{value}</div>
    </div>
  </div>
);
