import { useEffect, useState, useRef } from 'react';

// Declaration for WebGazer as it often lacks types
declare const webgazer: any;

export const useEyeTracking = (active: boolean) => {
  const [gazeData, setGazeData] = useState<{ x: number; y: number } | null>(null);
  const [isCalibrated, setIsCalibrated] = useState(false);
  const webgazerRef = useRef<any>(null);

  useEffect(() => {
    if (!active) return;

    const initWebGazer = async () => {
      // @ts-ignore
      const script = document.createElement('script');
      script.src = 'https://webgazer.cs.brown.edu/webgazer.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        webgazer.setGazeListener((data: any, _elapsedTime: number) => {
          if (data) {
            setGazeData({ x: data.x, y: data.y });
          }
        }).begin();
        
        webgazer.showPredictionPoints(true);
        webgazerRef.current = webgazer;
      };
    };

    initWebGazer();

    return () => {
      if (webgazerRef.current) {
        webgazerRef.current.end();
      }
    };
  }, [active]);

  const calibrate = () => {
    // Simple calibration logic could be added here
    setIsCalibrated(true);
  };

  return { gazeData, isCalibrated, calibrate };
};
