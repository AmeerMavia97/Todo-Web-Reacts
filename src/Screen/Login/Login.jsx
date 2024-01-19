import React, { useState } from 'react'
import { auth,   } from '../../config/firebase/config'
import { signInWithEmailAndPassword } from "firebase/auth";
import {  useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { Link } from 'react-router-dom';


const Login = () => {
    //STATES AND REF
    const [loading , setloading] = useState(false)
    const email = useRef()
    const password = useRef()
    const confirmPassword = useRef()
    const navigate = useNavigate()

    //LOGIN USER
    function LoginUser(e) {
        e.preventDefault();
        setloading(!loading)


        const Email = email.current.value
        const Password = password.current.value
        const ConfirmPassword = confirmPassword.current.value

        if (Password === ConfirmPassword) {
            signInWithEmailAndPassword(auth, Email, Password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setloading(!loading)
                    navigate("/Home")
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    console.log(errorMessage);
                });
        }
    }



    return (
        <>
            <div className='mt-[30px] ml-[30%] mr-[30%] mb-[100px] border-[1px] border-solid border-black'>
                <h1 className='font-Lobster mt-[30px] text-blue-400 text-center text-6xl'>Login</h1>
                <div>
                    <form onSubmit={LoginUser}>
                        <p className='ml-[80px] mt-[20px] font-poppins'>EMAIL:</p>
                        <input className='w-[70%] h-[35px] ml-[15%] border-[1px] border-solid border-black' type="email" placeholder="Enter your email" ref={email} />
                        <p className='ml-[80px] mt-[20px] font-poppins'>PASSWORD</p>
                        <input className='w-[70%] h-[35px]  ml-[15%] border-[1px] border-solid border-black' type="Password" placeholder="Enter your Password" ref={password} />
                        <p className='ml-[80px] mt-[20px] font-poppins'>CONFIRM PASSWORD:</p>
                        <input type="password" className='w-[70%] h-[35px] ml-[15%] border-[1px] border-solid border-black' placeholder="Enter your confirm Password" ref={confirmPassword} />
                        <button className='ml-[80px] px-40 mt-4 font-Lobster rounded-full py-2 bg-blue-400 text-white ' type='submit'>{loading ? <span class="loading loading-infinity loading-lg"></span>: 'Login'}</button>
                    </form>
                    <p className='ml-[140px] mb-5 mt-4'>Dont have an account: <span><Link to={'Register'}>Register</Link></span></p>
                </div>
            </div>
        </>
    )
}

export default Login