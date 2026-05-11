class AttentionTracker:

    def __init__(self):

        # Focus score between 0 and 1
        self.focus_score = 1.0

    def update(self, ear, eyes_closed):

        # Eyes closed -> reduce attention
        if eyes_closed:
            self.focus_score -= 0.02

        else:
            self.focus_score += 0.01

        # Extra fatigue penalty
        if ear < 0.18:
            self.focus_score -= 0.03

        # Clamp score
        self.focus_score = max(
            0.0,
            min(1.0, self.focus_score)
        )

        return round(self.focus_score, 3)