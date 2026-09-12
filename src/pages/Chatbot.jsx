import React, { useState, useRef, useEffect } from 'react'
import { Bot, Send } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import { useParams } from 'react-router-dom'

// PAGES
import { sendPrompt } from '../api/chatbot';
import { getBotInfo } from '../api/bot';

const Chatbot = () => {

    const { slug } = useParams()
    const [ownerName, setOwnerName] = useState("")

    // STATES
    const [prompt, setPrompt] = useState("");
    const [loader, setLoader] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [slowLoader, setSlowLoader] = useState(false);
    const [chat, setChat] = useState([]);

    // API

    const chatSendPrompt = async (prompt, history) => {
        setLoader(true)
        setPrompt("")
        const slowTimer = setTimeout(() => {
            setSlowLoader(true)
        }, 5000);
        const result = await sendPrompt(prompt, history, slug)
        clearTimeout(slowTimer)
        if (!result.success) {
            setChat(prev => {
                const updated = [...prev]
                updated[updated.length - 1] = { ...updated[updated.length - 1], error: result.message }
                return updated
            })
            setLoader(false)
            return
        }
        setChat(prev => {
            const updated = [...prev]
            updated[updated.length - 1] = { ...updated[updated.length - 1], ai: result.message }
            return updated
        })
        setLoader(false)
        setSlowLoader(false)
    }

    //Enter key
    const handleSend = () => {
        if (!prompt.trim() || loader) return
        const history = []
        for (const elem of chat) {
            history.push({ role: "user", content: elem.prompt })
            if (elem.ai) {
                history.push({ role: "assistant", content: elem.ai })
            }
        }

        setChat(prev => [...prev, { prompt: prompt, ai: "" }])
        chatSendPrompt(prompt, history)
    }

    // Auto scroll
    const chatEndRef = useRef(null)
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [chat])

    // OWNER NAME
    useEffect(() => {
        const fetchBotInfo = async () => {
            const result = await getBotInfo(slug)
            if (result.success) {
                const first = result.ownerName.split(" ")[0]
                const capitalized = first.charAt(0).toUpperCase() + first.slice(1)
                setOwnerName(capitalized)
            }
        }
        fetchBotInfo()
    }, [slug])

    return (
        <main className='h-dvh w-screen flex items-center justify-center bg-[#0D1321]'>

            {/* CHATBOT CARD */}
            <div className="chatBot flex flex-col justify-between h-full w-full md:w-200 bg-white/6">

                {/* CHATBOT HEADER */}
                <div className="header bg-[#0D1321]/65 border border-white/[0.07] flex items-center gap-4 w-full px-5 py-4">
                    <div className="log">
                        <span className='flex items-center justify-center h-10 w-10 bg-linear-to-br from-[#4361EE] to-[#7209B7] rounded-full'>
                            <Bot className='text-white' size={20} />
                        </span>
                    </div>
                    <div className="assistant">
                    <p className='text-[#ECEEF6] font-bold'>{ownerName ? `${ownerName}'s AI` : "AI Assistant"}</p>
                        <div className="onlineStatus flex items-center gap-1">
                            <span className='block w-2 h-2 rounded-full bg-green-500'></span>
                            <small className='text-[#8B93AB]'>Online</small>
                        </div>
                    </div>
                </div>

                {/* CHATS */}
                <div className="chat flex-1 w-full bg-transparent border border-white/[0.07] py-3 px-2 md:py-5 md:px-5 flex flex-col gap-2 overflow-y-auto">
                    {chat.map(function (elem, index) {
                        return (
                            <React.Fragment key={index}>
                                <div className='mt-3 flex flex-col  gap-3 '>
                                    <div className='self-end py-4 px-3  max-w-[50%] bg-linear-to-br from-[#4361EE] to-[#7209B7] text-white text-sm rounded-md shrink-0 '>
                                        <p>{elem.prompt}</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        {loader && index === chat.length - 1 ?
                                            <div className='flex items-center gap-2'>
                                                <span className='block h-8 w-8 rounded-full bg-linear-to-br from-[#4361EE] to-[#7209B7] animate-pulse'></span>
                                                {slowLoader && chat.length === 1 && (
                                                    <div className='flex flex-col gap-1'>
                                                        <p className='font-bold text-[#8B93AB] text-xs mt-1'>This is taking a bit longer than usual</p>
                                                        <p className='text-[#8B93AB] text-xs mt-1'>Server is waking up, this can take up to a minute...</p>
                                                    </div>
                                                )}
                                                {slowLoader && chat.length > 1 && (
                                                    <p className='text-[#8B93AB] text-xs mt-1'>This is taking a bit longer, the response might just be lengthy...</p>
                                                )}
                                            </div> :
                                            <div className='flex gap-2 w-full min-w-0'>
                                                {elem.error ? (
                                                    <div className='px-4 py-5 w-full bg-[#F25C5C]/10 border border-[#F25C5C]/35 rounded-md'>
                                                        <p className='text-[#f0cccc] text-sm'>{elem.error}</p>
                                                    </div>
                                                ) : (
                                                    <>
                                                        <span className='flex items-center justify-center h-8 w-8 bg-linear-to-br from-[#4361EE] to-[#7209B7] rounded-full'>
                                                            <Bot className='text-white' size={16} />
                                                        </span>
                                                        <div className='self-start py-4 px-3 min-w-0  max-w-[80%] bg-transparent  border border-white/[0.07] text-white text-sm rounded-md break-words overflow-x-auto'>
                                                            <ReactMarkdown>{elem.ai}</ReactMarkdown>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        }
                                    </div>
                                </div>
                            </ React.Fragment>
                        )
                    })}
                    <div ref={chatEndRef}></div>
                </div>

                {/* PROMPT */}
                <div className="prompt border border-white/[0.07] py-2 px-2 md:py-2 md:px-6 bg-[#0D1321]/65 text-[#8B93AB]">
                    <div className='flex w-full relative'>
                        <input
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleSend()
                            }}
                            className='text-white border border-white/10 w-full py-3 md:py-4 px-3 md:px-4 rounded-xl placeholder:text-sm' type="text" placeholder='Type a message...' />
                        <button
                            onClick={() => {
                                handleSend()
                            }}
                            disabled={!prompt.trim() || loader}
                            className='absolute flex items-center justify-center right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-linear-to-br from-[#4361EE] to-[#7209B7] rounded-full opacity-100 brightness-110 saturate-125 transition-all duration-150 cursor-pointer hover:shadow-[0_6px_18px_rgba(67,97,238,0.45)] hover:brightness-125 disabled:opacity-30 disabled:grayscale disabled:brightness-100 disabled:saturate-100 disabled:cursor-not-allowed disabled:hover:shadow-none'>
                            <Send size={18} />
                        </button>
                    </div>

                    <div className='text-center pt-2'>
                        <a href="https://mimic-ai-neon.vercel.app" target="_blank" rel="noopener noreferrer" className='text-xs text-[#8B93AB] hover:text-[#A9B8FF] transition-colors'>Powered by MimicAI — build your own bot</a>
                    </div>
                </div>

            </div>
        </main >
    )
}

export default Chatbot
