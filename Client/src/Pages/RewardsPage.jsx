import React from "react"; 
import { NavLink } from "react-router-dom";

export default function RewardsPage(){
    return(
            <div className="w-full h-full flex justify-center">
                <div className="rewards-container1 ">
                    <div className="heading">
                        Progress
                    </div>
                    <div className="flex-col mt-6">
                        <BadgesBar name={"Todo Destroyer"}/>
                        <BadgesBar name={"Todo Destroyer"}/>
                        <BadgesBar name={"Todo Destroyer"}/>
                        <BadgesBar name={"Todo Destroyer"}/>
                        <BadgesBar name={"Todo Destroyer"}/>
                    </div>
                </div>

                <div className="rewards-container2 bg-white">
                    <div className="heading">
                        Achievements
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 pt-6 w-full">
                        <Badges name={"First Steps"}/>
                        <Badges name={"First Steps"}/>
                        <Badges name={"First Steps"}/>
                        <Badges name={"First Steps"}/>
                        <Badges name={"First Steps"}/>
                    </div>
                </div>
            </div>
    )
}

function BadgesBar({img , name}){
    return(
        <div className="badge-body">
            <div style={{backgroundImage: `url(${img})`}} className="h-14 w-14 bg-black rounded-full">
            </div>

            <div className="flex-col6 items-center">
                <div className="text-xs">
                    {name}
                </div>
                <div className="flex items-center text-xs gap-2">
                    <div className="badge-progress-bar"></div>
                    <div>100%</div>
                </div>
            </div>
        </div>
    )
}

function Badges({img , name , desc , tag}){
    return(
        <div className="achievement-badge">
            <div className="flex justify-between">
                <div className="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" ><path fill="currentColor" d="M480-80q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-200v-80h320v80H320Zm10-120q-69-41-109.5-110T180-580q0-125 87.5-212.5T480-880q125 0 212.5 87.5T780-580q0 81-40.5 150T630-320H330Zm24-80h252q45-32 69.5-79T700-580q0-92-64-156t-156-64q-92 0-156 64t-64 156q0 54 24.5 101t69.5 79Zm126 0Z"/></svg>
                </div>

                <div className="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" ><path fill="currentColor" d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                </div>
            </div>

            <div style={{backgroundImage: `url(${img})`}}>
                <img src="/Images/Badges/third.png" alt="" />
            </div>
                
            <div className="flex text4 justify-center">
                {name}
            </div>

            <div>
                {desc}
            </div>
        </div>
    )
}

function Tags({name}){
    return(
        <div>
            {name === 'common' && (
            <div className="badge-tag badge-common">
                {name}
            </div>
            )}
            {name === 'rare' && (
                <div className="badge-tag badge-rare">
                    {name}
                </div>
            )}
            {name === 'ultra' && (
                <div className="badge-tag badge-ultra">
                    {name}
                </div>
            )}
        </div>
    )
}
