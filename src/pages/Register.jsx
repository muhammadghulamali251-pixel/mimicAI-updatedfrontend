import React from 'react'
import { Bot, AlertCircle, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { registerUser, loginUser } from '../api/auth'
import { useNavigate } from 'react-router-dom'


const Register = () => {

    const navigate = useNavigate()

    // STATES
    const [login, setLogin] = useState(true)

    // Register user states
    const [registerUserName, setRegisterUserName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerSuccessMessage, setRegisterSuccessMessage] = useState("");
    const [registerErrorMessage, setRegisterErrorMessage] = useState("");
    const [registerLoader, setRegisterLoader] = useState(false);

    // Login user states
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [loginSuccessMessage, setLoginSuccessMessage] = useState("");
    const [loginErrorMessage, setLoginErrorMessage] = useState("");
    const [loginLoader, setLoginLoader] = useState(false);

    // APIs
    // Register
    const sendRegisterUser = async (registerUserData) => {
        setRegisterErrorMessage("")
        setRegisterSuccessMessage("")
        setRegisterLoader(true)
        const result = await registerUser(registerUserData);
        if (!result.success) {
            setRegisterLoader(false)
            setRegisterErrorMessage(result.message)
            setTimeout(() => {
                setRegisterErrorMessage("")
            }, 3000);
            return;
        }
        localStorage.setItem('token', result.token)
        setRegisterSuccessMessage(result.message)
        setTimeout(() => {
            setRegisterSuccessMessage("")
        }, 3000);
        setRegisterLoader(false)
    }


    // Login
    const sendLoginUser = async (loginUserData) => {
        setLoginErrorMessage("")
        setLoginSuccessMessage("")
        setLoginLoader(true)
        const result = await loginUser(loginUserData);
        if (!result.success) {
            setLoginLoader(false)
            setLoginErrorMessage(result.message)
            setTimeout(() => {
                setLoginErrorMessage("")
            }, 3000);
            return;
        }
        localStorage.setItem('token', result.token)
        localStorage.setItem('user', JSON.stringify(result.user))
        setLoginSuccessMessage(result.message)
        setTimeout(() => {
            setLoginSuccessMessage("")
        }, 3000);
        setLoginLoader(false)
        navigate('/botprofile')
    }

    //SUBMIT HANDLER
    const loginHandler = (e) => {
        e.preventDefault()
        const loginUserData = {
            email: loginEmail,
            password: loginPassword
        }
        sendLoginUser(loginUserData)
        setLoginEmail("")
        setLoginPassword("")
    }

    const registerHandler = (e) => {
        e.preventDefault()
        const registerUserData = {
            username: registerUserName,
            email: registerEmail,
            password: registerPassword
        }
        sendRegisterUser(registerUserData)
        setRegisterUserName("")
        setRegisterEmail("")
        setRegisterPassword("")
    }


    return (
        <div className='flex items-center justify-center min-w-screen min-h-screen h-full w-full bg-[#0D1321] bg-[radial-gradient(900px_560px_at_12%_0%,rgba(67,97,238,0.30),transparent_60%),radial-gradient(800px_640px_at_90%_18%,rgba(114,9,183,0.26),transparent_55%)]'>

            {/* LOGIN REGISER CENTER */}
            <div className='w-full max-w-120 flex flex-col items-center px-2 gap-8'>

                <div className="logo self.center flex items-center gap-2">
                    <span className='flex items-center justify-center h-10 w-10 bg-linear-to-br from-[#4361EE] to-[#7209B7] rounded-2xl'>
                        <Bot className='text-white' size={20} />
                    </span>
                    <h1 className='font-bold text-2xl text-white'>MimicAI</h1>
                </div>

                <form onSubmit={login ? loginHandler : registerHandler} className='flex flex-col gap-5 md:gap-7 w-full py-6 px-3 md:py-8 md:px-6 bg-white/6 border border-white/[0.07] backdrop-blur-md rounded-md'>

                    <div className="loginRegisterButton w-full bg-[#0D1321] rounded-md">
                        <button
                            type='button'
                            onClick={() => setLogin(true)}
                            className={`py-2 w-[50%] text-white cursor-pointer ${login ? "bg-linear-to-br from-[#4361EE] to-[#7209B7] rounded-md" : " "}`}>Log in</button>
                        <button
                            type='button'
                            onClick={() => setLogin(false)}
                            className={`py-2 w-[50%] text-white  cursor-pointer ${!login ? "bg-linear-to-br from-[#4361EE] to-[#7209B7] rounded-md" : " "}`}>Register</button>
                    </div>

                    {login && (
                        <>
                            <div className="welcomeMessage flex flex-col gap-1">
                                <p className='text-white font-bold text-xl'>Welcome back</p>
                                <small className='text-[#8B93AB]'>Log in to manage your bot.</small>
                            </div>

                            {loginErrorMessage && (
                                <span className='flex items-center gap-2 px-4 py-3 w-full bg-[#F25C5C]/10 border border-[#F25C5C]/35 rounded-md'>
                                    <AlertCircle className='text-[#f0cccc]' size={18} />
                                    <p className='text-[#f0cccc] text-sm'>{loginErrorMessage}</p>
                                </span>
                            )}

                            {loginSuccessMessage && (
                                <span className='flex items-center gap-2 px-4 py-3 w-full bg-emerald-500/10 border border-emerald-500/30 rounded-md'>
                                    <CheckCircle className='text-emerald-300' size={18} />
                                    <p className='text-emerald-200 text-sm'>{loginSuccessMessage}</p>
                                </span>
                            )}

                            <div className="inputs flex flex-col gap-3">
                                <div className="email flex flex-col flex-full gap-1">
                                    <label className='text-white text-sm'>Email</label>
                                    <input
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        required
                                        className='border border-white/10 w-full py-2 px-4 rounded-md text-white placeholder:text-gray-600 placeholder:text-sm' type="text" placeholder='you@example.com' />
                                </div>
                                <div className="password flex flex-col gap-1">
                                    <label className='text-white text-sm'>Password</label>
                                    <input
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        required
                                        className='border border-white/10 w-full py-2 px-4 rounded-md text-white placeholder:text-gray-600 placeholder:text-sm' type="password" placeholder='At least 6 characters' />
                                </div>
                            </div>

                            <div className="button">
                                <button 
                                disabled = {loginLoader}
                                className='flex items-center justify-center w-full py-2 bg-linear-to-br from-[#4361EE] to-[#7209B7] rounded-md text-white font-semibold cursor-pointer hover:shadow-[0_6px_18px_rgba(67,97,238,0.35)] transition-shadow text-sm' type='submit'>{!loginLoader ? "Log in" :
                                <span className='block h-5 w-5 rounded-full border-2 border-gray-300 border-t-transparent animate-spin'></span>
                            }</button>
                            </div>
                        </>
                    )}

                    {!login && (
                        <>
                            <div className="welcomeMessage flex flex-col gap-1">
                                <p className='text-white font-bold text-xl'>Create your account</p>
                                <small className='text-[#8B93AB]'>Set up your bot in a couple of minutes.</small>
                            </div>

                            {registerErrorMessage && (
                                <span className='flex items-center gap-2 px-4 py-3 w-full bg-[#F25C5C]/10 border border-[#F25C5C]/35 rounded-md'>
                                    <AlertCircle className='text-[#f0cccc]' size={18} />
                                    <p className='text-[#f0cccc] text-sm'>{registerErrorMessage}</p>
                                </span>
                            )}

                            {registerSuccessMessage && (
                                <span className='flex items-center gap-2 px-4 py-3 w-full bg-emerald-500/10 border border-emerald-500/30 rounded-md'>
                                    <CheckCircle className='text-emerald-300' size={18} />
                                    <p className='text-emerald-200 text-sm'>{registerSuccessMessage}</p>
                                </span>
                            )}

                            <div className="inputs flex flex-col gap-3">
                                <div className="username flex flex-col gap-1">
                                    <label className='text-white text-sm'>Username</label>
                                    <input
                                        value={registerUserName}
                                        onChange={(e) => setRegisterUserName(e.target.value)}
                                        required
                                        className='border border-white/10 w-full py-2 px-4 rounded-md text-white placeholder:text-gray-600 placeholder:text-sm' type="text" placeholder='Muhammad Ghulam Ali' />
                                </div>
                                <div className="email flex flex-col flex-full gap-1">
                                    <label className='text-white text-sm'>Email</label>
                                    <input
                                        value={registerEmail}
                                        onChange={(e) => setRegisterEmail(e.target.value)}
                                        required
                                        className='border border-white/10 w-full py-2 px-4 rounded-md text-white placeholder:text-gray-600 placeholder:text-sm' type="text" placeholder='you@example.com' />
                                </div>
                                <div className="password flex flex-col gap-1">
                                    <label className='text-white text-sm'>Password</label>
                                    <input
                                        value={registerPassword}
                                        onChange={(e) => setRegisterPassword(e.target.value)}
                                        required
                                        className='border border-white/10 w-full py-2 px-4 rounded-md text-white placeholder:text-gray-600 placeholder:text-sm' type="password" placeholder='At least 6 characters' />
                                </div>
                            </div>

                            <div className="button">
                                <button
                                disabled = {registerLoader}
                                    className='flex items-center justify-center w-full py-2 bg-linear-to-br from-[#4361EE] to-[#7209B7] rounded-md text-white font-semibold cursor-pointer hover:shadow-[0_6px_18px_rgba(67,97,238,0.35)] transition-shadow text-sm' type='submit'>{!registerLoader ? "Create account" :
                                        <span className='block h-5 w-5 rounded-full border-2 border-gray-300 border-t-transparent animate-spin'></span>
                                    }</button>

                            </div>
                        </>
                    )}

                </form>
            </div>
        </div>
    )
}

export default Register
