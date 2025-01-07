import React, { useState } from "react";
import {CreateTodoButton , ProfileButton , MessagePopup} from '../dashboardComponent/index'

export default function DashHeader(){

    const [createTodo , setCreateTodo] = useState(false)
    const [openProfile , setProfileTodo] = useState()
    const [openMessage , setOpenMessage] = useState()

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

    const handleCreate = () =>{
        setCreateTodo(true)
    }

    const handleClose = () =>{
        setCreateTodo(false)
    }


    return(
        <div className="DashHeader">
            <div className="flex justify-center items-center pl-10">
                    <div className="text-red-600 CompanyName">
                        TODO
                    </div>
                    <div className="CompanyName">
                        TOG
                    </div>
            </div>
            
            <div className="iconsbar">
                <div className="h-8 w-8 hover:bg-gray-100 flex items-center justify-center rounded-full cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="gray"><path d="M240-384h336v-72H240v72Zm0-132h480v-72H240v72Zm0-132h480v-72H240v72ZM96-96v-696q0-29.7 21.15-50.85Q138.3-864 168-864h624q29.7 0 50.85 21.15Q864-821.7 864-792v480q0 29.7-21.15 50.85Q821.7-240 792-240H240L96-96Zm114-216h582v-480H168v522l42-42Zm-42 0v-480 480Z"/></svg>
                </div>
                <div className="relative flex items-center">
                    <div className="absolute left-1 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 128 128" fill="gray">
                            <path d="M 64 6.0507812 C 49.15 6.0507812 34.3 11.7 23 23 C 0.4 45.6 0.4 82.4 23 105 C 34.3 116.3 49.2 122 64 122 C 78.8 122 93.7 116.3 105 105 C 127.6 82.4 127.6 45.6 105 23 C 93.7 11.7 78.85 6.0507812 64 6.0507812 z M 64 12 C 77.3 12 90.600781 17.099219 100.80078 27.199219 C 121.00078 47.499219 121.00078 80.500781 100.80078 100.80078 C 80.500781 121.10078 47.500781 121.10078 27.300781 100.80078 C 7.0007813 80.500781 6.9992188 47.499219 27.199219 27.199219 C 37.399219 17.099219 50.7 12 64 12 z M 64 42 C 62.3 42 61 43.3 61 45 L 61 61 L 45 61 C 43.3 61 42 62.3 42 64 C 42 65.7 43.3 67 45 67 L 61 67 L 61 83 C 61 84.7 62.3 86 64 86 C 65.7 86 67 84.7 67 83 L 67 67 L 83 67 C 84.7 67 86 65.7 86 64 C 86 62.3 84.7 61 83 61 L 67 61 L 67 45 C 67 43.3 65.7 42 64 42 z"></path>
                        </svg>
                    </div>
                    <button className="rounded-3xl text-sm pl-4 hover:bg-gray-200 hover:border"
                        style={{
                            height: '40px',
                            width:'80px',
                            color:'gray'
                        }}
                        onClick={handleCreate}>
                            Create
                    </button>
                </div>
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
            {createTodo && <CreateTodoButton onClick={handleClose}/>}
            {openProfile && <ProfileButton onClick={handleCloseProfile}/>}
            {openMessage && <MessagePopup onClick={handleClose}/>}
        </div>
    )
}