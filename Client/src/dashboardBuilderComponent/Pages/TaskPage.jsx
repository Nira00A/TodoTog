import React, { useState } from "react";
import { useTodo } from "../../context/TodoContext";
import { Tags } from "../../dashboardComponent/index.js";
import axios from "axios";

export function TaskPage(){

    const {addTodo , updateTodo , deleteTodo} = useTodo()
    const [wordLimit , setWordLimit] = useState('')
    const [isExtentable , setIsExtentable] = useState(false)
    const [tag , setTag] = useState('')
    const [form , setForm] = useState({todo:"" , todotype: tag , tododate:`${new Date().toISOString().split('T')[0]}` , tododesc:"" , todocolor:""})
    const tags = [
        { name: "Work", color: "#6b7280" },        // Gray
        { name: "Personal", color: "#2563eb" },    // Blue
        { name: "Fitness", color: "#10b981" },     // Green
        { name: "Study", color: "#8b5cf6" },       // Purple
        { name: "Travel", color: "#fb923c" },      // Orange
        { name: "Shopping", color: "#f472b6" },    // Pink
        { name: "Finance", color: "#14b8a6" },     // Teal
        { name: "Wellness", color: "#facc15" },    // Yellow
        { name: "Goals", color: "#ef4444" },       // Red
        { name: "Hobbies", color: "#6366f1" },     // Indigo
        { name: "Today", color: "#06b6d4" },       // Cyan
        { name: "Tomorrow", color: "#f59e0b" },    // Amber
        { name: "Urgent", color: "#f43f5e" },      // Rose
        { name: "Scheduled", color: "#64748b" },   // Slate
        { name: "Focus", color: "#334155" },       // Blue-Gray
        { name: "Quick", color: "#4b5563" },       // Cool Gray
        { name: "Creative", color: "#78716c" },    // Warm Gray
        { name: "Dream", color: "#0ea5e9" },       // Sky
        { name: "Level", color: "#059669" },       // Emerald
        { name: "Challenge", color: "#dc2626" },   // Red-500
        { name: "Treat", color: "#e11d48" },       // Rose
        { name: "Weekend", color: "#84cc16" }      // Lime
      ];
      

    const handleSubmitButton = async (e) =>{
        e.preventDefault()
        
        if(!form.todo) return

        try {
            await axios.post('http://localhost:4000/todosubmit' , 
                {todo: form.todo ,
                todotype: form.todotype ,
                tododate: form.tododate ,
                tododesc: form.tododesc,
                todocolor: form.todocolor
                })
            console.log("sfsssfs")
        } catch (error) {
            console.log('Error while Posting the Todos' , error)
        }
    }

    const handleChnage = (e) =>{
        const {name , value} = e.target
        setForm({...form , [name] : value})
        setWordLimit(value.trim().length === 0 ? 0 : value.trim().length);  
    }
      
    const handleTagClick = (tagname) =>{
        setTag(tagname)
        setForm({...form , todotype: `${tagname[0]}` , todocolor: `${tagname[1]}`})
    }

    const handleMoreButtonClick = () =>{
        setIsExtentable((prev) => !prev)
    }

    const handleCancelTagClick = () =>{
        setTag([])
    }

    const visibleTags = isExtentable ? tags : tags.slice(0,5)

    return(
        <div className="task-container">
            <div className="task-child">
                <div className="task-title-header">
                    <div className="task-title">
                        #Task
                    </div>
                    <div className="input-main">
                        <form onSubmit={handleSubmitButton} className="parent flex flex-col relative">
                            <div className="relative">
                                <div className="task-input-tag">
                                    <Tags name={tag[0]} color={tag[1]} onTagClick={handleCancelTagClick}/>
                                </div>
                                <input onChange={handleChnage} name="todo" placeholder="Enter your task here..." color="gray" className="task-input column"/>
                                
                                <div className="absolute task-svg-1 column">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" 
                                    viewBox="0 -960 960 960" width="24px" fill="gray">
                                    <path d="M120-120v-720h720v720H120Zm600-160H240v60h480v-60Zm-480-
                                    60h480v-60H240v60Zm0-140h480v-240H240v240Zm0 200v60-60Zm0-60v-60 
                                    60Zm0-140v-240 240Zm0 80v-80 80Zm0 120v-60 60Z"/></svg>
                                </div>
                                <button className="task-button-1">
                                    Submit
                                </button>
                            </div>           
                        </form>
                        <div className="task-length-limit">
                            <div>
                                {wordLimit === 0 && (
                                    <div>
                                        <span style={{color:'red'}}>*</span> Please fill out this feild
                                    </div>
                                )}
                            </div>
                            <div>
                                {wordLimit}/100
                            </div>
                        </div>
                        <div className="task-tags">
                                {visibleTags.map((tag) =>
                                    <Tags name={tag.name} color={tag.color} onTagClick={handleTagClick}/>
                                )}
                                {tags.length > 5 && (
                                    <div className="more-button" onClick={handleMoreButtonClick}>
                                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" 
                                        viewBox="0 -960 960 960" width="34px" fill="gray"><path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/></svg>
                                    </div>
                                )}
                        </div>
                    </div>
                    <div>
                        <Tasks todo={form.todo} color={form.todocolor} type={form.todotype} tododesc={form.tododesc} tododate={form.tododate}/> 
                    </div>
                </div>
            </div>
        </div>
    )
}

export function Tasks({todo , color , type , tododesc , tododate }){
    return(
        <div style={{backgroundColor: `${color}`}} className="task-div">
            <div className="task-div-child">
                <div>
                    <div className="flex justify-between">
                        <div>
                            <Tags name={type} color={color}/>
                        </div>
                        <div className="task-svg-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="24px" fill="gray"><path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/></svg>
                        </div>
                    </div>
                    <div className="task-content">
                        {todo}
                    </div>
                </div>
                <div className="task-options">
                    <div className="task-svg-2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="gray"><path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg>
                    </div>
                    <div className="task-svg-2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="red"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

