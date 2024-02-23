import React, { useContext, useEffect, useState } from 'react'
import './Account.css'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../context/AuthContext';
import { BsGoogle } from 'react-icons/bs';
import Logo from '../../assets/logo.png'
import Loader from '../loader/Loader';
import axios from 'axios';

import Cookies from "universal-cookie";
const Login = () => {
    const cookies = new Cookies();
    const { currentUser } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    // axios.defaults.withCredentials=true;
    const Handlelogin = async (e) => {
        e.preventDefault();
        setLoading(true)
        if (!email || !password) {
            toast.success("Please fill out all the fields!");
            setLoading(false)
            return;
        }
        else {
            // await axios.post('https://mern-lava-server.onrender.com/api/auth/login', { email, password })
            // await axios.post('https://mern-lava-server.vercel.app/api/auth/login', { email, password })
            await axios.post(`http://localhost:5000/api/auth/login`, { email, password })
                .then(res => {
                    console.log(res.data, "userRegister");
                    if (res.data.status == "ok") {
                        toast.success("Signin successfully");
                        cookies.set("TOKEN", res.data.data, {
                            path: "/",
                        });
                        // window.localStorage.setItem("token", res.data.data);
                        // window.localStorage.setItem("loggedIn", true);
                        window.location.href = "/";
                        // navigate('/')
                        setLoading(false)
                    }
                    else {
                        toast.error("error")
                        setLoading(false)
                        setEmail('')
                        setPassword('')
                    }
                })
                .catch((err) => {
                    console.log(err)
                    setLoading(false)
                    setEmail('')
                    setPassword('')

                })

        }
    }

    // const handleGoogleSignup = async () => {
    //     try {
    //         const provider = new GoogleAuthProvider();
    //         const { user } = await signInWithPopup(auth, provider);
    //         const userDocRef = doc(db, "users", user.uid);
    //         const userDocSnap = await getDoc(userDocRef);
    //         if (!userDocSnap.exists()) {
    //             await setDoc(doc(db, "users", user.uid), {
    //                 uid: user.uid,
    //                 fullName: '',
    //                 displayName: user.displayName,
    //                 email: user.email,
    //                 address: '',
    //                 photoURL: user.photoURL,
    //                 phoneNumber: ''
    //                 // phoneNumber: user.phoneNumber
    //                 // password: user.reloadUserInfo.passwordHash,
    //             });
    //         }
    //         toast.success("Signin successfully");
    //         // navigate("/");
    //     } catch (error) {
    //         toast.error(error);
    //     }
    // };
    const Handleforget = async (e) => {
        e.preventDefault();
        const email = 'mohamedwael4553@gmail.com'
        await axios.post(`http://localhost:5000/api/auth/forgot-password`, { email })
            .then(res => { console.log(res) })
            .catch(err => console.log(err))
    }
    return (
        <>
            {/* <ToastContainer /> */}
            {loading ? <Loader />
                : <div className='body'>
                    {/* <div className="-translate-y-10 mb-8">
                    <div className="flex gap-4 items-center">
                        <img src={Logo} className="w-20" />
                        <h1 className="font-black text-slate-700  dark:text-white text-4xl">LavaApp</h1>
                    </div>
                </div> */}
                    <div className="wrapper">
                        <span className="icon-close">
                            <ion-icon id="close-outline" name="close-outline"></ion-icon> </span>
                        <div className="form-box login">
                            <h2>Login</h2>
                            <form className='form' >
                                <div className="input-box">
                                    <span className="icon">
                                        <ion-icon name="mail"></ion-icon>
                                    </span>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <label>Email</label>
                                </div>
                                <div className="input-box">
                                    <span className="icon">
                                        <ion-icon name="lock-closed"></ion-icon>
                                    </span>
                                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                    <label>Password</label>
                                </div>
                                <button onClick={Handlelogin} type="submit" className="btn" id="login_btn">
                                    Login
                                    {/* {`${loading ? `Login ....` : `Login`}`} */}
                                </button>
                                {/* <button onClick={Handleforget} className="btn" id="forget_btn">
                                    Forget password
                                </button> */}
                                <div className="login-register">
                                    <p>Don't have an acoount ?
                                        <Link to="/Signup" className="register-link"> Register</Link>
                                    </p>
                                </div>
                            </form>
                            <div className="flex items-center gap-3 my-5">
                                <hr className="w-full border-slate-300" />
                                <p className='text-white'>OR</p>
                                <hr className="w-full border-slate-300" />
                            </div>
                            <button
                                className="flex bg-[#477cff] text-white w-full justify-between py-2 px-4 rounded shadow font-semibold"

                            >
                                <BsGoogle size={20} />
                                <span>Continue with Google</span>
                                <span></span>
                            </button>
                        </div>

                    </div>
                </div>
            }
        </>
    )
}

export default Login