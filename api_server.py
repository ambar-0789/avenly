from fastapi import FastAPI
import cv2

from core_engine import BlinkEngine
from attention_tracker import AttentionTracker
from tab_switch_detector import TabSwitchDetector

app = FastAPI()

# ----------------------------
# Initialize Engines
# ----------------------------

engine = BlinkEngine()
tracker = AttentionTracker()
tab_detector = TabSwitchDetector()

# ----------------------------
# Open Webcam
# ----------------------------

cap = cv2.VideoCapture(0)

# Increase webcam reliability
cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

# ----------------------------
# Home Route
# ----------------------------

@app.get("/")
def home():

    return {
        "message": "CV Attention Engine Running"
    }

# ----------------------------
# Tab Hidden Route
# ----------------------------

@app.post("/tab-hidden")
def tab_hidden():

    tab_detector.tab_hidden()

    return {
        "success": True,
        "message": "Tab hidden detected"
    }

# ----------------------------
# Tab Visible Route
# ----------------------------

@app.post("/tab-visible")
def tab_visible():

    tab_detector.tab_visible()

    return {
        "success": True,
        "message": "Tab visible detected"
    }

# ----------------------------
# Stream Route
# ----------------------------

@app.get("/stream")
def stream_data():

    # Read webcam frame
    ret, frame = cap.read()

    # Webcam failure
    if not ret:

        return {
            "success": False,
            "error": "Could not access webcam"
        }

    # Flip frame for natural mirror effect
    frame = cv2.flip(frame, 1)

    # Process frame
    data = engine.process_frame(frame)

    # ----------------------------
    # No Face Detected
    # ----------------------------

    if data is None:

        return {
            "success": True,
            "face_detected": False,
            "blink_count": 0,
            "eye_aspect_ratio": None,
            "eye_closed": None,
            "attention_score": tracker.focus_score,
            "tab_switches": tab_detector.tab_switch_count,
            "timestamp": None
        }

    # ----------------------------
    # Face Detected
    # ----------------------------

    ear = data["ear"]
    eyes_closed = data["eye_closed"]

    # Update attention score
    attention = tracker.update(
        ear,
        eyes_closed
    )

    # Final API response
    return {

        "success": True,
        "face_detected": True,

        "blink_count": data["blink_count"],

        "eye_aspect_ratio": ear,

        "eye_closed": eyes_closed,

        "attention_score": attention,

        "tab_switches": tab_detector.tab_switch_count,

        "timestamp": data["timestamp"]
    }