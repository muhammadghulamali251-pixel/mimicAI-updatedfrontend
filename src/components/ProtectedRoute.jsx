import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const [checking, setChecking] = useState(true)
    const [authorized, setAuthorized] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch('https://mimicai-backend.onrender.com/api/bot', {
                    headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}
                })
                setAuthorized(res.ok || res.status === 404)
                // 200 = has a bot, 404 = logged in but no bot yet, both mean "authenticated"
                // only 401 means "not logged in"
            } catch {
                setAuthorized(false)
            }
            setChecking(false)
        }
        checkAuth()
    }, [])

    if (checking) return <div className="text-white">Loading...</div>
    if (!authorized) return <Navigate to="/auth" replace />
    return children
}

export default ProtectedRoute