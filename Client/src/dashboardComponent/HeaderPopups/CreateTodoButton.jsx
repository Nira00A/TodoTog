import React, { useState } from "react";

export default function CreateTodoButton({onClick}){

    const [tagName , setTagName] = useState()

    const handleTagClick = (tagName) =>{
        setTagName(tagName)
        console.log(tagName)
    }

    const handleCancelTagClick = () =>{
        setTagName()
    }


    return(

        <div className="fixed flex inset-0 bg-black bg-opacity-50 justify-center items-center" onClick={onClick}>
            <div 
            style={{
                height:'500px',
                width:'700px'
            }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl">
                <div className="createDiv flex justify-center font-bold pt-4 pb-4">
                    Create
                </div>

                <div className="pl-40">
                    <div className="text-neutral-500">
                        Create Todo:
                    </div>

                    {tagName && <div className="flex pb-1"><Tags name={tagName} color='bg-gray-200' onTagClick={handleCancelTagClick}/></div>}

                    <form>
                        <input type="text"
                        className="createButtonDiv bg-white rounded-xl border border-gray-300"/>

                        <div className="pt-2">
                            <div className="flex gap-2">
                                <Tags name='Work' color='bg-gray-300' onTagClick={handleTagClick}/>
                                <Tags name='Personal' color='bg-gray-300' onTagClick={handleTagClick}/>
                                <Tags name='Fitness' color='bg-gray-300' onTagClick={handleTagClick}/>
                                <Tags name='Study' color='bg-gray-300' onTagClick={handleTagClick}/>
                                <Tags name='Travel' color='bg-gray-300' onTagClick={handleTagClick}/>
                                
                            </div>
                        </div>

                        <textarea type="text"
                        className="createDescButtonDiv p-2 bg-white rounded-xl border border-gray-300"
                        />

                        <button className="bg-blue-400 h-8 w-auto rounded-lg pl-3 pr-3 mt-2 text-white">
                            Submit
                        </button>
                    </form>
                </div>

            </div>
        </div>
    )
}

function Tags({name , color , onTagClick}){ 

    return(
        <div>
            <div
            onClick={() => onTagClick(name)}
            className={`h-6 w-auto pl-2 pr-2 text-xs flex justify-center items-center rounded-xl cursor-pointer ${color} hover:brightness-75 active:-translate-y-1`}>
                {name}
            </div>
        </div>
    )
}
