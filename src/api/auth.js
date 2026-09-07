// APIs

// REGISTER
const registerUser = async (registerUserData) => {
    try {
        const res = await fetch('https://mimicai-backend.onrender.com/api/auth/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(registerUserData)
        })

        const result = await res.json()

        if (!res.ok) {
            return {success: false, message: result.message}
        }

        return {success:true, message: result.message , token: result.token}

    } catch (err) {
        return {success:false, message: "Network failed."}
    }
}

// LOGIN
const loginUser = async (loginUserData) => {
    try {
        const res = await fetch('https://mimicai-backend.onrender.com/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(loginUserData)
        })

        const result = await res.json()

        if (!res.ok) {
            
            return {success: false, message: result.message}
        }

        return {success: true, message: result.message , user: result.user,  token: result.token}

    } catch (err) {
        return {success: false, message: "Network failed."}
    }
}

// LOGOUT
const logoutUser = async () => {
    try {
        const res = await fetch('https://mimicai-backend.onrender.com/api/auth/logout', {
            method: 'POST'
        })

        const result = await res.json()

        if (!res.ok) {
            return {success: false, message: result.message}
        }

        return {success: true, message: result.message}

    } catch (err) {
        return {success: false, message: "Network failed."}
    }
}

export { registerUser, loginUser, logoutUser }

