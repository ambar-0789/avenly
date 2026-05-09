import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { GameProvider } from '../../store/GameStore';
import { StarQuestHome } from './StarQuestHome';
import { FractionBlaster } from './modes/FractionBlaster';
import { FractionBuilder } from './modes/FractionBuilder';
import { HUD } from '../../components/star-quest/HUD';
import { PrivacyConsentModal } from '../../components/star-quest/PrivacyConsentModal';
import { useEyeTracking } from '../../sensors/useEyeTracking';
import { useFaceTracking } from '../../sensors/useFaceTracking';
import { useEngagementEngine } from '../../adaptive-engine/useEngagementEngine';

const StarQuestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consentGiven, setConsentGiven] = React.useState(false);
  
  // Initialize sensors (only if consent is given)
  const { gazeData } = useEyeTracking(consentGiven);
  const { attentionScore, facePresent, videoRef } = useFaceTracking(consentGiven);
  
  // Adaptive Engine
  useEngagementEngine(attentionScore, facePresent, gazeData);

  return (
    <div className="relative min-h-screen bg-game-background selection:bg-game-primary selection:text-black">
      {!consentGiven && <PrivacyConsentModal onAccept={() => setConsentGiven(true)} />}
      
      {/* Hidden Video for face tracking */}
      <video ref={videoRef} className="hidden" />
      
      <HUD />
      <main className="relative z-0">
        {children}
      </main>
    </div>
  );
};

export const StarQuestRoutes: React.FC = () => {
  return (
    <GameProvider>
      <Routes>
        <Route index element={<StarQuestHome />} />
        <Route path="play/blaster" element={
            <StarQuestWrapper>
                <div className="max-w-6xl mx-auto px-8 pt-32 pb-12">
                    <FractionBlaster />
                </div>
            </StarQuestWrapper>
        } />
        <Route path="play/builder" element={
            <StarQuestWrapper>
                <div className="max-w-6xl mx-auto px-8 pt-32 pb-12">
                    <FractionBuilder />
                </div>
            </StarQuestWrapper>
        } />
      </Routes>
    </GameProvider>
  );
};
