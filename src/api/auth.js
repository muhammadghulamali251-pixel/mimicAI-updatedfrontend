// APIs

// REGISTER
const registerUser = async (registerUserData) => {
    try {
        const res = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(registerUserData)
        })

        const result = await res.json()

        if (!res.ok) {
            return {success: false, message: result.message}
        }

        return {success:true, message: result.message}

    } catch (err) {
        return {success:false, message: "Network failed."}
    }
}

// LOGIN
const loginUser = async (loginUserData) => {
    try {
        const res = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(loginUserData)
        })

        const result = await res.json()

        if (!res.ok) {
            
            return {success: false, message: result.message}
        }

        return {success: true, message: result.message , user: result.user}

    } catch (err) {
        return {success: false, message: "Network failed."}
    }
}

// LOGOUT
const logoutUser = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/auth/logout', {
            method: 'POST',
            credentials: 'include'
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

