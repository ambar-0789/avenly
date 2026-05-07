const express = require("express")
const http = require("http")
const { Server } = require("socket.io")
const cors = require("cors")

const app = express()

app.use(cors())

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
})

io.on("connection", (socket) => {

  console.log("Student Connected:", socket.id)

  socket.on("student-activity", (data) => {

    console.log("Activity:", data)

    let response = {
      message: "Learning Normally",
      background: "#ffffff",
      fontSize: "20px"
    }

    // REAL-TIME ADAPTATION RULES

    if (data.idleTime > 10) {
      response.message = "Low Focus Detected"
      response.background = "#fff3cd"
      response.fontSize = "24px"
    }

    if (data.quizScore < 40) {
      response.message = "Learning Difficulty Detected"
      response.background = "#f8d7da"
      response.fontSize = "28px"
    }

    if (data.quizScore >= 80) {
      response.message = "Excellent Progress"
      response.background = "#d4edda"
      response.fontSize = "20px"
    }

    // FAST SCROLL DETECTION

if (data.fastScroll === true) {
  response.message = "Possible Loss Of Focus Detected"
  response.background = "#ffe5b4"
  response.fontSize = "26px"
}

// REREADING DETECTION

if (data.reReading === true) {
  response.message = "Re-reading Behavior Detected"
  response.background = "#d1ecf1"
  response.fontSize = "24px"
}

// WRONG ANSWER DETECTION

if (data.wrongAnswers >= 3) {
  response.message = "Cognitive Overload Detected"
  response.background = "#f5c6cb"
  response.fontSize = "30px"
}

    socket.emit("adaptation-response", response)
  })

  socket.on("disconnect", () => {
    console.log("Student Disconnected")
  })
})

server.listen(5000, () => {
  console.log("Server running on port 5000")
})