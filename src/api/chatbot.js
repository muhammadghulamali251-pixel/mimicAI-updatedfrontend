// APIs

// POST

const sendPrompt = async (prompt, history, slug) => {
    try{
        const res = await fetch (`https://mimicai-backend.onrender.com/api/chat/${slug}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({prompt, history})
        })

        const result = await res.json()

        if (!res.ok) {
            return {success: false, message: result.message} 
        }

        return {success: true, message:result.reply}

    } catch (err) {
        return {success:false, message: "Network failed."}
    }
}

export { sendPrompt }