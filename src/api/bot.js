// APIs

// GET
const getMyBot = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/bot', {
            method: 'GET',
            credentials: 'include'
        })

        const result = await res.json()

        if (!res.ok) {
            return {success: false, message: result.message}
        }
        
        return {success: true, bot: result}

    } catch (err) {
        return {success: false, message: "Network failed."}
    }
}

const createBot = async (createBotData) => {
    try {
        const res = await fetch('http://localhost:3000/api/bot', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify(createBotData)
        })

        const result = await res.json()

        if (!res.ok) {
            return {success: false, message: result.message}
        }

        return {success: true, message: result.message, link: result.link}

    } catch (err) {
        return {success: false, message: "Network failed."}
    }
}

export { getMyBot, createBot }
