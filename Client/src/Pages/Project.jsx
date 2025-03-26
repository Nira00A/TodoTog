import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useFeature } from "../context/FeatureContext";

export default function Project(){

    const [isTagClicked , setIsTagClicked] = useState('All')
    const [credit , setCredit] = useState(29)
    const [status , setStatus] = useState()
    const {totalProjects} = useFeature()

    return(
        <div className="w-full h-full flex justify-center relative">
            <div className="w-[1150px] flex flex-col p-3 max-navlg:w-full overflow-scroll relative scrollbar-none">
                <div>
                    <div className="heading">
                        Projects
                    </div>
                    <div className="text-neutral-500 text-[14px]">
                        Monitor all your projects here
                    </div>
                </div>

                <div className="flex justify-between items-center w-full mt-3 relative">
                    <div>
                        <input className="p-[6px] w-[250px] text4 rounded-md bg-transparent border border-[var(--border-color)]" type="search" placeholder="Search..."/>
                    </div>

                    <NavLink to={'/dashboard/create'} className="overlay-color hover:bg-neutral-500 text4 flex p-[6px] rounded-md items-center relative"> 
                        <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px"><path fill="currentColor" d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
                        <div className="text-[14px] mr-1 ">Create</div>
                    </NavLink>
                </div>

                <hr className="ml-0 mr-0 mt-4 mb-4"/>

                <div className="flex gap-2 justify-start w-full">
                    <Tags name={'All'} ischecked={isTagClicked} setischecked={setIsTagClicked}/>
                    <Tags name={'Completed'} ischecked={isTagClicked} setischecked={setIsTagClicked}/>
                    <Tags name={'Ongoing'} ischecked={isTagClicked} setischecked={setIsTagClicked}/>
                    <Tags name={'Canceled'} ischecked={isTagClicked} setischecked={setIsTagClicked}/>
                </div>

                <div className="h-full w-full flex gap-2 mt-3">
                    {totalProjects ? totalProjects.map((items)=>(
                        <ProjectCard credit={credit} tag={items.tag} title={items.title} description={items.description} createdate={items.created_at.split('T')[0]} duedate={items.duedate.split('T')[0]}/>
                    )) : ""}
                    
                </div>
            </div>
        </div>
    )
}

function Tags({name , ischecked , setischecked}){
    return(
        <div onClick={()=> setischecked(name)} className={`${ischecked === name ? 'bg-red-500' : 'overlay-color'} rounded-md p-1 text4 text-[12px] select-none pl-2 pr-2 cursor-pointer`}>
            {name}
        </div>
    )
}

function ProjectCard({credit , description , title , tag , progress , createdate , duedate}){
    let desc
    const parsedTag = JSON.parse(tag)
    if(description){
        desc = description.slice(0 , 54)+'...'
    }
    return(
        <div className="w-[320px] h-max rounded-lg overlay-color p-2 opacity-80 select-none hover:opacity-70 cursor-pointer relative">
            <div className="flex items-center justify-between">
                <div className="flex gap-1 items-center">
                    <div>
                        <ProjectTags name={parsedTag.name} color={parsedTag.color}/>
                    </div>

                    <div>
                        <ProjectStatus name={'ongoing'}/>
                    </div>
                </div>

                <div className="">
                    <ProjectCredit credit={credit}/>
                </div>
            </div>

            <div className="mt-2">
                <div className="text4 font-bold">
                    {title}
                </div>
                <div className="text-neutral-500 text-[12px]">
                    {desc}
                </div>
            </div>

            <hr className="border-neutral-600 mt-3 mr-0 ml-0"/>
            
            <div className="w-full flex text-white text-[12px] justify-between">
                <div>
                    Progress
                </div>
                <div>
                    30%
                </div>
            </div>
            <ProgressBar />
            <div className="flex mt-2 gap-2">
                <div className="flex text4 text-[10px] gap-1">
                    <div>Created:</div>
                    <div>
                        {createdate}
                    </div>
                </div>
                
                <div className="flex text-red-600 text-[10px] gap-1">
                    <div>Due:</div>
                    <div>
                        {duedate}
                    </div>
                </div>
            </div>

            <div className="flex items-center mt-3 justify-between">
                <div className="flex justify-center items-center text4 text-[10px] rounded-sm h-6 w-16  div-color cursor-pointer hover:bg-neutral-600 select-all">
                    Add Task +
                </div>

                <div className="cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="red"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </div>
            </div>
        </div>
    )
}

function ProjectTags({name , color}){
    return(
        <div className={`text-[12px] ${color} text-white pl-1 pr-1 rounded-sm`}>
            #{name}
        </div>
    )
}

function ProjectStatus({name}){
    let bgcolor

    if(name === 'completed'){
        bgcolor = 'bg-green-400'
    }
    else if(name === 'ongoing'){
        bgcolor = 'bg-yellow-500'
    }
    else{
        bgcolor = 'bg-red-400'
    }
    return(
        <div className={`${bgcolor} p-[2px] text-[12px] pl-1 pr-1 flex items-center justify-center rounded-full text-white`}>
            {name}
        </div>
    )
}

function ProjectCredit({credit}){
    let bgcolor

    if(credit > 70){
        bgcolor = 'bg-green-500'
    }
    else if(credit > 30){
        bgcolor = 'bg-yellow-500'
    }
    else{
        bgcolor = 'bg-red-500'
    }

    return (
        <div
          className={`${bgcolor} p-[2px] pl-1 pr-1 text-[12px] flex items-center justify-center rounded-full text-white`}
        >
          {credit} Points
        </div>
    )
}

function ProgressBar({value = 10}){


    return(
        <div className="w-full h-[10px] div-color rounded-full relative mt-1">
            <div style={{width: `${value}%`}} className="bg-red-500 rounded-full h-[10px] absolute">

            </div>
        </div>
    )
}