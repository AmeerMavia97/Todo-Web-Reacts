import React, { useEffect, useState } from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from '../config/firebase/config';
import {  onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';



const Navbar = () => {
    const navigate = useNavigate()
    let [Name, setName] = useState()
    let [img , setimg] = useState()

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const uid = user.uid;
                console.log(uid);
                const q = query(collection(db, "RegisterUsers"), where('Uid' , '==' , uid));
                const querySnapshot = await getDocs(q);

                querySnapshot.forEach((doc) => {
                    console.log("hello");
                    setName(doc.data().FirstName + doc.data().lastName)
                    setimg(doc.data().Userimg)
                });
            } else {
                navigate('/')
            }
        });
    }, [])


    function Logout(){

        signOut(auth).then(() => {

            navigate('/')

          }).catch((error) => {
          });
          

    }






    return (
        <>
            <div>
                <nav className="flex bg-[#1d202c] p-1 text-white justify-between">
                    <div className="flex ml-[10%]  gap-3">
                        <p className="text-blue-400 text-[30px]"></p>
                        <h1 className="text-[20px] mt-2  font-poppins">AM TODO</h1>
                    </div>

                    <div className="flex gap-[30px] mt text-[14px] mr-[7%]">
                        <p className="pl-[20px] pr-[20px] mt-3  pt-[2px] pb-1 text-center mb-3  border-blue-400 border-[1px] border-solid rounded-[30px] text-xs text-blue-400" >{Name}</p>
                        <p type="button" className="mt-3">Profile</p>
                        <p type="button" className="mt-3">About</p>
                        <p type="button" onClick={Logout} className="mt-3">Logout</p>
                        <img className="w-10 h-10 mt-1 rounded-full" src={img} alt="" />


                    </div>
                </nav>
            </div>
        </>
    )
}

export default Navbar