from fastapi import FastAPI
import cv2

from core_engine import BlinkEngine
from attention_tracker import AttentionTracker

app = FastAPI()

# Initialize Blink Engine
engine = BlinkEngine()

# Initialize Attention Tracker
tracker = AttentionTracker()

# Open Webcam
cap = cv2.VideoCapture(0)


@app.get("/")
def home():

    return {
        "message": "CV Attention Engine Running"
    }


@app.get("/stream")
def stream_data():

    # Read frame from webcam
    ret, frame = cap.read()

    # Camera error
    if not ret:
        return {
            "success": False,
            "error": "Could not access webcam"
        }

    # Process frame
    data = engine.process_frame(frame)

    # No face detected
    if data is None:

        return {
            "success": True,
            "face_detected": False,
            "attention_score": tracker.focus_score
        }

    # Extract values
    ear = data["ear"]
    eyes_closed = data["eye_closed"]

    # Update attention score
    attention = tracker.update(
        ear,
        eyes_closed
    )

    # Return API response
    return {
        "success": True,
        "face_detected": True,
        "blink_count": data["blink_count"],
        "eye_aspect_ratio": ear,
        "eye_closed": eyes_closed,
        "attention_score": attention,
        "timestamp": data["timestamp"]
    }