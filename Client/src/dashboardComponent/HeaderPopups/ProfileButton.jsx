import React from "react";
import { useAuth } from "../../context/AuthContext";
import { NavLink } from "react-router-dom";

export default function ProfileButton({onClick , url}){

    const {logout} = useAuth()

    return(
        <div className="profileOpenButtonDiv">
            <div className="flex items-center p-2 gap-1">
                <div style={{backgroundImage: `url(${url})`}} className="h-6 w-6 rounded-full bg-neutral-700">

                </div>

                <div className="flex-col">
                    <div style={{fontSize: '12px'}}>Username</div>
                    <div style={{fontSize: '10px'}}>useremail</div>
                </div>
            </div>
            <div className="flex-col">
                <NavLink className='profile-options' to={"/editprofile"}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" ><path fill="currentColor" d="M120-120v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm584-528 56-56-56-56-56 56 56 56Z"/></svg>
                    <div>Edit Profile</div>
                </NavLink>

                <NavLink className='profile-options' to={"/achievements"}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" ><path fill="currentColor" d="m233-120 93-304L80-600h304l96-320 96 320h304L634-424l93 304-247-188-247 188Z"/></svg>
                    <div>Achievements</div>
                </NavLink>

                <NavLink className='profile-options' to={"/help"}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" ><path fill="currentColor" d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                    <div>Help</div>
                </NavLink>

                <NavLink className='profile-options' to={"/privacy"}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" ><path fill="currentColor" d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Z"/></svg>
                    <div>Privacy</div>
                </NavLink>

                <hr/>

                <NavLink className='profile-options' to={"/settings"}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" ><path fill="currentColor" d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm112-260q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Z"/></svg>
                    <div>Settings</div>
                </NavLink>

                <div onClick={logout} className='profile-options cursor-pointer'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="red"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
                    <div className="text-red-600">Logout</div>
                </div>
            </div>
        </div>
    )
}