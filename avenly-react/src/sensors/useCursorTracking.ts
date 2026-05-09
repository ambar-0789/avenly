import { useState, useEffect } from 'react';

export const useCursorTracking = () => {
  const [metrics, setMetrics] = useState({
    velocity: 0,
    isErratic: false,
    lastPos: { x: 0, y: 0 },
    interactionDensity: 0,
    idleTime: 0,
  });

  const [path, setPath] = useState<{ x: number; y: number; t: number }[]>([]);

  useEffect(() => {
    let lastTime = Date.now();
    let moveCount = 0;
    let timer: ReturnType<typeof setInterval>;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = now - lastTime;
      
      if (dt > 0) {
        setMetrics(prev => {
          const dx = e.clientX - prev.lastPos.x;
          const dy = e.clientY - prev.lastPos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const vel = dist / dt;

          // Erratic detection: high velocity + frequent direction changes
          const isErratic = vel > 2 && moveCount > 10; 

          return {
            ...prev,
            velocity: vel,
            isErratic,
            lastPos: { x: e.clientX, y: e.clientY },
            idleTime: 0,
          };
        });

        setPath(prev => [...prev.slice(-50), { x: e.clientX, y: e.clientY, t: now }]);
        lastTime = now;
        moveCount++;
      }
    };

    const handleIdle = () => {
      setMetrics(prev => ({ ...prev, idleTime: prev.idleTime + 1 }));
    };

    window.addEventListener('mousemove', handleMouseMove);
    timer = setInterval(handleIdle, 1000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(timer);
    };
  }, []);

  return { metrics, path };
};
