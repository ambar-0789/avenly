import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import SignIn from './pages/SignIn'
import OtpVerify from './pages/OtpVerify'
import SetPassword from './pages/SetPassword'
import Login from './pages/Login'
import ProfileCreate from './pages/ProfileCreate'
import StudentProfile from './pages/StudentProfile'
import TeacherProfile from './pages/TeacherProfile'
import GuardianProfile from './pages/GuardianProfile'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signin/otp" element={<OtpVerify />} />
      <Route path="/signin/password" element={<SetPassword />} />
      <Route path="/login" element={<ProfileCreate />} />
      <Route path="/profile/create" element={<ProfileCreate />} />
      <Route path="/profile/student" element={<StudentProfile />} />
      <Route path="/profile/teacher" element={<TeacherProfile />} />
      <Route path="/profile/guardian" element={<GuardianProfile />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
