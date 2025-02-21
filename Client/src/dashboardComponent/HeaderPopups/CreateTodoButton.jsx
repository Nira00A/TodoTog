import React, { useState } from "react";
import axios from "axios"

export function CreateTodoButton({onClick}){

    const [tagName , setTagName] = useState()
    const [formData , setFormData] = useState({todo:"",todotype:"",tododate:`${new Date().toISOString().split('T')[0]}`,tododesc:""})

    const handleChange = (e) =>{
        setFormData({...formData ,[e.target.name]: e.target.value })
    }

    const handleTodoSubmit = async () =>{
        try {
            await axios.post("http://localhost:4000/todosubmit", formData)
        } catch (error) {
            console.log("Trouble while Submitting the Data ,", error)
        }
    }

    const handleTagClick = (tagName) =>{
        setTagName(tagName)
        setFormData({
            ...formData,
            todotype: tagName,
        });
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

                    {tagName && <div className="flex pb-1"><Tags name={tagName} onTagClick={handleCancelTagClick}/></div>}

                    <form onSubmit={handleTodoSubmit}>
                        <input name="todo" type="text" onChange={handleChange}
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

                        <textarea name="tododesc" type="text" onChange={handleChange}
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

export function Tags({name , color , fontColor ,  onTagClick}){ 
    return(
        <div>
            <div onClick={() => onTagClick([name , color])} style={{backgroundColor: color , color:"white"}} className={`tag-style`}>
                {name}
            </div>
        </div>
    )
}
