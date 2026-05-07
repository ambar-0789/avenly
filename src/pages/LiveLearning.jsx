import { useEffect, useState } from "react"
import socket from "../socket"

export default function LiveLearning() {

  const [quizScore, setQuizScore] = useState(50)
  const [wrongAnswers, setWrongAnswers] = useState(0)
  const [fastScroll, setFastScroll] = useState(false)
  const [reReading, setReReading] = useState(false)
  const [idleTime, setIdleTime] = useState(0)

  const [adaptation, setAdaptation] = useState({
    message: "Learning Normally",
    background: "#ffffff",
    fontSize: "20px"
  })

  useEffect(() => {

    const interval = setInterval(() => {
      setIdleTime(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)

  }, [])

  useEffect(() => {

    socket.emit("student-activity", {
  idleTime,
  quizScore,
  wrongAnswers,
  fastScroll,
  reReading
})

  }, [idleTime, quizScore, wrongAnswers, fastScroll, reReading])

  useEffect(() => {

    socket.on("adaptation-response", (data) => {
      setAdaptation(data)
    })

    return () => {
      socket.off("adaptation-response")
    }

  }, [])

  const handleActivity = () => {
    setIdleTime(0)
  }

  const handleScroll = () => {

  const scrollPosition = window.scrollY

  if (scrollPosition > 300) {

    setFastScroll(true)

    setTimeout(() => {
      setFastScroll(false)
    }, 3000)
  }
}

const simulateReReading = () => {

  setReReading(true)

  setTimeout(() => {
    setReReading(false)
  }, 4000)
}

  return (
    <div
      onMouseMove={handleActivity}
      onScroll={handleScroll}
      style={{
        background: adaptation.background,
        minHeight: "100vh",
        padding: "40px",
        transition: "0.5s"
      }}
    >


        <h1
            style={{
                fontSize: adaptation.fontSize,
                marginBottom: "20px"
       }}
    >
        Adaptive Learning Environment
      </h1>

      <h2>{adaptation.message}</h2>

      <p>Idle Time: {idleTime} seconds</p>

      <p>Quiz Score: {quizScore}</p>

      <div style={{ marginTop: "20px" }}></div>

  <button onClick={() => setQuizScore(30)}>
    Simulate Low Score
  </button>

  <button
    onClick={() => setQuizScore(90)}
    style={{ marginLeft: "10px" }}
  >
    Simulate High Score
  </button>

  <button
    onClick={() => setWrongAnswers(prev => prev + 1)}
    style={{ marginLeft: "10px" }}
  >
    Wrong Answer
  </button>

  <button
    onClick={simulateReReading}
    style={{ marginLeft: "10px" }}
  >
    Simulate Re-reading
  </button>

</div>
  )
}