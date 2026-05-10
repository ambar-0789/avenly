class AttentionTracker:

    def __init__(self):
        self.focus_score = 1.0

    def update(self, data):

        if data is None:
            self.focus_score -= 0.01
            return self._clamp()

        ear = data["ear"]
        eye_closed = data["eye_closed"]

        # Attention logic
        if eye_closed:
            self.focus_score -= 0.02
        else:
            self.focus_score += 0.01

        # Fatigue logic
        if ear < 0.18:
            self.focus_score -= 0.03

        return self._clamp()

    def _clamp(self):

        self.focus_score = max(
            0.0,
            min(1.0, self.focus_score)
        )

        return round(self.focus_score, 3)