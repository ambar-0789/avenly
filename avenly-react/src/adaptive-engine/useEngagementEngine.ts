import { useEffect } from 'react';
import { useGame } from '../store/GameStore';
import { useCursorTracking } from '../sensors/useCursorTracking';

interface EngagementWeights {
  face: number;
  cursor: number;
  gaze: number;
}

const DEFAULT_WEIGHTS: EngagementWeights = {
  face: 0.5,
  cursor: 0.3,
  gaze: 0.2,
};

export const useEngagementEngine = (
  faceScore: number,
  facePresent: boolean,
  gazeData: { x: number; y: number } | null
) => {
  const { state, updateFocus, setEngagement } = useGame();
  const { metrics: cursorMetrics } = useCursorTracking();

  useEffect(() => {
    // 1. Calculate Cursor Score
    // High velocity or erratic movement reduces score
    let cursorScore = 100;
    if (cursorMetrics.isErratic) cursorScore -= 30;
    if (cursorMetrics.idleTime > 5) cursorScore -= cursorMetrics.idleTime * 2;
    cursorScore = Math.max(0, Math.min(100, cursorScore));

    // 2. Calculate Gaze Score
    // If gaze is off-screen or missing
    let gazeScore = gazeData ? 100 : 50;
    if (gazeData) {
        const offScreen = gazeData.x < 0 || gazeData.x > window.innerWidth || gazeData.y < 0 || gazeData.y > window.innerHeight;
        if (offScreen) gazeScore = 20;
    }

    // 3. Combine with weights
    const combinedScore = (
      (facePresent ? faceScore : 0) * DEFAULT_WEIGHTS.face +
      cursorScore * DEFAULT_WEIGHTS.cursor +
      gazeScore * DEFAULT_WEIGHTS.gaze
    );

    updateFocus(combinedScore);

    // 4. Determine Engagement State
    if (combinedScore > 70) {
      setEngagement('engaged');
    } else if (combinedScore > 30) {
      setEngagement('distracted');
    } else {
      setEngagement('idle');
    }

  }, [faceScore, facePresent, gazeData, cursorMetrics, updateFocus, setEngagement]);

  return state.focusScore;
};
