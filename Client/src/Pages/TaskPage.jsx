import React, { useEffect, useState } from "react";
import { useTodo } from "../context/TodoContext.js";
import { Tags } from "../dashboardComponent/index.js";

export function TaskPage(){

    const {getTodo , submitTodo , todos , form , setForm } = useTodo()

    /*Wordlimit usestate*/
    const [wordLimit , setWordLimit] = useState('')

    /*Extentable usestate*/
    const [isExtentable , setIsExtentable] = useState(false)

    /*This usestates are related to form submmition*/
    const [tag , setTag] = useState('')
    
    /*Tags List*/
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
    const visibleTags = isExtentable ? tags : tags.slice(0,5)
      
    useEffect(() =>{
       getTodo()
    }, [])

    /*Handle change which will update the Form state*/
    const handleChnage = (e) =>{
        const {name , value} = e.target
        setForm({...form , [name] : value})
        setWordLimit(value.trim().length === 0 ? 0 : value.trim().length);
    }
      
    /*Handle Tag click*/
    const handleTagClick = (tagname) =>{
        setTag(tagname)
        setForm({...form , todotype: `${tagname[0]}` , todocolor: `${tagname[1]}`})
    }

    /*Handle more button for extra tag options*/
    const handleMoreButtonClick = () =>{
        setIsExtentable((prev) => !prev)
        console.log(todos)
    }
    const handleCancelTagClick = () =>{
        setTag([])
    } 

    return(
        <div className="task-container">
            <div className="task-child">
                <div className="task-title-header">
                    <div className="task-title">
                        #Task
                    </div>
                    <div className="input-main">
                        <form onSubmit={submitTodo} className="parent flex flex-col relative">
                            <div className="relative">
                                <div className="task-input-tag">
                                    <Tags name={tag[0]} color={tag[1]} onTagClick={handleCancelTagClick}/>
                                </div>
                                <input onChange={handleChnage} name="todo" placeholder="Enter your task here..." autoComplete="off" color="gray" className="task-input column"/>
                                
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
                            {visibleTags.map((tag , key) =>
                                <Tags key={key} name={tag.name} color={tag.color} onTagClick={handleTagClick}/>
                            )}
                            {tags.length > 5 && (
                                <div className="more-button" onClick={handleMoreButtonClick}>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" 
                                    viewBox="0 -960 960 960" width="34px" fill="gray"><path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/></svg>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="task-body">
                    {todos.length > 0 ?(
                            <div>
                                {todos.map((todo , key)=>(
                                <Tasks id={todo.id} todo= {todo.todo} color={todo.todocolor} type={todo.todotype} tododesc={todo.tododesc} tododate={todo.tododate}/> 
                                ))}
                            </div>
                        ): 
                        (
                            <div className="text-neutral-400 mt-40 mb-40 text-center flex-col items-center pointer-events-none select-none">
                                <div className="flex justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="50px" viewBox="0 -960 960 960" 
                                    width="50px" fill="lightgray"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h280v-480H160v480Zm360 0h280v-480H520v480Zm-320-80h200v-80H200v80Zm0-120h200v-80H200v80Zm0-120h200v-80H200v80Zm360 240h200v-80H560v80Zm0-120h200v-80H560v80Zm0-120h200v-80H560v80ZM440-240v-480 480Z"/>
                                    </svg>
                                </div>
                                <div>
                                    No todos? Maybe it's a sign to create something awesome.<br/>
                                    Lets start some new todos...
                                </div>
                            </div> 
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export function Tasks({id , todo , color , type , tododesc , tododate}){

    const {updateTodo , deleteTodo , editingId , setEditingId} = useTodo()

    /*Update usestate*/
    const [updatedTodo , setUpdatedTodo] = useState(todo)

    /*Handle Update Button*/
    const handleEdit = (taskId) => {
        setEditingId(taskId === editingId ? null : taskId); 
        setUpdatedTodo(todo); 
      };


    return(
        <div style={{backgroundColor: `${color}`}} className="task-div">
            <div className="task-div-child">
                <div>
                    <div className="flex justify-between">
                        <div>
                            <Tags name={type} color={color}/>
                        </div>
                    </div>
                    <div className="task-content">
                        {editingId !== id ?(
                        <div className="task-content-todo"> 
                            {todo}
                        </div>) :(
                        <div>
                            <textarea value={updatedTodo} onChange={(e) => setUpdatedTodo(e.target.value)} className="update-input" role="textbox" name="update"/>
                            
                        </div>                                                                                                                                              
                        )}
                    </div>
                </div>
                <div className="task-options">
                    {editingId === id && (
                        <input className="update-input-button" value="save" type="button" onClick={() => updateTodo(updatedTodo , id)}/>
                    ) }
                    <div onClick={()=>handleEdit(id)} className="task-svg-2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="24px" fill="gray"><path d="M160-400v-80h280v80H160Zm0-160v-80h440v80H160Zm0-160v-80h440v80H160Zm360 560v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/></svg>
                    </div>
                    <div className="task-svg-2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="gray"><path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg>
                    </div>
                    <div onClick={() => deleteTodo(id)} className="task-svg-2">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="red"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

