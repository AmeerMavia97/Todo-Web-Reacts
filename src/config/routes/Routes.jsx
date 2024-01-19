import React  from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Navbar from '../../components/Navbar'
import Login from '../../Screen/Login/Login'
import Register from '../../Screen/Register/Register'
import Home from '../../Screen/Home/Home'

function Routers (){
    return (
        <>
        <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='Register' element={<Register/>}/>
            <Route path='Home' element={<Home/>}/>
        </Routes>
        </BrowserRouter>       
        </>
    )

}
export default Routers