import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Eye, Video, MousePointer2, CheckCircle2 } from 'lucide-react';

export const PrivacyConsentModal: React.FC<{ onAccept: () => void }> = ({ onAccept }) => {
  const [isOpen, setIsOpen] = useState(true);

  const features = [
    { icon: <Eye className="w-5 h-5" />, title: 'Eye Tracking', desc: 'Analyzes where you look to help you stay focused.' },
    { icon: <Video className="w-5 h-5" />, title: 'Face Detection', desc: 'Ensures you are present and engaged with the mission.' },
    { icon: <MousePointer2 className="w-5 h-5" />, title: 'Interaction Analytics', desc: 'Measures confidence through your movements.' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-game-background/80 backdrop-blur-xl">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-2xl w-full bg-game-background border border-white/10 rounded-[3rem] p-12 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-game-primary/10 blur-[100px] -mr-32 -mt-32"></div>
        
        <div className="relative z-10 text-center">
            <div className="w-20 h-20 bg-game-primary/20 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-game-primary/30">
                <ShieldCheck className="w-10 h-10 text-game-primary" />
            </div>
            
            <h2 className="text-4xl font-black mb-4">Mission Privacy Protocol</h2>
            <p className="text-white/60 mb-12">To provide a neuroadaptive experience, Star Quest uses advanced sensors. Your privacy is our top priority.</p>

            <div className="grid grid-cols-1 gap-4 text-left mb-12">
                {features.map((f, i) => (
                    <div key={i} className="flex gap-4 p-6 bg-white/5 rounded-2xl border border-white/5">
                        <div className="text-game-primary mt-1">{f.icon}</div>
                        <div>
                            <div className="font-bold text-lg mb-1">{f.title}</div>
                            <div className="text-sm text-white/40">{f.desc}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-game-primary/5 border border-game-primary/20 p-6 rounded-2xl mb-12 text-left flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-game-primary shrink-0" />
                <p className="text-sm text-game-primary/80">
                    <strong>Local Processing:</strong> All sensor data is processed directly on your device. Camera feeds are never uploaded or stored.
                </p>
            </div>

            <button 
                onClick={() => {
                    setIsOpen(false);
                    onAccept();
                }}
                className="w-full py-5 bg-game-primary text-black font-black text-xl rounded-2xl shadow-xl shadow-game-primary/20 hover:scale-[1.02] transition-transform"
            >
                I AGREE & START MISSION
            </button>
            <p className="mt-6 text-white/30 text-xs">By clicking, you consent to the use of these sensors for this session.</p>
        </div>
      </motion.div>
    </div>
  );
};
