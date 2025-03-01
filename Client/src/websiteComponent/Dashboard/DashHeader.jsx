import React, { useState } from "react";
import {useLocation} from 'react-router-dom'
import {ProfileButton , MessagePopup, Toggle} from '../../dashboardComponent/index'

export default function DashHeader(){
    const [openProfile , setProfileTodo] = useState()
    const [openMessage , setOpenMessage] = useState()
    const location = useLocation()
    const pathname = location.pathname.split('/').pop()

    const handleOpenMessage = () => {
        setOpenMessage((prev) => !prev);
        setProfileTodo(false);
    };

    const handleOpenProfile = () => {
        setProfileTodo((prev) => !prev);
        setOpenMessage(false);
    };

    const handleCloseProfile = () =>{
        setOpenMessage((prev) => !prev);
        setProfileTodo(false)
    }

    return(
        <div className="dashHeader relative">
            <div className="flex items-center text-sm text-neutral-500 ml-5">
                {pathname}
            </div>
            <div className="flex items-center gap-1 mr-2">
                <Toggle/>
                <div className=" h-8 w-8 hover:bg-gray-100 flex items-center justify-center rounded-full cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="gray"><path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"/></svg>
                </div>
                <div onClick={handleOpenProfile} className="relative">
                    <div className="h-8 w-8 bg-gray-100 cursor-pointer rounded-full">
                    </div>
                    {openProfile && <ProfileButton onClick={handleCloseProfile}/>}
                </div>
            </div>
            
        </div>
    )
}

