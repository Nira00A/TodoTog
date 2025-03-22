import React, { useState , useEffect} from "react";
import {useFeature} from '../context/FeatureContext'

export default function Settings(){

    const {toogleChecked , setToogleChecked} = useFeature()

    useEffect(() => {
            if (toogleChecked) {
                setLightMode()
            } else {
                setDarkMode()
            }
            localStorage.setItem("toggle", toogleChecked); 
    }, [toogleChecked]);
    
    const setDarkMode = () =>{
        document.querySelector("body").setAttribute("data-theme" , "dark")
    }

    const setLightMode = () =>{
        document.querySelector("body").setAttribute("data-theme" , "light")
    }

    return(
        <div className="h-full w-full flex justify-center ">
            <div style={{transition: `500ms cubic-bezier(0.165, 0.84, 0.44, 1)`}} className="w-[1150px] max-navxl:w-full flex flex-col gap-6 p-3 pb-6 overflow-y-scroll scrollbar-none">
                <div>
                    <div className="heading">Account Settings</div>
                    <div className="text-neutral-500 text-sm select-none">The below you can change your settings...</div>
                </div>

                <div className="flex flex-col w-full h-[300px] text4 rounded-lg div-color">
                    <div className="flex gap-1 w-full items-center pl-8 p-2 h-14 rounded-t-lg bg-[var(--popup-color)] max-navsm:pl-2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" ><path fill="currentColor" d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm40-83q119-15 199.5-104.5T800-480q0-123-80.5-212.5T520-797v634Z"/></svg>
                        <div>Choose Theme</div>
                    </div>
                    <div className="flex max-[632px]:hidden items-center ml-8 m-3 h-max">
                        <div className="flex gap-3 cursor-pointer">
                            <div onClick={()=>setToogleChecked((prev)=>!prev)} className={`${toogleChecked ?'border-green-700' : 'border-[var(--border-color)]'} flex flex-col bg-(var(--popup-color)) border-[2px] pt-3 rounded-xl`}>
                                <div style={{backgroundImage: 'url(/Images/Badges/lighttheme.png)'}} className="h-32 w-60 bg-cover bg-center">

                                </div>
                                <div className="flex items-center gap-2 mt-3 w-full h-12 rounded-b-lg div-color border-t-[1px] border-[var(--border-color)]">
                                    <div className={`${toogleChecked ?'border-green-700 border-[3px]': 'border-[var(--border-color)]'} ml-6 h-4 w-4 rounded-full bg-transparent border-[2px]`}>

                                    </div>
                                    <div className="text-sm">
                                        System theme (Light)
                                    </div>
                                </div>
                            </div>

                            <div onClick={()=>setToogleChecked((prev)=>!prev)} className={`${!toogleChecked ?'border-green-700' : 'border-[var(--border-color)]'} flex flex-col bg-(var(--popup-color)) border-[2px] pt-3 rounded-xl`}>
                                <div style={{backgroundImage: 'url(/Images/Badges/darktheme.png)'}} className="h-32 w-60 bg-cover bg-center">

                                </div>
                                
                                <div className="flex items-center gap-2 mt-3 w-full h-12 rounded-b-lg div-color border-t-[1px] border-[var(--border-color)]">
                                    <div className={`${!toogleChecked ?'border-green-700 border-[3px]': 'border-[var(--border-color)]'} ml-6 h-4 w-4 rounded-full bg-transparent border-[2px]`}>

                                    </div>
                                    <div className="text-sm">
                                        System theme (Dark)
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="hidden max-[632px]:flex max-[632px]:flex-col gap-3 items-center text-sm ml-8 m-3 h-max max-navsm:ml-2">
                        <div onClick={()=>setToogleChecked((prev)=>!prev)} className={`${toogleChecked ?'border-green-700 border-[1px]': 'border-[var(--border-color)]'} h-14 flex gap-3 items-center w-full border-[1px] border-[var(--border-color)]`}>
                            <div className={`${toogleChecked ?'border-green-700 border-[3px]': 'border-[var(--border-color)]'} ml-2 h-4 w-4 rounded-full bg-transparent border-[2px]`}>
                            </div>

                            <div className="w-full flex items-center justify-between">
                                <div>System theme (Light)</div>
                                <div style={{backgroundImage: 'url(/Images/Badges/lighttheme.png)'}} className="h-10 w-16 bg-cover bg-center">

                                </div>
                            </div>
                        </div>
                        <div onClick={()=>setToogleChecked((prev)=>!prev)} className={`${!toogleChecked ?'border-green-700 border-[1px]': 'border-[var(--border-color)]'} h-14 flex gap-3 items-center w-full border-[1px] border-[var(--border-color)]`}>
                            <div className={`${!toogleChecked ?'border-green-700 border-[3px]': 'border-[var(--border-color)]'} ml-2 h-4 w-4 rounded-full bg-transparent border-[2px]`}>
                            </div>

                            <div className="w-full flex items-center justify-between">
                                <div>System theme (Dark)</div>
                                <div style={{backgroundImage: 'url(/Images/Badges/darktheme.png)'}} className="h-10 w-16 bg-cover bg-center">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col rounded-lg div-color">
                    <div className="flex gap-1 w-full items-center pl-6 h-14 text4 rounded-t-lg bg-[var(--popup-color)] max-navsm:pl-2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" ><path fill="currentColor" d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
                            <div>Profile Settings</div>
                    </div>
                    <div className="flex pl-6 mt-3 max-navsm:pl-2">
                        <div className="flex flex-col gap-3 min-w-[100%]">
                            <div className="flex flex-col gap-1">
                                <div className="text-neutral-500 text-sm">Username</div>
                                <input style={{backgroundColor: `var(--popup-color)`}} className="w-[98%] pl-4 text4 rounded-md h-10 border-[1px] border-[var(--border-color)]"/>
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="text-neutral-500 text-sm">Email</div>
                                <div style={{backgroundColor: `var(--popup-color)`}} className="w-[98%] pl-4 text4 rounded-md h-10 border-[1px] border-[var(--border-color)] cursor-not-allowed"></div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <div className="text-neutral-500 text-sm">Location</div>
                                <input style={{backgroundColor: `var(--popup-color)`}} className="w-[98%] pl-4 text4 rounded-md h-10 border-[1px] border-[var(--border-color)]"/>
                            </div>

                            <div className="mb-3">
                                <button style={{backgroundColor: 'var(--save-green)'}} className="flex justify-start text-sm p-2 rounded-lg text-white mt-3">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full h-max flex flex-col gap-3 rounded-lg div-color">
                    <div className="flex gap-1 w-full items-center pl-6 h-14 text4 rounded-t-lg bg-[var(--popup-color)] max-navsm:pl-2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" ><path fill="currentColor" d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>
                            <div>Password Settings</div>
                    </div>

                    <div className="flex flex-col gap-3 mb-3 min-w-[100%] pl-6 max-navsm:pl-2">
                        <div className="flex flex-col gap-1">
                            <div className="text-neutral-500 text-sm">Password</div>
                            <input style={{backgroundColor: `var(--popup-color)`}} className="w-[98%] pl-4 text4 rounded-md h-10 border-[1px] border-[var(--border-color)]"/>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="text-neutral-500 text-sm">New Password</div>
                            <div style={{backgroundColor: `var(--popup-color)`}} className="w-[98%] pl-4 text4 rounded-md h-10 border-[1px] border-[var(--border-color)] cursor-not-allowed"></div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="text-neutral-500 text-sm">Confirm Password</div>
                            <input style={{backgroundColor: `var(--popup-color)`}} className="w-[98%] pl-4 text4 rounded-md h-10 border-[1px] border-[var(--border-color)]"/>
                        </div>

                        <div className="mb-3">
                            <button style={{backgroundColor: 'var(--save-green)'}} className="flex justify-start text-sm p-2 rounded-lg text-white mt-3">
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-3 rounded-lg div-color">
                    <div className="flex w-full items-center pl-6 h-14 font-semibold rounded-t-lg bg-red-600 max-navsm:pl-2">
                        <div className="flex gap-1 text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" ><path fill="currentColor" d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>
                            <div> Delete Account</div>
                        </div>
                    </div>
                    <div className="pl-6 pt-3 h-28 max-navsm:pl-2">
                        <div className="text-sm text-neutral-500">Deleting the account will lose all your progress</div>
                        <button className="flex justify-start p-2 pl-4 pr-4 rounded-lg text-md bg-red-700 text-white mt-3">
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}