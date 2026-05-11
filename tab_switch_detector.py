import time


class TabSwitchDetector:

    def __init__(self):

        self.tab_switch_count = 0
        self.last_hidden_time = None

    def tab_hidden(self):

        self.last_hidden_time = time.time()

    def tab_visible(self):

        if self.last_hidden_time is not None:

            hidden_duration = (
                time.time() - self.last_hidden_time
            )

            if hidden_duration > 1:
                self.tab_switch_count += 1

            self.last_hidden_time = None