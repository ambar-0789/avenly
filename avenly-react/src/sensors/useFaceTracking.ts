import { useEffect, useRef, useState } from 'react';

type FaceMeshConstructor = typeof import('@mediapipe/face_mesh').FaceMesh;
type CameraConstructor = typeof import('@mediapipe/camera_utils').Camera;
type MediapipeWindow = Window & {
  FaceMesh?: FaceMeshConstructor;
  Camera?: CameraConstructor;
};

const getMediapipeWindow = () => window as MediapipeWindow;

const loadMediapipeScript = <T,>(
  globalName: keyof MediapipeWindow,
  src: string,
  dataAttribute: string,
  label: string,
) =>
  new Promise<T>((resolve, reject) => {
    const mediapipeWindow = getMediapipeWindow();
    const globalValue = mediapipeWindow[globalName];

    if (globalValue) {
      resolve(globalValue as T);
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(`script[${dataAttribute}]`);

    const handleLoad = () => {
      const loadedValue = getMediapipeWindow()[globalName];

      if (loadedValue) {
        resolve(loadedValue as T);
      } else {
        reject(new Error(`${label} loaded without exposing window.${String(globalName)}.`));
      }
    };

    if (existingScript) {
      existingScript.addEventListener('load', handleLoad, { once: true });
      existingScript.addEventListener('error', () => reject(new Error(`Failed to load ${label}.`)), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.setAttribute(dataAttribute, 'true');
    script.addEventListener('load', handleLoad, { once: true });
    script.addEventListener('error', () => reject(new Error(`Failed to load ${label}.`)), { once: true });
    document.body.appendChild(script);
  });

const loadFaceMesh = () =>
  loadMediapipeScript<FaceMeshConstructor>(
    'FaceMesh',
    'https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/face_mesh.js',
    'data-mediapipe-face-mesh',
    'Mediapipe FaceMesh',
  );

const loadCamera = () =>
  loadMediapipeScript<CameraConstructor>(
    'Camera',
    'https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils/camera_utils.js',
    'data-mediapipe-camera-utils',
    'Mediapipe Camera Utils',
  );

export const useFaceTracking = (active: boolean) => {
  const [attentionScore, setAttentionScore] = useState(100);
  const [facePresent, setFacePresent] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!active) return;

    let cancelled = false;
    let faceMesh: InstanceType<FaceMeshConstructor> | null = null;
    let camera: InstanceType<CameraConstructor> | null = null;

    const initFaceMesh = async () => {
      const [FaceMesh, Camera] = await Promise.all([loadFaceMesh(), loadCamera()]);

      if (cancelled) {
        return;
      }

      faceMesh = new FaceMesh({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      faceMesh.onResults((results) => {
        if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
          setFacePresent(true);
          const landmarks = results.multiFaceLandmarks[0];
          const nose = landmarks[1];
          const distFromCenter = Math.sqrt(Math.pow(nose.x - 0.5, 2) + Math.pow(nose.y - 0.5, 2));
          const newScore = Math.max(0, 100 - distFromCenter * 200);
          setAttentionScore(newScore);
        } else {
          setFacePresent(false);
          setAttentionScore(prev => Math.max(0, prev - 5));
        }
      });

      if (!videoRef.current) {
        return;
      }

      const currentFaceMesh = faceMesh;

      camera = new Camera(videoRef.current, {
        onFrame: async () => {
          await currentFaceMesh.send({ image: videoRef.current! });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    };

    initFaceMesh();

    return () => {
      cancelled = true;
      camera?.stop();
      faceMesh?.close();
    };
  }, [active]);

  return { attentionScore, facePresent, videoRef };
};
