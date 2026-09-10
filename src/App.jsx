import './App.css'
import { Routes, Route } from 'react-router-dom'

// COMPONENTS
import ProtectedRoute from './components/ProtectedRoute'

// PAGES
import Chatbot from './pages/Chatbot'
import Home from './pages/Home'
import Register from './pages/Register'
import BotProfile from './pages/BotProfile'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path={`/chat/:slug`} element={<Chatbot />} />
        <Route path='/auth' element={<Register />} />
        <Route path='/botprofile' element={
          <ProtectedRoute>
            <BotProfile />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App
