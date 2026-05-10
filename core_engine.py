import cv2
import mediapipe as mp
import numpy as np
import time


class BlinkEngine:

    def __init__(self):

        # MediaPipe Face Mesh
        self.mp_face_mesh = mp.solutions.face_mesh

        self.face_mesh = self.mp_face_mesh.FaceMesh(
            max_num_faces=1,
            refine_landmarks=True,
            min_detection_confidence=0.5,
            min_tracking_confidence=0.5
        )

        # Eye landmark indices
        self.LEFT_EYE = [362, 385, 387, 263, 373, 380]
        self.RIGHT_EYE = [33, 160, 158, 133, 153, 144]

        # Blink variables
        self.blink_count = 0
        self.eye_closed_frames = 0

       # Eye Aspect Ratio calculation
    def calculate_ear(self, landmarks, eye_indices, w, h):

        points = []

        for idx in eye_indices:
            x = int(landmarks[idx].x * w)
            y = int(landmarks[idx].y * h)
            points.append((x, y))

        # Vertical distances
        A = np.linalg.norm(np.array(points[1]) - np.array(points[5]))
        B = np.linalg.norm(np.array(points[2]) - np.array(points[4]))

        # Horizontal distance
        C = np.linalg.norm(np.array(points[0]) - np.array(points[3]))

        # Prevent division by zero
        if C == 0:
            return 0.0

        ear = (A + B) / (2.0 * C)

        return ear

    # Main processing function
    def process_frame(self, frame):

        h, w, _ = frame.shape

        # Convert BGR to RGB
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Process face mesh
        results = self.face_mesh.process(rgb)

        # No face detected
        if not results.multi_face_landmarks:
            return None

        # Get landmarks
        landmarks = results.multi_face_landmarks[0].landmark

        # Calculate EAR
        left_ear = self.calculate_ear(
            landmarks,
            self.LEFT_EYE,
            w,
            h
        )

        right_ear = self.calculate_ear(
            landmarks,
            self.RIGHT_EYE,
            w,
            h
        )

        # Average EAR
        ear = (left_ear + right_ear) / 2.0

        # Blink threshold
        BLINK_THRESHOLD = 0.21

        # Blink detection
        if ear < BLINK_THRESHOLD:
            self.eye_closed_frames += 1
        else:
            if self.eye_closed_frames > 2:
                self.blink_count += 1

            self.eye_closed_frames = 0

        return {
            "ear": round(ear, 3),
            "blink_count": self.blink_count,
            "eye_closed": ear < BLINK_THRESHOLD,
            "timestamp": time.time()
        }