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
        <div className="dashHeader">
            <div className="flex items-center text-sm text-neutral-500 ml-5">
                {pathname}
            </div>
            <div className="iconsbar">
                <Toggle/>
                <div className=" h-8 w-8 hover:bg-gray-100 flex items-center justify-center rounded-full cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="gray"><path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z"/></svg>
                </div>
                <div onClick={handleOpenMessage}>
                    <div className="h-8 w-8  hover:bg-gray-100 flex items-center justify-center rounded-full cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="gray"><path d="M216-144q-29 0-50.5-21.5T144-216v-528q0-29.7 21.5-50.85Q187-816 216-816h528q29.7 0 50.85 21.15Q816-773.7 816-744v528q0 29-21.15 50.5T744-144H216Zm0-72h528v-144H632q-23 43-63.5 69.5T480-264q-49 0-89.5-26T328-360H216v144Zm264-120q40 0 68-28t28-68h168v-312H216v312h168q0 40 28 68t68 28ZM216-216h528-528Z"/></svg>
                    </div>
                </div>
                <div onClick={handleOpenProfile} className="ml-2">
                    <div className="h-8 w-8 bg-gray-100 cursor-pointer rounded-full">
                    </div>
                </div>
            </div>
            {openProfile && <ProfileButton onClick={handleCloseProfile}/>}
        </div>
    )
}