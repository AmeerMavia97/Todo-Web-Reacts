import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { auth, db, storage } from '../../config/firebase/config'
import { Navigate } from 'react-router-dom';
import { useRef } from 'react';

const Register = () => {

    //STATES AND REF
    const [loading, setloading] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const email = useRef()
    const password = useRef()
    const confirmPassword = useRef()
    const firstName = useRef()
    const lastName = useRef()
    const navigate = useNavigate()

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };



    // REGISTER USER
    function RegisterUser(e) {
        e.preventDefault();
        setloading(!loading)


        //REF VALUE CONVERT INTO VARAIBLES
        let Email = email.current.value
        let Password = password.current.value
        let FirstName = firstName.current.value
        let LastName = lastName.current.value
        let ConfirmPassword = confirmPassword.current.value

        if (Password === ConfirmPassword) {
            //CREATE USER FUNCTION
            createUserWithEmailAndPassword(auth, Email, Password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    //UPLOAD IMAGE FUNCTION
                    const file = selectedFile
                    const storageRef = ref(storage, Email);
                    uploadBytes(storageRef, file).then(() => {
                        //GET IMG URL FUNCTION
                        getDownloadURL(ref(storageRef))
                            .then((url) => {
                                //ADD DOCUMENT FUNCTION
                                try {
                                    addDoc(collection(db, "RegisterUsers"), {
                                        FirstName: FirstName,
                                        lastName: LastName,
                                        Email: Email,
                                        Uid: user.uid,
                                        Userimg: url
                                    });
                                }
                                catch (e) {
                                    console.error("Error adding document: ", e);
                                }
                                navigate('/Home')

                            })
                            .catch((error) => {
                                console.log("img not download");
                            })
                    })
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(error);
                    email.current.value = ''
                    firstName.current.value = ''
                    lastName.current.value = ''

                });
        } else {
            console.log("password are not same");
            password.current.value = ''
            confirmPassword.current.value = ''
        }

        //Empty VALUE






    }

    return (
        <>
            <div className='mt-[30px] ml-[30%] mr-[30%] mb-[100px] border-[1px] border-solid border-black'>
                <h1 className='font-Lobster mt-[30px] text-blue-400 text-center text-6xl'>Register </h1>
                <div>
                    <form onSubmit={RegisterUser}>
                        <p className='ml-[80px] mt-[30px] font-poppins'>NAME:</p>
                        <input className='w-[70%] h-[35px] ml-[15%] border-[1px] border-solid border-black' type="text" placeholder="Enter your name" ref={firstName} required />
                        <p className='ml-[80px] mt-[20px] font-poppins'>LAST NAME:</p>
                        <input className='w-[70%] h-[35px] ml-[15%] border-[1px] border-solid border-black' type="text" placeholder="Enter your NAME" ref={lastName} required />
                        <p className='ml-[80px] mt-[20px] font-poppins'>EMAIL:</p>
                        <input className='w-[70%] h-[35px] ml-[15%] border-[1px] border-solid border-black' type="email" placeholder="Enter your email" ref={email} required />
                        <p className='ml-[80px] mt-[20px] font-poppins'>PASSWORD</p>
                        <input className='w-[70%] h-[35px]  ml-[15%] border-[1px] border-solid border-black' type="Password" placeholder="Enter your Password" ref={password} required />
                        <p className='ml-[80px] mt-[20px] font-poppins'>CONFIRM PASSWORD:</p>
                        <input type="password" className='w-[70%] h-[35px] ml-[15%] border-[1px] border-solid border-black' placeholder="Enter your confirm Password" ref={confirmPassword} required />
                        <input type="file" className='ml-[80px] mt-2' onChange={handleFileChange} required /> <br />
                        <button className='ml-[80px] px-40 mt-4 font-Lobster rounded-full py-2 bg-blue-400 text-white ' type='submit'>{loading ? <span class="loading loading-infinity loading-lg"></span> : 'Register'}</button>
                    </form>
                    <p className='ml-[140px] mb-5 mt-4'>Already have an account: <span><Link to={'/'}>Login</Link></span></p>
                </div>
            </div>
        </>
    )
}

export default Register