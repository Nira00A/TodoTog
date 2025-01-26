import React, { useState } from "react";
import {NavLink} from 'react-router-dom'

export default function NewsFeed(){
    return(
        <div className="Newsfeed">
            <div className="text-2xl p-4 flex font-semibold">
                News-Feed
            </div>
            <div className="flex-row justify-items-center">
                <NewsTopStories />
                <NewsCard img={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREHjj0QVmfJLo5BrdEKQZ5td36QsOqjgTQFg&s'}/>
            </div>
        </div>
    )
}

function NewsTopStories(){

    const [click , setClick] = useState()

    const handlePopup = () =>{
        if(!click){
            setClick(true)
            console.log(click)
        }
        else{
            setClick(false)
            console.log(click)
        }
    }


    return(
        <div className="NewsTopStories">
            <div className="flex justify-between">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" height='14px' width='14px' viewBox="0 0 12 16" id="Flame">
                        <g id="Octicons" fill="none" fill-rule="evenodd" stroke="none" stroke-width="1">
                            <g id="flame" fill="#b50113" class="color000000 svgShape">
                            <path id="Shape" d="M5.05.31c.81 2.17.41 3.38-.52 4.31C3.55 5.67 1.98 6.45.9 7.98c-1.45 2.05-1.7 6.53 3.53 7.7-2.2-1.16-2.67-4.52-.3-6.61-.61 2.03.53 3.33 1.94 2.86 1.39-.47 2.3.53 2.27 1.67-.02.78-.31 1.44-1.13 1.81 3.42-.59 4.78-3.42 4.78-5.56 0-2.84-2.53-3.22-1.25-5.61-1.52.13-2.03 1.13-1.89 2.75.09 1.08-1.02 1.8-1.86 1.33-.67-.41-.66-1.19-.06-1.78C8.18 5.31 8.68 2.45 5.05.32L5.03.3l.02.01z" fill="#b50113" class="color000000 svgShape"></path>
                        </g></g>
                    </svg>
                    <div className="text-sm">
                        Top stories
                    </div>
                </div>
                <div onClick={handlePopup} className="pr-1 hover:cursor-pointer relative">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        height="14px" viewBox="0 -960 960 960" 
                        width="14px" fill="black">
                        <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/>
                    </svg>
                    {click && <Popup/>}
                </div>
            </div>

            <div className="flex-row justify-items-center pt-2">
                <NewsTopStoriesCard authorname={'Arin'}/>
                <NewsTopStoriesCard authorname={'Arin'}/>
                <NewsTopStoriesCard authorname={'Arin'}/>
            </div>
            <NavLink className='flex justify-end pr-1 hover:text-blue-800 hover:underline text-sm text-blue-600 font-semibold' to='/dashboard/stories'>
                    Click to more
            </NavLink>
        </div>
    )
}

function NewsTopStoriesCard({authorname , time , previewtext}){
    return(
        <div className="NewsTopStoriesCard">
            <div className="flex justify-between">
                <div className="text-xs flex gap-1 pl-1">
                    {authorname}
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" height="14px"
                            viewBox="0 -960 960 960" width="14px" fill="#e8eaed">
                            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
                        </svg>
                    </button>
                    {time}
                </div>
                <div className="pr-1">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        height="14px" viewBox="0 -960 960 960" 
                        width="14px" fill="#e8eaed">
                        <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/>
                    </svg>
                </div>
            </div>
            <div className="">
                {previewtext}
            </div>
        </div>
    )
}

function NewsCard({img , name , title , text}){
    return(
        <div className="NewsCard">
            <img height='100px' width='100px' src={img} alt=""/>
        </div>
    )
}

function Popup(){
    return(
        <div className="Popup">
            

            
        </div>
    )
}