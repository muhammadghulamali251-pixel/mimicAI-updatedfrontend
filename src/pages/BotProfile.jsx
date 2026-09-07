import React, { useEffect } from 'react'
import { Bot } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// PAGES
import { getMyBot, createBot } from '../api/bot'
import { logoutUser } from '../api/auth'

const BotProfile = () => {

    const navigate = useNavigate()

    const user = JSON.parse(localStorage.getItem("user"))

    // STATES
    const [createBotForm, setCreateBotForm] = useState(false)

    // USER STATES
    const [bot, setBot] = useState(null);
    const [botLoading, setBotLoading] = useState(true);
    const [botErrorMessage, setBotErrorMessage] = useState("");
    const [copyUserUri, setCopyUserUri] = useState(false)

    // CREATE BOT STATES
    const [createBotName, setCreateBotName] = useState("");
    const [createSystemPrompt, setCreateSystemPrompt] = useState("");
    const [createBotSuccessMessage, setCreateBotSuccessMessage] = useState("");
    const [createBotErrorMessage, setCreateBotErrorMessage] = useState("");
    const [createBotLoader, setCreateBotLoader] = useState(false);


    // APIs
    // GET
    const fetchMyBot = async () => {
        setBotErrorMessage("")
        setBotLoading(true)
        const result = await getMyBot();
        if (!result.success) {
            setBotLoading(false)
            setBotErrorMessage(result.message)
            return;
        }
        setBot(result.bot)
        setBotLoading(false)
    }

    useEffect(() => {
        fetchMyBot()
    }, [])

    // BOT API
    const sendCreateBot = async (createBotData) => {
        setCreateBotErrorMessage("")
        setCreateBotSuccessMessage("")
        setCreateBotLoader(true)
        const result = await createBot(createBotData);
        if (!result.success) {
            setCreateBotLoader(false)
            setCreateBotErrorMessage(result.message)
            setTimeout(() => {
                setCreateBotErrorMessage("")
            }, 3000);
            return;
        }
        setCreateBotSuccessMessage(result.message)
        setTimeout(() => {
            setCreateBotSuccessMessage("")
        }, 3000);
        setCreateBotLoader(false)
        setCreateBotForm(false)
        fetchMyBot()
    }


    const botSubmitHandler = (e) => {
        e.preventDefault()
        const createBotData = {
            botName: createBotName,
            systemPrompt: createSystemPrompt
        }
        sendCreateBot(createBotData)
        setCreateBotName("")
        setCreateSystemPrompt("")
    }

    console.log(bot);

    // COPY FUNCTION
    const copyUri = () => {
        navigator.clipboard.writeText(bot?.link)
    }

    // HANDLE LOGOUT
    const handleLogout = async () => {
        await logoutUser()
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        navigate('/auth')
    }



    return (
        <div className='min-w-screen min-h-screen h-full w-full bg-[#0D1321] bg-[radial-gradient(900px_560px_at_12%_0%,rgba(67,97,238,0.30),transparent_60%),radial-gradient(800px_640px_at_90%_18%,rgba(114,9,183,0.26),transparent_55%)]'>

            {/* HEADER */}
            <header className="header">
                <div className="flex items-center justify-between w-full px-6 py-4 border-b border-white/[0.07]">
                    <div className="flex items-center gap-2">
                        <span className='flex items-center justify-center h-10 w-10 bg-linear-to-br from-[#4361EE] to-[#7209B7] rounded-2xl'>
                            <Bot className='text-white' size={20} />
                        </span>
                        <h1 className='font-bold text-xl text-white'>MimicAI</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className='hidden md:flex items-center justify-center h-8 w-8 rounded-full bg-linear-to-br from-[#4361EE] to-[#7209B7] text-white text-sm font-semibold'>
                                {user?.name[0]?.toUpperCase()}
                            </span>
                            <span className='hidden md:block text-[#9AA2BD] text-sm'>{user?.name}</span>
                        </div>
                        <button onClick={handleLogout} className='text-sm text-[#C9CFE0] border border-white/10 px-4 py-2 rounded-md hover:bg-white/5 transition-colors cursor-pointer'>
                            Log out
                        </button>
                    </div>
                </div>
            </header>

            {/* BODY */}
            <section className='w-full h-full py-6 md:py-10 px-3 md:px-14'>

                {/* PAGE HEADER */}
                <div className="pageHeader flex items-center justify-between flex-wrap gap-4 mb-8">
                    <div className="flex flex-col gap-1">
                        <h1 className='text-white font-bold text-2xl'>Dashboard</h1>
                        <small className='text-[#8B93AB]'>One bot per account. Set it up once, share it anywhere.</small>
                    </div>
                    {!bot && (
                        <div className='flex items-center gap-2 text-sm text-[#6B7394] border border-white/10 rounded-full px-4 py-2'>
                            <span className='w-1.5 h-1.5 rounded-full bg-[#6B7394]'></span>
                            No bot yet
                        </div>
                    )}
                    {bot && (
                        <div className='flex items-center gap-2 text-sm text-[#6B7394] border border-white/10 rounded-full px-4 py-2'>
                            <span className='w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse'></span>
                            Bot is active
                        </div>
                    )}
                </div>

                {/* STAT CARDS */}
                <div className="statCards grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
                    <div className='bg-white/6 border border-white/[0.07] backdrop-blur-md rounded-md p-5'>
                        <small className='text-[#6B7394]'>Bot status</small>
                        <p className='text-white font-bold text-lg'>{!bot ? "Not created" :
                            <span className='text-green-400 font-semibold'>Live</span>
                        }</p>
                    </div>
                    <div className='bg-white/6 border border-white/[0.07] backdrop-blur-md rounded-md p-5'>
                        <small className='text-[#6B7394]'>Created</small>
                        <p className='text-[#5C6480] font-bold text-lg'>{!bot ? "-" :
                            <span className='text-sm font-normal'>
                                {new Date(bot.createdAt).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}
                            </span>
                        }</p>
                    </div>
                    <div className='bg-white/6 border border-white/[0.07] backdrop-blur-md rounded-md p-5'>
                        <small className='text-[#6B7394]'>Plan</small>
                        <p className='text-white font-bold text-lg'>Free tier</p>
                    </div>
                </div>

                {/* MAIN CARD */}
                {!createBotForm && !bot && (
                    <>
                        <div className='bg-white/6 border border-white/[0.07] backdrop-blur-md rounded-md flex items-center justify-center py-20 px-7'>

                            <div className="emptyBotState flex flex-col items-center text-center gap-6 max-w-120">

                                <span className='flex items-center justify-center h-14 w-14 bg-linear-to-br from-[#4361EE] to-[#7209B7] rounded-2xl'>
                                    <Bot className='text-white' size={24} />
                                </span>

                                <div className="writeUp flex flex-col gap-2">
                                    <p className='text-white font-bold text-2xl'>You haven't created a bot yet</p>
                                    <small className='text-[#8B93AB]'>Write a system prompt and get a shareable link in under a minute.</small>
                                </div>

                                <button
                                    onClick={() => setCreateBotForm(true)}
                                    className='py-3 px-6 bg-linear-to-br from-[#4361EE] to-[#7209B7] rounded-md text-white font-semibold cursor-pointer hover:shadow-[0_6px_18px_rgba(67,97,238,0.35)] transition-shadow'>
                                    Create your bot
                                </button>

                            </div>

                        </div>
                    </>
                )}

                {bot && !createBotForm && (
                    <>
                        <div className='bg-white/6 border border-white/[0.07] backdrop-blur-md rounded-md py-8 px-7'>

                            <div className="botHeader flex items-center justify-between flex-wrap gap-4 mb-6">
                                <p className='text-white font-bold text-xl'>{bot.botName}</p>
                                <a className='flex items-center gap-2 py-2 px-4 rounded-md bg-linear-to-br from-[#4361EE] to-[#7209B7] text-white text-sm font-semibold cursor-pointer' href={bot.link}
                                    target="_blank"
                                    rel="noreferrer">
                                    Try your bot
                                </a>
                            </div>

                            <div className="linkBox flex items-center justify-between gap-3 bg-[#0D1321] rounded-md py-3 px-4 mb-6">
                                <p className='text-[#A9B8FF] text-sm font-mono truncate'>{bot.link}</p>
                                <button
                                    onClick={() => {
                                        copyUri()
                                        setCopyUserUri(true)
                                        setTimeout(() => {
                                            setCopyUserUri(false)
                                        }, 2000);
                                    }}
                                    className={`py-2 px-4 rounded-md border text-sm font-semibold cursor-pointer ${copyUserUri ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300" : "bg-gray-700 border-gray-600 text-white"}`}>
                                    {copyUserUri ? "Copied!" : "Copy"}
                                </button>
                            </div>

                            <div className="systemPrompt flex flex-col gap-2">
                                <label className='text-[#9AA2BD] text-sm'>System prompt</label>
                                <div className='bg-[#0D1321] rounded-md py-3 px-4'>
                                    <p className='text-white text-sm'>{bot.systemPrompt}</p>
                                </div>
                            </div>

                        </div>
                    </>
                )}

                {createBotForm && (
                    <>
                        <div className='bg-white/6 border border-white/[0.07] backdrop-blur-md rounded-md px-3 py-6 md:py-8 md:px-7'>

                            <div className="formHeader flex flex-col gap-1 mb-6">
                                <p className='text-white font-bold text-2xl'>Create your bot</p>
                                <small className='text-[#8B93AB]'>Choose a name and describe how it should behave.</small>
                            </div>

                            <form onSubmit={botSubmitHandler} className='flex flex-col gap-5'>

                                <div className="botName flex flex-col gap-1">
                                    <label className='text-white font-semibold'>Bot name</label>
                                    <input
                                        value={createBotName}
                                        onChange={(e) => setCreateBotName(e.target.value)}
                                        className='border border-white/10 w-full py-3 px-4 rounded-md text-white placeholder:text-gray-600'
                                        type="text"
                                        placeholder='Muhammad Ghulam Ali' />
                                </div>

                                <div className="systemPrompt flex flex-col gap-1">
                                    <label className='text-white font-semibold'>System prompt</label>
                                    <textarea
                                        value={createSystemPrompt}
                                        onChange={(e) => setCreateSystemPrompt(e.target.value)}
                                        className='border border-white/10 w-full py-3 px-4 rounded-md text-white placeholder:text-gray-600 resize-y'
                                        rows={3}
                                        placeholder='You are a career assistant representing...'>
                                    </textarea>
                                </div>

                                <div className="formButtons flex items-center gap-3">
                                    <button
                                        disabled={createBotLoader}
                                        type='submit'
                                        className='flex items-center justify-center py-3 w-35 bg-linear-to-br from-[#4361EE] to-[#7209B7] rounded-md text-white font-semibold cursor-pointer hover:shadow-[0_6px_18px_rgba(67,97,238,0.35)] transition-shadow'>
                                        {!createBotLoader ? "Create my bot" :
                                            <span className='block h-5 w-5 rounded-full border-2 border-gray-300 border-t-transparent animate-spin'></span>
                                        }
                                    </button>
                                    <button
                                        type='button'
                                        onClick={() => setCreateBotForm(false)}
                                        className='py-3 px-6 border border-white/10 rounded-md text-[#9AA2BD] font-semibold cursor-pointer hover:bg-white/5 transition-colors'>
                                        Cancel
                                    </button>
                                </div>

                            </form>

                        </div>
                    </>
                )}

            </section>

        </div>
    )
}

export default BotProfile
