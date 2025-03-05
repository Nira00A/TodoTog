import React, { useState } from "react";
import {Link , Navigate , useNavigate} from 'react-router-dom'
import { useAuth } from "../../context/AuthContext";

function Register(){
    const {user , register} = useAuth()
    const [useremail , setUseremail] = useState('')
    const [userpassword , setUserpassword] = useState('')
    const [username , setUsername] = useState('')
    const navigate = useNavigate()

    const handleRegister = async(e)=>{
        e.preventDefault()

        const token = localStorage.getItem('token')

        try {
            const createAccount = await register({username , useremail , userpassword})

        } catch (error) {
            console.log('This error occured in sign-in.js file' , error)
        }

        if (token){
            navigate('/dashboard')
        }
        else{
            navigate('/login')
        }
        
    }

    function ischecked(){
        var check = document.getElementById('checked')
        var passComponent = document.getElementById('passComponent')
        
        if(check.checked === true){
            passComponent.type = 'text'
        }
        else{
            passComponent.type = 'password'
        }
    }

    return(
        <div  style={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'center',
                    alignItems:"center"}}
               className="h-screen"
                >
                
            <div 
            style={{
                height:'500px',
                width:'400px',
            }} 
            className="rounded-lg shadow-2xl bg-neutral-800">
                <div className="flex-col"
                    style={{
                        padding:"2",
                        display:'flex',
                        flexDirection:'column',
                        justifyContent:'center',
                        alignItems:'center',
                    }}
                >
                    <div className="text-3xl text-white font-bold pt-8">
                        Register
                    </div>
                    <div className="text-neutral-400 text-sm">
                        Do you want to Register? or <Link to='/login' className="text-blue-500">login</Link>
                    </div>
                    <form className="flex-row pt-8" onSubmit={handleRegister}>
                        <div><input 
                                style={{
                                    height:'40px',
                                    width:'250px',
                                    padding:'10px'
                                }}
                                onChange={(e) => setUsername(e.target.value)} 
                                type="text" 
                                autoComplete="off"
                                placeholder="Name"
                                className="text-black rounded-xl mb-5" 
                                name="name"/></div>
                        <div><input 
                        style={{
                            height:'40px',
                            width:'250px',
                            padding:'10px'
                        }} 
                        onChange={(e) => setUseremail(e.target.value)} 
                        type="email" 
                        autoComplete="off"
                        placeholder="Email"
                        className="text-black rounded-xl mb-5" 
                        name="email"/></div>
                        <div><input 
                        style={{
                            height:'40px',
                            width:'250px',
                            padding:'10px'
                        }} 
                        id="passComponent"
                        type="password"
                        onChange={(e) => setUserpassword(e.target.value)} 
                        placeholder="Password"
                        className="text-black rounded-xl mb-1" 
                        name="password"/></div>
                        <div className="flex justify-center ">
                            <input id="checked" onClick={ischecked} type="checkbox"/>
                            <div className="text-sm ml-2 text-neutral-400">
                                Show
                            </div>
                            <div className="text-blue-500 font-blue-700 text-sm pl-20">
                                <Link to='/gg'>
                                    forgot password?
                                </Link>
                        </div>
                        </div>
                        <button className="h-10 w-32 rounded-full text-white font-medium shadow-md mt-5 bg-neutral-900 hover:bg-neutral-600">
                            Submit
                        </button>
                    </form>
                    <div className="text-white flex justify-center">
                            ____________________________________
                        </div>
                        <div>
                            <div 
                            style={{
                                height:'40px',
                                width:'250px',
                                padding:'10px'
                            }} 
                            className="text-black rounded-xl mb-1 mt-6 bg-white flex justify-center justify-items-center hover:bg-neutral-400 cursor-pointer">
                                Google
                            </div>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Register