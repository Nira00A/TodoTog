import { React , useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import { useFeature } from "../context/FeatureContext";
import { ShowPopup , notify} from "../dashboardComponent";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function ProjectTodo(){
    const {projectId} = useParams()
    const {totalProjects} = useFeature()
    const date = new Date()
    const [weekday , setWeekday] = useState([])
    const [click , checkedClick] = useState('Task')
    const [todoSubmit , setTodoSubmit] = useState(false)
    const [noteSubmit , setNoteSubmit] = useState(false)
    const [priority , setPriority] = useState('')
    const {projectTodo , setProjectTodo , sumbitprojecttodo , getprojecttodo , totalProjectTodos , message , setMessage , deleteprojecttodo , totalNotes , setTotalNotes , getnotes , notes , noteschecked} = useFeature()
    const [inputText , setInputText] = useState('')
    const [render , setRender] = useState('')
    const [contextMenu , setContextMenu] = useState({isShow: false , x: '' , y: ''})

    const project = totalProjects.find((p)=>p.id === parseInt(projectId))

    //Gpt created
    function weekdays() {
        const days = [];
        const now = new Date();
        const convert = 24 * 60 * 60 * 1000;
        const day = now.getDay();
        const week = ['Su','Mo','Tu','We','Th','Fr','Sa']

        for (let i = day; i >= 0; i--) {
            const date = new Date(now.getTime() - convert * i);
            days.push({date: date.getDate(), day: week[date.getDay()]})
        }
    
        for (let i = 1; i < 7 - day; i++) {
            const date = new Date(now.getTime() + convert * i);
            days.push({date: date.getDate(), day: week[date.getDay()]})
        }
        return days;
    }

    useEffect(()=>{
        setWeekday(weekdays())
    },[])

    useEffect(()=>{
        getprojecttodo(projectId)
    },[render])

    useEffect(()=>{
        setProjectTodo((prev) => ({...prev , 'projid': projectId , 'status': priority.name}))
    },[projectId, priority.name])

    useEffect(()=>{
        getnotes(projectId)
    },[render])
      
    const onChecked = async (id , todo) => {
        const status = 'completed'
        saveFilterTimeline(todo , status)
        
        setRender(deleteprojecttodo(projectId , id))
    } 

    const handleNoteSubmit = async (e) =>{
        e.preventDefault()

        if(inputText.trim().length === 0){
            notify({message: "Note is empty can't be submitted", cond:'error'})
            setInputText('')
            return
        }

        try {
            notify({message: "Note submitted", cond:'success'})

            await notes(projectId , inputText)
            
            setInputText('')
            setNoteSubmit(false)
            getnotes(projectId)
        } catch (error) {
            console.log('Error while creating')
            notify({message: "Note can't be submitted", cond:'error'})
        }
    }

    const handleNoteChecked = async (id) =>{
        setRender(noteschecked(id , projectId))
    }

    function ScheduleTodos(){
        const today = new Date().toISOString().split('T')[0]
        const scheduleTodos1 = totalProjectTodos.filter((item) => item.endtime.split(' ')[1] === today , 'ysyyy')
        
        return scheduleTodos1
    }

    const handleChange = useCallback((feild , value)=>{
        if(value.trim() === '' || value === undefined) return
        setProjectTodo((prev)=>({...prev , [feild]: value}))
    },[setProjectTodo])

    const handleTimeChange = useCallback((obj , valObj)=>{
        setProjectTodo((prev)=> ({...prev , [obj]: {...prev[obj] , ...valObj}}))
    },[setProjectTodo])

    const handleSubmit = async () =>{
        const [startHour, startMinute] = projectTodo.start.time.split(':').map(Number);
        const [endHour, endMinute] = projectTodo.end.time.split(':').map(Number);
        const nowHour = date.getHours();
        const nowMinute = date.getMinutes();

        if(projectTodo.start.date === date.toISOString().split('T')[0]){
            if (
            startHour < nowHour ||
            (startHour === nowHour && startMinute <= nowMinute)
            ) {
                notify({message: "Please enter a valid time...", cond:'error'})
                return
            }
        }

        if(startHour > endHour || (startHour === endHour && startMinute >= endMinute)){
            notify({message: "Please enter a valid time...", cond:'error'})

            return
        }

        notify({message: "Todo submitted successfully", cond:'success'})
        
        try {
            await sumbitprojecttodo();
    
            setProjectTodo({
                projid: projectId , title: '', desc: '',
                start: { time: '00:00', date:'' },
                end: { time: '00:00', date: '' },
                status: ''
            });
    
            setTodoSubmit(false)
            getprojecttodo(projectId);
        } catch (err) {
            notify({message: "Todo can't be created", cond:'error'})
        }
        
    }

    const handleContextMenu = (e) =>{
        e.preventDefault();

        const {pageX , pageY} = e
        setContextMenu({isShow: true , x: pageX , y: pageY})
    }

    return(
        <div className="w-full h-full flex justify-center relative">
            <ToastContainer />
            {contextMenu.isShow && <ContextMenu x={contextMenu.x} y={contextMenu.y}/>}
            <div className="w-[1150px] flex flex-col p-3 gap-2 max-navlg:w-full overflow-scroll relative scrollbar-none">
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <div className="text4 text-[24px]">
                            {project.title}
                        </div>
                        <div className="flex gap-2 text-neutral-500 text-[12px]">
                            <div>
                                <span className="text-neutral-400">Timeline:</span> {project.created_at.split('T')[0]} - {project.duedate.split('T')[0]}
                            </div>
                            <div className='flex gap-1'>
                                <span className="text-neutral-400">Status:</span> 
                                <Priority name={project.status}/>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="hover:bg-[var(--div-color)] hover:-translate-y-[2px] flex items-center text4 text-[10px] rounded-md p-[8px] bg-[var(--border-color)] transition-all">
                            + Add Task
                        </button>
                    </div>
                </div>

                <div className="flex justify-start mt-3">
                    <div className="w-[500px] h-[40px] select-none p-3 flex items-center justify-between rounded-full bg-[var(--div-color)]">
                        <div className="flex items-center gap-1 text4">
                            <svg className="w-[14px] h-[14px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path fill='currentColor' d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>
                            <span className="font-bold">
                                12hrs
                                <span className="text-neutral-500 text-[12px] pl-[2px]">Time Saved</span>
                            </span>
                            <span className="pl-3 text-neutral-500">|</span>
                        </div>
                        <div className="flex items-center gap-1 text4">
                        <svg className="w-[14px] h-[14px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path fill="currentColor" d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
                            <span className="font-bold">
                                24
                                <span className="text-neutral-500 text-[12px] pl-[2px]">Todo Completed</span>
                            </span>
                            <span className="pl-3 text-neutral-500">|</span>
                        </div>
                        <div className="flex items-center gap-1 text4">
                        <svg className="w-[14px] h-[14px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path fill="currentColor" d="M280-420q25 0 42.5-17.5T340-480q0-25-17.5-42.5T280-540q-25 0-42.5 17.5T220-480q0 25 17.5 42.5T280-420Zm200 0q25 0 42.5-17.5T540-480q0-25-17.5-42.5T480-540q-25 0-42.5 17.5T420-480q0 25 17.5 42.5T480-420Zm200 0q25 0 42.5-17.5T740-480q0-25-17.5-42.5T680-540q-25 0-42.5 17.5T620-480q0 25 17.5 42.5T680-420ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                            <span className="font-bold">
                                7
                                <span className="text-neutral-500 text-[12px] pl-[2px]">Current Todo</span>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="h-[30px] w-full mt-3 flex items-center justify-between rounded-md bg-red-200">
                    <span className="text-[12px] font-semibold text-red-700 pl-3">
                        ~What's new
                    </span>
                    <div className="pr-2">
                        <svg className="h-3 w-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path fill="#b91c1c" d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z"/></svg>
                    </div>
                </div>

                <div className="w-full h-[270px] mb-1 rounded-lg bg-[var(--div-color)] relative">
                    <div className="w-full h-[40px] border-b-[1px] border-[var(--border-color)] items-center flex justify-between relative">
                        <div className="flex h-full justify-start gap-1">
                            {[{ name: "Task" }, { name: "Timeline" }, { name: "File" }].map((item, index) => (
                                <div onClick={() => checkedClick(item.name)} className={` select-none cursor-pointer text-[14px] p-2 font-bold ${click === item.name ? 'text-red-700':'text4 hover:text-neutral-300'}`} key={index}>
                                    {item.name}
                                </div>
                            ))}
                        </div>
                        {click === 'Task' && (
                            <div>
                                <button onClick={()=>setTodoSubmit((prev) => !prev)} className='text4 text-[12px] p-[6px] rounded-md pl-2 pr-2 mr-3 h-max bg-[var(--overlay-color)] hover:opacity-50 relative'>
                                    + Add
                                </button>

                                {todoSubmit && (
                                    <ProjectTodoSubmitDiv projectTodo={projectTodo} handleTodoSubmit={handleSubmit} handleChange={handleChange} handleTimeChange={handleTimeChange} priority={priority} setPriority={setPriority}/>
                                )}
                            </div>
                        )}
                    </div>

                    {click === 'Task' && (
                        <div className='h-[230px] pb-2 overflow-y-scroll'>
                            <div className="w-full h-[40px] bg-[var(--popup-color)]">
                                <div className="flex items-center pl-8 pr-4 h-full justify-between text-neutral-500 text-[12px]">
                                    <div>
                                        Name
                                    </div>

                                    <div className="flex gap-12">
                                        <div>Start Date</div>
                                        <div>Due Date</div>
                                        <div>Priority</div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                {totalProjectTodos.toReversed().map((item,index)=>(
                                    <div onContextMenu={handleContextMenu}>
                                        <TodoCard  key={index} id={item.id} title={item.title} start={item.created_at.split('T')[0]} end={item.endtime.split(' ')[1]} priority={item.status} onClick={onChecked}/>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {click === 'Timeline' && (
                        <div className='h-[230px] p-2 relative overflow-y-scroll animate-popdown'>
                            <div className='h-[40px] mb-2 rounded-sm flex items-center w-full bg-red-200 relative'>
                                <div className='ml-3 relative'>
                                    <svg className='relative z-30' xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="red"><path d="M480-200 200-480l280-280 280 280-280 280Z"/></svg>
                                </div>
                                <div className="h-full left-[22px] absolute">
                                    <div className='h-full border-[2px] border-red-500'> 
                                    </div>
                                </div>

                                <div className='text-red-500 font-semibold text-[12px]'>
                                    Timeline
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 transition-all relative'>
                                {getFilterTimeline().toReversed().map((items , index)=>(
                                    <div key={index} className='w-full h-[60px] flex rounded-md bg-red-100 animate-popdown relative'>
                                        <div className='ml-3 mt-2 w-max h-max relative'>
                                            <svg className='relative z-30' xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="24px" fill="red"><path d="M480-200 200-480l280-280 280 280-280 280Z"/></svg>
                                        </div>
                                        <div className="h-full left-[22px] -top-[0px] absolute">
                                            <div className='h-full border-[2px] border-red-500'> 
                                            </div>
                                        </div>

                                        <div className='flex w-full justify-between'>
                                            <div>
                                                <div className='mt-3 text-neutral-500 text-[10px]'>
                                                    {items[0].start} - {items[0].end}
                                                </div>
                                                <div className={`text-[14px] ${items.status === 'completed' ? '':'line-through text-neutral-500'}`}>
                                                    {items[0].title}
                                                </div>
                                            </div>

                                            <div className='flex items-center mr-3'>
                                                {items.status === 'completed' ? <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" ><path fill='green' d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path fill='red' d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {click === 'File' && (
                        <div>

                        </div>
                    )}
                </div>

                <div className='grid grid-cols-2 w-full gap-3'>
                    <div className='w-full h-[310px] select-none rounded-lg p-3 bg-[var(--div-color)]'>
                        <div className='flex justify-between text4'>
                            <div className='flex items-center gap-2'>
                                <svg className='h-4 w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path fill='currentColor' d="M580-240q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg>
                                <div>Schedule</div>
                            </div>

                            <div>
                                <svg className='h-5 w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path fill='currentColor' d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/></svg>
                            </div>
                        </div>
                        <div className='w-full flex justify-between text4 p-1 pl-3 pr-3 mt-3'>
                            {weekday.map((items , index)=>(
                                <div className={`${date.getDate() === items.date ? 'bg-red-600 text-white':'hover:bg-[var(--popup-color)]'} p-1 pl-3 pr-3 rounded-md cursor-pointer flex flex-col items-center justify-center`} key={index}>
                                    <div className={`text-[10px]`}>{items.day}</div>
                                    <div className='text-[14px] font-bold'>{items.date}</div>
                                </div>
                            ))}
                        </div>
                        <hr className='m-0 mt-2'/>

                        <div className='w-full h-[190px] flex flex-col mt-1 gap-1 overflow-y-scroll scrollbar-none'>
                            {ScheduleTodos().map((item , index)=>(
                                <div key={index}>
                                    <ScheduleCard title={item.title} start={item.starttime.split(' ')[0]} end={item.endtime.split(' ')[0]}/>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='w-full h-[310px] rounded-lg p-3 bg-[var(--div-color)]'>
                        <div className='flex justify-between text4'>
                            <div className='flex items-center gap-2'>
                                <svg className='h-4 w-4' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path fill='currentColor' d="M580-240q-42 0-71-29t-29-71q0-42 29-71t71-29q42 0 71 29t29 71q0 42-29 71t-71 29ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg>
                                <div>Notes</div>
                            </div>

                            <div>
                                <button onClick={()=>setNoteSubmit((prev) => !prev)} className='text4 text-[12px] p-[6px] rounded-md pl-2 pr-2 h-max bg-[var(--overlay-color)] hover:opacity-50 relative'>
                                    + Add
                                </button>
                            </div>
                        </div>
                        <hr/>

                        {totalNotes.length === 0 && noteSubmit === false?
                        <div className='w-full h-[80%] text-neutral-500 flex flex-col justify-center items-center'>
                            <svg className='h-5 w-5' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" ><path fill='currentColor' d="M200-200h560v-367L567-760H200v560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h400l240 240v400q0 33-23.5 56.5T760-120H200Zm80-160h400v-80H280v80Zm0-160h400v-80H280v80Zm0-160h280v-80H280v80Zm-80 400v-560 560Z"/></svg>
                            <div className='text-[12px]'>
                                Write your notes here... 📓✨
                            </div>
                        </div>
                        :
                        <div className='h-[240px] overflow-y-scroll'>
                            {noteSubmit ? 
                            <form onSubmit={handleNoteSubmit} className='mb-3 relative'>
                                <textarea value={inputText} onChange={(e)=>setInputText(e.target.value)} maxLength={100} placeholder='Enter your main notes here...' className="text-[14px] p-3 w-full max-h-[80px] min-h-[100px] focus:outline-none border-[1px] text4 bg-transparent rounded-xl relative"/>
                                <div className='text-neutral-500 flex justify-between text-[12px] left-[12px] absolute'>                             
                                    {inputText.length}/100
                                </div>

                                <div className='flex justify-end'>
                                    <button type='submit' className='flex w-[50px] h-[25px] items-center justify-center text-[10px] cursor-pointer rounded-md shadow-md transition-all text-white bg-green-500 hover:bg-green-600'>
                                        Submit
                                    </button>
                                </div>
                            </form>
                            :
                            <></>
                            }

                            <div className='flex flex-col gap-2'>
                                {totalNotes.map((item , index)=>(
                                    <NotesCard key={index} id={item.id} notes={item.notes} status={item.status} onClick={handleNoteChecked}/>
                                ))}
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

function getFilterTimeline(){
    const timeline = JSON.parse(localStorage.getItem('timeline')) || []
    const now = new Date()
    const sevenDaysFromNow = new Date()
    sevenDaysFromNow.setDate(now.getDate()- 7)

    const filterTimeline = timeline.filter((item)=>{
        return new Date(item.timestamp) > sevenDaysFromNow
    })

    localStorage.setItem('timeline', JSON.stringify(filterTimeline))

    return filterTimeline
}

function saveFilterTimeline(todo , status){
    const timeline = JSON.parse(localStorage.getItem('timeline')) || []
    timeline.push({
        ...todo,
        status,
        timestamp: new Date().toISOString()
    })

    localStorage.setItem('timeline' , JSON.stringify(timeline))
}

function TodoCard({id , title , start , end , priority , onClick}){
    const todo = [{title , start , end}]
    return(
        <div className="w-full h-[45px] pl-2 pr-[10px] text4 flex items-center border-b-[1px] border-[var(--border-color)] justify-between cursor-pointer select-none hover:bg-[var(--border-color)] animate-popdown">
            <div className="flex items-center gap-[10px] font-bold text-[14px]">
                <label className="relative">
                    <input type="checkbox" className="hidden peer"/>
                    <div onClick={() => onClick(id , todo)} className="w-[14px] h-[14px] border-[1px] cursor-pointer rounded-full border-neutral-500 transition-all"></div>
                </label>

                {title}
            </div>

            <div className="grid grid-cols-[1fr_1fr_50px] gap-9 text-[12px]">
                <div className="text-neutral-400">
                    {start}
                </div>

                <div className="">
                    {end}
                </div>

                <div>
                    <Priority name={priority}/>
                </div>
            </div>
        </div>
    )
}

function ScheduleCard({title , start , end}){
    return(
        <div className='flex h-[60px] w-full border-b border-[var(--border-color)] hover:bg-[var(--overlay-color)] cursor-pointer select-none'>
            <div className='h-full w-[2px] bg-red-500'></div>

            <div>
                <div className='h-full ml-5 flex flex-col justify-center'>
                    <div className='text4 text-[14px]'>{title}</div>
                    <div className='text-[10px] text-neutral-500'>{start} - {end}</div>
                </div>
            </div>
        </div>
    )
}

function NotesCard({id , notes , status , onClick}){
    return(
        <div key={id} className='flex justify-between h-[80px] p-2 gap-3 rounded-lg text-[14px] text-neutral-600 items-center border border-[var(---border-color)]'>
            <div className='flex items-center gap-3'>
                <div onClick={()=> onClick(id)}>
                    {status === 'true' ?
                        <div>
                            <input type="checkbox" className="hidden peer"/>
                            <div className="w-[14px] h-[14px] border-[1px] cursor-pointer rounded-full border-neutral-500 transition-all"></div>
                        </div>
                        :
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="green"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"/></svg>
                        </div>
                    }
                </div>
                
                <div className={`text-neutral-500 ${status === 'true' ? '' : 'line-through'}`}>
                    {notes}
                </div>
            </div>

            <div className='h-[20px] w-[20px]'>
                <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
            </div>
        </div>
    )
}

function ProjectTodoSubmitDiv({handleChange , handleTimeChange , handleTodoSubmit , projectTodo , priority , setPriority}){
    const [TodoPriorioty , setTodoPriorioty] = useState(false)

    return(
        <div className='w-[600px] z-50 p-3 bg-[var(--overlay-color)] shadow-lg border-neutral-500 flex flex-col gap-3 rounded-lg right-[1%] top-[50px] absolute'>
            <div className='text4 text-[12px]'>Create todos</div>

            <div className='flex w-full gap-4 relative'>
                <div onClick={()=>setTodoPriorioty((prev)=>!prev)} className={`w-6 h-6 flex items-center justify-center mt-1 rounded-md cursor-pointer ${priority ? `${priority.bgClass} ${priority.textClass}`: 'bg-white' } select-none relative`}>
                    {priority.s}
                </div>

                {TodoPriorioty && (
                    <div className='absolute top-8 z-[1000]'>
                        <TodoPrioriotyCard setPriority={setPriority}/>
                    </div>)}

                <div className='flex flex-col text4 gap-3 w-full'>
                    <input onChange={(e)=>handleChange('title',e.target.value)} placeholder='Title' className='h-[30px] text-[18px] bg-transparent outline-none'/>
                    <textarea onChange={(e)=>handleChange('desc',e.target.value)} placeholder='Add description' className='min-h-[60px] text-[13px] flex justify-start bg-transparent outline-none'/>
                </div>
            </div>

            <div className='flex gap-3 relative'>
                <div className='flex gap-3 text-[12px] relative'>
                    <div className='relative'>
                        <div className='absolute left-[60px] top-[8px] z-50 pointer-events-none'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px"><path fill='gray' d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>
                        </div>
                        <input onChange={(e)=>handleTimeChange('start', {'time': e.target.value})} type="time" className="focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500 text4 border-2 border-color bg-[var(--overlay-color)] outline-none focus:border-[var(--border-color)] leading-none relative p-[6px] rounded-lg"/>
                    </div>

                    <div className='relative'>
                        <div className='absolute left-[60px] top-[8px] z-50 pointer-events-none'>
                            <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px"><path fill='gray' d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>
                        </div>
                        <input onChange={(e)=>handleTimeChange('end', {'time': e.target.value})} type="time" className="focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500 text4 border-2 border-color bg-[var(--overlay-color)] outline-none focus:border-[var(--border-color)] leading-none relative p-[6px] rounded-lg"/>
                    </div>
                </div>

                <div className='flex gap-3'>
                    <label><input onChange={(e)=>handleTimeChange('start', {'date': e.target.value})} type='date' value={projectTodo.start.date || ''} className='custom-date text-[13px] p-1 text4 border-2 rounded-lg focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500 border-color bg-[var(--overlay-color)] outline-none focus:border-[var(--border-color)]'/></label>
                    <label><input onChange={(e)=>handleTimeChange('end', {'date': e.target.value})} type='date' value={projectTodo.end.date || ''} className='custom-date text-[13px] p-1 text4 border-2 rounded-lg focus:ring-red-500 focus:border-red-500 dark:focus:ring-red-500 dark:focus:border-red-500 border-color bg-[var(--overlay-color)] outline-none focus:border-[var(--border-color)]'/></label>
                </div>



                <div className='w-full flex justify-end'>
                    <div onClick={()=>handleTodoSubmit()} className='flex items-center cursor-pointer text-[12px] pl-3 pr-3 rounded-md shadow-md transition-all text-white bg-green-500 hover:bg-green-600'>
                        Submit
                    </div>
                </div>
            </div>
        </div>
    )
}

function TodoPrioriotyCard({setPriority}){
    const priority = [{name:'High' , small:'H', textClass: 'text-red-700' ,bgClass: 'bg-red-200'}, {name:'Medium' , small:'M', textClass: 'text-blue-700', bgClass: 'bg-blue-200'}, {name:'Low' , small:'L', textClass: 'text-yellow-700' , bgClass: 'bg-yellow-200'}]
    return(
        <div className={`w-[150px] select-none pl-1 pt-1 pb-1 border border-[var(--border-color)] absolute flex flex-col overflow-y-scroll bg-[var(--popup-color)] rounded-md`}>
            {priority.map((item , index)=>(
                <div key={index} onClick={() => setPriority({name: item.name , s: item.small , bgClass: item.bgClass , textClass: item.textClass})} className='text4 text-[12px] p-2 text-[] rounded-sm cursor-pointer hover:bg-[var(--overlay-color)]'>
                    {item.name}
                </div>
            ))}
        </div>
    )
}

function Priority({ name }) {
    let textClass = '';
    let bgClass = '';

    if (name === 'High') {
        bgClass = 'bg-red-200';
        textClass = 'text-red-700';
    } else if (name === 'Medium') {
        bgClass = 'bg-blue-200';
        textClass = 'text-blue-700';
    } else {
        bgClass = 'bg-yellow-200';
        textClass = 'text-yellow-700';
    }

    return (
        <div className={`p-[2px] text-[10px] pl-2 pr-2 flex items-center justify-center rounded-md transition-all max-navsm:text-[10px] ${bgClass} ${textClass}`}>
            {name}
        </div>
    );
}

function ContextMenu({x , y}){
    return(
        <div className={`absolute z-50 top-[${y}px] left-[${x}px]`}>
            hahahha
        </div>
    )
}