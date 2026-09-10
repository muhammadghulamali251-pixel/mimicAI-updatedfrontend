import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Bot, User, Pencil, Link as LinkIcon, Copy, Check } from 'lucide-react'


const Home = () => {
    const careerPrompt = `You are a career assistant representing [Your Name]. Answer recruiter questions about their background clearly and confidently.

[Write your background here: degree, key skills, notable projects, work experience]

Tone: confident, concise, no filler. Never invent details not listed above. If asked something outside this, say you don't have that detail and offer to connect them with [Your Name] directly.`

    const freelancerPrompt = `You are the intake assistant for [Your Name / Business], a freelance [your service]. Greet visitors, explain your process, and answer common questions.


[Write your details here: services offered, process/timeline, pricing range, availability]

Tone: friendly and professional. Always end by asking for their email and a short project summary so [Your Name] can follow up.`

    const storefrontPrompt = `You are the customer support assistant for [Business Name], a [what you sell/do].

[Write your details here: products/services, shipping and returns policy, key info customers ask about]

Tone: warm and on brand, never robotic. If asked about an existing order, ask for the order number and let them know a team member will follow up.`

    // BOTS CREATED
    const bots = [
        {
            category: "Student / Job Seeker",
            title: "Career Assistant",
            description: "Answers recruiter questions about background, skills, and projects.",
            link: "https://mimic-ai-neon.vercel.app/chat/ali-cs-student-3a93d4"
        },
        {
            category: "Freelancer",
            title: "Client Intake Bot",
            description: "Screens project inquiries and collects details before a call.",
            link: "https://mimic-ai-neon.vercel.app/chat/freelancer-a1fd7f"
        },
        {
            category: "Small Business",
            title: "Storefront Assistant",
            description: "Handles customer questions about products, shipping, and returns.",
            link: "https://mimic-ai-neon.vercel.app/chat/business-83b28e"
        }
    ]

    // EXAMPLE SCROLL
    const examplesRef = useRef(null)

    // STATES
    const [copyCareerPrompt, setCopyCareerPrompt] = useState(false);
    const [copyFreelancerPrompt, setCopyFreelancerPrompt] = useState(false);
    const [copyStoreFrontPrompt, setCopyStoreFrontPrompt] = useState(false);

    // COPY FUNCTION
    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
    }

    // SERVER WAKE UP

    useEffect(() => {
        fetch('https://mimicai-backend.onrender.com/api/bot').catch(() => { })
    }, [])


    return (
        <main className="min-h-screen  w-full inset-0 -z-10 bg-[#0D1321] bg-[radial-gradient(900px_560px_at_12%_0%,rgba(67,97,238,0.30),transparent_60%),radial-gradient(800px_640px_at_90%_18%,rgba(114,9,183,0.26),transparent_55%)]">
            {/* HEADER */}
            <header className="fixed w-full z-10 flex items-center justify-between bg-[#0D1321]/60 backdrop-blur-md border-b border-white/[0.07] py-4 px-4 md:px-12">
                {/* LOGO */}
                <div className="logo flex items-center gap-2">
                    <span className='flex items-center justify-center h-10 w-10 bg-linear-to-br from-[#4361EE] to-[#7209B7] rounded-full'>
                        <Bot className='text-white' size={20} />
                    </span>
                    <h1 className='font-bold text-md text-white'>MimicAI</h1>
                </div>
                {/* BUTTON */}
                <Link to='/auth' className='py-2 px-3 md:px-6 rounded-2xl bg-linear-to-br from-[#4361EE] to-[#7209B7] text-white cursor-pointer text-sm font-bold transition-transform duration-150 ease-out hover:-translate-y-1'>Get Started</Link>
            </header>

            {/* BODY */}
            <section className='pt-30 md:pt-40 w-full min-h-full flex flex-col gap-15 md:gap-30 items-center py-8 md:py-16 px-5'>
                {/* SLOGAN */}
                <div className="slogan w-full max-w-150  flex flex-col gap-10 items-center justify-center py-5">
                    <h1 className='text-center text-white text-4xl md:text-6xl font-bold'>Turn yourself into a <span className='bg-linear-to-br from-[#4361EE] to-[#7209B7] bg-clip-text text-transparent'>shareable AI chatbot</span></h1>
                    <p className='text-center text-[#9AA2BD]'>Write how it should think and talk, get a link back. You can spin up a chatbot for yourself, your services, or your brand in minutes.</p>
                    <div className="buttons flex items-center gap-4">
                        <Link to='/auth' className='py-3 px-6 font-semibold text-white rounded-md cursor-pointer bg-linear-to-br from-[#4361EE] to-[#7209B7] hover:opacity-90 hover:-translate-y-0.5 transition-all duration-150'>Get Started</Link>
                        <button
                            onClick={() => examplesRef.current.scrollIntoView({ behavior: "smooth" })}
                            className='py-3 px-6 text-white  bg-gray-800 border border-gray-600 rounded-md cursor-pointer font-semibold'>See Examples</button>
                    </div>
                </div>

                {/* BOTS CREATED WITH IT */}
                <div className='w-full max-w-300 flex flex-col gap-10 py-5'>
                    <div className='flex flex-col gap-3'>
                        <small className='font-bold text-purple-500 text-center'>SEE IT IN ACTION</small>
                        <h2 className='font-bold text-2xl md:text-4xl text-white text-center'>Bots people have built</h2>
                        <small className='text-center text-[#9AA2BD]'>Real chatbots made with MimicAI. Open one and start chatting, no sign up needed.</small>
                    </div>

                    {/* cards */}
                    <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

                        {bots.map(function (elem, index) {
                            return (
                                <div key={index} className='flex flex-col gap-4 bg-gray-800 border border-gray-600 py-7 px-5 rounded-2xl'>
                                    <div className="profession bg-linear-to-br from-[#4361EE]/22 to-[#7209B7]/22 border border-white/10 text-[#A9B8FF] rounded-2xl px-4 py-1 w-fit">
                                        <small className='font-bold'>{elem.category}</small>
                                    </div>
                                    <div className="duty">
                                        <h2 className='text-white font-bold text-xl'>{elem.title}</h2>
                                    </div>
                                    <div className="detail">
                                        <small className='text-[#9AA2BD]'>{elem.description}</small>
                                    </div>
                                    <div className="button">
                                        <a href={`${elem.link}`} target='_blank' className='py-2 px-3 md:px-6 rounded-2xl bg-linear-to-br from-[#4361EE] to-[#7209B7] text-white cursor-pointer text-sm font-bold hover:opacity-90 hover:-translate-y-0.5 transition-all duration-150'>Try this bot</a>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </div>


                {/* PRCEDURE (HOW IT WORKS) */}
                <div className='w-full max-w-300 flex flex-col gap-10 py-5'>
                    <div className="stepsWriteUp flex flex-col gap-2">
                        <small className='text-purple-500 font-bold text-center'>HOW IT WORKS</small>
                        <h2 className='font-bold text-2xl md:text-4xl text-white text-center'>Three steps, no engineering required</h2>
                        <small className='text-center text-[#9AA2BD]'>From an empty page to a working chatbot people can actually talk to.</small>

                    </div>

                    {/* cards */}
                    <div className="cards w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className='flex flex-col gap-4 bg-gray-800 border border-gray-600 py-7 px-5 rounded-2xl'>
                            <small className='text-[#9AA2BD]'>STEP 1</small>
                            <span className='flex items-center justify-center h-12 w-12 rounded-full bg-linear-to-br from-[#4361EE]/22 to-[#7209B7]/22 border border-white/10'>
                                <User className='text-[#A9B8FF]' size={24} />
                            </span>
                            <p className='font-semibold text-white'>Sign Up</p>
                            <small className='text-[#9AA2BD]'>Create an account in seconds. No setup, no configuration screens to fight through.</small>
                        </div>

                        <div className='flex flex-col gap-4 bg-gray-800 border border-gray-600 py-7 px-5 rounded-2xl'>
                            <small className='text-[#9AA2BD]'>STEP 02</small>
                            <span className='flex items-center justify-center h-12 w-12 rounded-full bg-linear-to-br from-[#4361EE]/22 to-[#7209B7]/22 border border-white/10'>
                                <Pencil className='text-[#A9B8FF]' size={24} />
                            </span>
                            <p className='font-bold text-white text-xl'>Write your system prompt</p>
                            <small className='text-[#9AA2BD]'>Describe who your bot is, what it knows, and how it should respond. Plain language, no syntax to learn.</small>
                        </div>

                        <div className='flex flex-col gap-4 bg-gray-800 border border-gray-600 py-7 px-5 rounded-2xl'>
                            <small className='text-[#9AA2BD]'>STEP 03</small>
                            <span className='flex items-center justify-center h-12 w-12 rounded-full bg-linear-to-br from-[#4361EE]/22 to-[#7209B7]/22 border border-white/10'>
                                <LinkIcon className='text-[#A9B8FF]' size={24} />
                            </span>
                            <p className='font-bold text-white text-xl'>Get your shareable link</p>
                            <small className='text-[#9AA2BD]'>Publish and share the link anywhere. Anyone who opens it can start chatting immediately.</small>
                        </div>
                    </div>

                </div>

                {/* PROMPT LIBRARY */}
                <div ref={examplesRef} className='w-full max-w-300 flex flex-col gap-10 py-5'>
                    <div className="stepsWriteUp flex flex-col gap-2">
                        <small className='text-purple-500 font-bold text-center'>PROMPT LIBRARY</small>
                        <h2 className='font-bold text-2xl md:text-4xl text-white text-center'>Built for real people, not demos</h2>
                        <small className='text-center text-[#9AA2BD]'>Start from a prompt that's already close to what you need, then make it yours.</small>
                    </div>

                    {/* cards */}
                    <div className="cards w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className='flex flex-col gap-4 bg-gray-800 border border-gray-600 py-7 px-5 rounded-2xl'>
                            <span className='w-fit px-4 py-1 rounded-full bg-linear-to-br from-[#4361EE]/22 to-[#7209B7]/22 border border-white/10 text-[#A9B8FF] text-sm font-semibold'>Student / Job Seeker</span>
                            <p className='font-bold text-white text-xl'>Career Assistant</p>
                            <small className='text-[#9AA2BD]'>Answers questions about your background, skills, and projects the way you'd want a recruiter to hear them.</small>
                            <div className='flex flex-col gap-4 bg-[#0D1321] rounded-xl p-4'>
                                <pre className='text-[#9AA2BD] text-sm font-mono whitespace-pre-wrap'>{`${careerPrompt}`}</pre>
                                <button
                                    onClick={() => {
                                        handleCopy(careerPrompt)
                                        setCopyCareerPrompt(true)
                                        setTimeout(() => {
                                            setCopyCareerPrompt(false)
                                        }, 2000);
                                    }}
                                    className={`self-end flex items-center gap-2 py-2 px-4 rounded-md ${!copyCareerPrompt ? "bg-gray-700 border border-gray-600 text-white" : "bg-green-500/15 border border-green-500/40 text-green-400"} text-sm font-semibold cursor-pointer`}>
                                    {!copyCareerPrompt ? <Copy size={16} /> : <Check size={16} />}
                                    {!copyCareerPrompt ? "Copy" : "Copied"}
                                </button>
                            </div>
                        </div>

                        <div className='flex flex-col gap-4 bg-gray-800 border border-gray-600 py-7 px-5 rounded-2xl'>
                            <span className='w-fit px-4 py-1 rounded-full bg-linear-to-br from-[#4361EE]/22 to-[#7209B7]/22 border border-white/10 text-[#A9B8FF] text-sm font-semibold'>Freelancer</span>
                            <p className='font-bold text-white text-xl'>Client Intake Bot</p>
                            <small className='text-[#9AA2BD]'>Screens new project inquiries, explains your process and rates, and collects the details you need before a call.</small>
                            <div className='flex flex-col gap-4 bg-[#0D1321] rounded-xl p-4'>
                                <pre className='text-[#9AA2BD] text-sm font-mono whitespace-pre-wrap'>{`${freelancerPrompt}`}</pre>
                                <button
                                    onClick={() => {
                                        handleCopy(freelancerPrompt)
                                        setCopyFreelancerPrompt(true)
                                        setTimeout(() => {
                                            setCopyFreelancerPrompt(false)
                                        }, 2000);
                                    }}
                                    className={`self-end flex items-center gap-2 py-2 px-4 rounded-md ${!copyFreelancerPrompt ? "bg-gray-700 border border-gray-600 text-white" : "bg-green-500/15 border border-green-500/40 text-green-400"} text-sm font-semibold cursor-pointer`}>
                                    {!copyFreelancerPrompt ? <Copy size={16} /> : <Check size={16} />}
                                    {!copyFreelancerPrompt ? "Copy" : "Copied"}
                                </button>
                            </div>
                        </div>

                        <div className='flex flex-col gap-4 bg-gray-800 border border-gray-600 py-7 px-5 rounded-2xl'>
                            <span className='w-fit px-4 py-1 rounded-full bg-linear-to-br from-[#4361EE]/22 to-[#7209B7]/22 border border-white/10 text-[#A9B8FF] text-sm font-semibold'>Small Business / Creator</span>
                            <p className='font-bold text-white text-xl'>Storefront Assistant</p>
                            <small className='text-[#9AA2BD]'>Handles common customer questions about products, shipping, and returns so you're not repeating yourself all day.</small>
                            <div className='flex flex-col gap-4 bg-[#0D1321] rounded-xl p-4'>
                                <pre className='text-[#9AA2BD] text-sm font-mono whitespace-pre-wrap'>{`${storefrontPrompt}`}</pre>
                                <button
                                    onClick={() => {
                                        handleCopy(storefrontPrompt)
                                        setCopyStoreFrontPrompt(true)
                                        setTimeout(() => {
                                            setCopyStoreFrontPrompt(false)
                                        }, 2000);
                                    }}
                                    className={`self-end flex items-center gap-2 py-2 px-4 rounded-md ${!copyStoreFrontPrompt ? "bg-gray-700 border border-gray-600 text-white" : "bg-green-500/15 border border-green-500/40 text-green-400"} text-sm font-semibold cursor-pointer`}>
                                    {!copyStoreFrontPrompt ? <Copy size={16} /> : <Check size={16} />}
                                    {!copyStoreFrontPrompt ? "Copy" : "Copied"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CREATE CHATBOT*/}
                <div className='flex flex-col items-center justify-center gap-4 md:gap-7 w-full max-w-150 bg-gray-800 border border-gray-600 py-7 px-5 rounded-2xl shadow-[0_0_60px_rgba(114,9,183,0.35)]'>
                    <h1 className='text-white font-bold text-2xl md:text-3xl'>Your chatbot is a prompt away</h1>
                    <small className='text-[#9AA2BD]'>No code, no hosting, no waiting. Write it, publish it, share it.</small>
                    <Link to='/auth' className='py-2 md:py-3 px-4 md:px-6 rounded-xl bg-linear-to-br from-[#4361EE] to-[#7209B7] text-white font-semibold md:font-bold cursor-pointer shadow-[0_0_40px_rgba(114,9,183,0.4)] hover:opacity-90 transition-opacity duration-150 text-sm'>Create Your Bot</Link>
                </div>
            </section>
            {/* FOOTER */}
            <footer className="flex flex-col gap-1 items-center justify-center md:gap-2 py-4 bg-[#0D1321]/60 backdrop-blur-md border-t border-white/[0.07] w-full">
                <small className="text-[#9AA2BD]">© 2026 MimicAI. All rights reserved.</small>
                <div className='flex items-center justify-center gap-1'>
                    <span className="text-[#4B5163] font-bold">·</span>
                    <a href="https://www.linkedin.com/in/muhammad-ghulam-ali-b25330216/" target="_blank" rel="noreferrer" className="text-[#9AA2BD] hover:text-[#A9B8FF] transition-colors text-sm">
                        Built by Muhammad Ghulam Ali
                    </a>
                </div>
            </footer>
        </main>
    )
}

export default Home
