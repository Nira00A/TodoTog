import React, { useEffect, useState , useCallback} from "react"
import '@schedule-x/theme-default/dist/index.css'
import { Tags } from "../dashboardComponent/HeaderPopups/CreateTodoButton"
import { useTodo } from "../context/TodoContext"

export function CalenderPage(){
    const date = new Date()
    const [zino , setZino] = useState(0)
    const [today , setToday] = useState('')
    const [create , setCreate] = useState(false)
    const [time, setTime] = useState({
        startHour: "00",
        startMinute: "00",
        endHour: "00",
        endMinute: "00"
    }); 
    const [createError , setCreateError] = useState({})
    const [openCalendar , setOpenCalendar] = useState(false)
    
    const category = [
        {name: 'Work feild'},
        {name: 'Personal feild'},
        {name: 'Fitness feild'},
        {name: 'Study feild'},
        {name: 'Travel feild'}
    ]
    const {form , setForm , submitTodo , todos} = useTodo()

    const formatTime = (date) => 
        `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    

    const validate = () =>{ 
        let errors = {
            title: form.todo.trim() === '',
            desc: form.tododesc.trim() === '',
            start: form.starttime.trim() === '',
            end: form.endtime.trim() === '',
            color: form.todocolor.trim() === '',
            condition: form.starttime < formatTime(date)
        }
        setCreateError(errors)

        return Object.values(errors).includes(true); // Returns true if there's an error
    }

    const handleSubmitTodo = (e) =>{
        
        try {           
            if(validate()) return;
            
            submitTodo(e)

        } catch (error) {
            console.log(error , "while submitting todo")
        }
    }

    useEffect(()=>{
        const day = new Date().getDay()

        /*For Day Generation*/
        const foundDay = totalWeekDays.find((item)=> item.id === day)
        if (foundDay){
            setToday(foundDay.day.toUpperCase())
        }
    },[])

    useEffect(()=>{
        setForm((prev)=> ({...prev , starttime: `${time.startHour}:${time.startMinute}` , endtime: `${time.endHour}:${time.endMinute}`}))
    },[time , setForm])

    return(
        <div className="calendar-container gap-3 pt-3 relative">
            {create && <CreateTodo onClick={(prev) => setCreate(!prev)} setTime={setTime} time={time} form={form} setForm={setForm} handleSubmitForm={handleSubmitTodo} setCreate={setCreate} errors={createError}/>}
            <div className="flex-col">
                <Calendar1 />

                <div className="w-full h-auto div-color p-1 pb-3 rounded-md mt-3">
                    <div className="flex items-center gap-1 text4">
                        <div><svg style={{fill: "var(--div-color)"}} xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"><path fill="currentColor" d="M480-360 280-560h400L480-360Z"/></svg></div>
                        <div>My category </div>
                    </div>

                    <div className="flex-col ml-6 mt-3 text4 text-sm">
                        <div className="flex-col gap-2">
                            { category.map((item , index)=>
                            <div className="flex gap-2" key={index}>
                                <input type="checkbox"/>
                                <div>{item.name}</div>
                            </div>
                            )}
                            
                        </div>
                    </div>
                </div>

                <div className="w-full h-auto div-color p-1 pb-3 rounded-md mt-3">
                    <div className="flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e8eaed"><path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z"/></svg>
                        <div className="text4">Pinned Todos</div>
                    </div>

                    <div className="ml-6 text-sm">
                        This will contain the pinned task
                    </div>
                </div>

                <div className="w-full h-auto div-color p-1 pb-3 rounded-md mt-3">
                    <div className="flex gap-2 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e8eaed"><path d="m640-480 80 80v80H520v240l-40 40-40-40v-240H240v-80l80-80v-280h-40v-80h400v80h-40v280Zm-286 80h252l-46-46v-314H400v314l-46 46Zm126 0Z"/></svg>
                        <div className="text4">Create</div>
                    </div>

                    <div onClick={() => setCreate(true)} className="ml-6 text-blue-400 text-sm cursor-pointer w-max">
                        Create a todo +
                    </div>
                </div>
            </div>

            

            <div className="w-max flex-col relative overflow-scroll scrollbar-none">
                <div className="flex-col relative">
                    
                    <div className="calendar-header">
                        <div className="calendar-date">
                            <div className="text-2xl heading">
                                {today}
                            </div>
                            <div className="flex gap-1 text-xs text-neutral-500">
                                <div>{date.getDate()}</div>
                                /
                                <div>{date.getFullYear()}</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div onClick={() => setZino((prev) => prev - 7)} className="cursor-pointer" >
                                <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="#d6d5d5"><path d="M576-240 336-480l240-240 51 51-189 189 189 189-51 51Z"/></svg>
                            </div>
                            <div onClick={() => setZino(0)} className="calendar-today-div">
                                Today
                            </div>
                            <div onClick={() => setZino((prev) => prev + 7)} className="cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="#d6d5d5"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
                            </div>
                        </div>
                    </div>

                    
                    <div className="flex gap-5 mt-5 relative">
                        <div className="flex gap-3 relative">
                            <div onClick={()=>setOpenCalendar((prev) => !prev)} className="flex items-center cursor-pointer relative mr-8 ml-2">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#d6d5d5"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/></svg>
                            </div>
                            {
                                openCalendar && (
                                    <Calendar1 isAbsolute={true}/>
                                )
                            }

                            { Weekdays(zino).map((item)=> (
                            <div key={item.date.toISOString()}>
                                <div className="calendar-weekly-day">
                                    {item.date.toLocaleDateString('en-US', {weekday: "long"})}
                                </div>
                                <div className="calendar-weekly-div" style={{backgroundColor: item.currentDate ? 'black' : ""
                                    , color: item.currentDate ? 'white' : 'black'
                                }}>
                                    {item.date.getDate()}
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>

                
                {<div className="calendar-big-body mt-10">
                    {generateCalendarTime.map((item) =>
                        <div key={item.name} className="calendar-time">
                            <div>{item.name}</div>
                            <div>{item.zone}</div>
                        </div>
                    )}
                    {todos.map((todo)=> 
                        <Card 
                            key={todo.starttime} 
                            title={todo.todo} 
                            description={todo.tododesc} 
                            srt={todo.starttime} 
                            end={todo.endtime} 
                        />
                    )}
                </div>}
                
            </div>
        </div>
    )
}

function CreateTodo({setTime , time , setForm , form , handleSubmitForm , setCreate ,errors}){
    const date = new Date().toDateString().split(' ')
    const date1 = date[1] +' ' + date[2] + " " + date[3]

    const totalHour = [
        "00", "01", "02", "03", "04", "05",
        "06", "07", "08", "09", "10", "11",
        "12", "13", "14", "15", "16", "17",
        "18", "19", "20", "21", "22", "23"
      ];
    const totalMinutes = [
    "00", "01", "02", "03", "04", "05", "06", "07", "08", "09",
    "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
    "20", "21", "22", "23", "24", "25", "26", "27", "28", "29",
    "30", "31", "32", "33", "34", "35", "36", "37", "38", "39",
    "40", "41", "42", "43", "44", "45", "46", "47", "48", "49",
    "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"
    ];
      
    const colors = [
        "#000000", // Black
        "#6200EA", // Deep Purple
        "#9C27B0", // Purple
        "#1E40AF", // Deep Blue
        "#1976D2", // Blue
        "#00BCD4", // Cyan
        "#008000", // Green
        "#FFFFFF"  // White
      ];

    const [showTimePickerLeft , setShowTimePickerLeft] = useState(false)
    const [showTimePickerRight , setShowTimePickerRight] = useState(false)

    const handleTitleChange = useCallback((item) => {
        setForm((prev) => ({...prev , todo: item}))
    }, [setForm])

    const handleDescChange = useCallback((item) => {
        setForm((prev) => ({...prev , tododesc: item}))
    }, [setForm])

    const handleColorChange = useCallback((item) => {
        setForm((prev) => ({...prev , todocolor: item}))
    }, [setForm])

    const handleTagChange = useCallback((item)=>{
        setForm((prev)=> ({...prev , todotype: item}))
    }, [setForm])

    return(
        <div className="details-popup bg-opacity-70 bg-black relative">
            <div className={`${errors.title ? 'border-[2px] border-red-700' : ''} div-color rounded-md h-[450px] w-max overflow-hidden relative`}>
                <div className="flex justify-between pt-1 pl-2 pr-2 relative">
                    <div className="text4 flex-col relative">
                        <div className="flex items-center">
                            <div><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" ><path fill="currentColor" d="M240-160q-33 0-56.5-23.5T160-240q0-33 23.5-56.5T240-320q33 0 56.5 23.5T320-240q0 33-23.5 56.5T240-160Zm0-240q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm0-240q-33 0-56.5-23.5T160-720q0-33 23.5-56.5T240-800q33 0 56.5 23.5T320-720q0 33-23.5 56.5T240-640Zm240 0q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Zm240 0q-33 0-56.5-23.5T640-720q0-33 23.5-56.5T720-800q33 0 56.5 23.5T800-720q0 33-23.5 56.5T720-640ZM480-400q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm40 240v-123l221-220q9-9 20-13t22-4q12 0 23 4.5t20 13.5l37 37q8 9 12.5 20t4.5 22q0 11-4 22.5T863-380L643-160H520Zm300-263-37-37 37 37ZM580-220h38l121-122-18-19-19-18-122 121v38Zm141-141-19-18 37 37-18-19Z"/></svg></div>
                            <div className="h-max w-max outline-none bg-transparent text-2xl select-none font-semibold">Your Topic</div>
                        </div>
                        <div className="text-xs pl-6 select-none text-neutral-500">Enter the topic below</div>
                    </div>
                    
                    <div className="text-xs flex gap-3 text-white items-center">
                        <button onClick={handleSubmitForm} className="rounded-lg bg-neutral-700 h-8 pl-3 pr-3">
                            Save
                        </button>

                        <button onClick={()=>setCreate(false)} className="text-xs rounded-lg bg-red-500 h-8 pl-3 pr-3">
                            Cancel
                        </button>
                    </div>
                </div>
                <hr/>
                <div className="flex gap-6 ml-7 mr-7 relative">
                    <div className="w-full relative">
                        <div className="flex gap-3 relative">
                            <div className="relative">
                                <div className="flex relative">
                                    <div onClick={()=>setShowTimePickerLeft(prev => !prev)} type="text" className={`${errors.starttime ? 'text-red-600':'text4'} text-2xl relative bg-transparent w-max -ml-[2px]`}>
                                        {time.startHour + `:` + time.startMinute}
                                    </div>
                                    {showTimePickerLeft && <TimePickerDivLeft totalHour={totalHour} totalMinutes={totalMinutes} setTime={setTime} condition={'start'}/>}
                                </div>
                                <div style={{fontSize: '10px'}} className=" text-neutral-400">
                                    {date1}
                                </div>
                            </div>
                            <div className="relative">
                                <div className="flex">
                                    <div onClick={()=>setShowTimePickerRight(prev => !prev)} type="text" className="text-2xl text4 relative bg-transparent w-max -ml-[2px]">
                                        {time.endHour + ':' + time.endMinute}
                                    </div>
                                    {showTimePickerRight && <TimePickerDivRight totalHour={totalHour} totalMinutes={totalMinutes} setTime={setTime}/>}
                                </div>
                                <div style={{fontSize: '10px'}} className=" text-neutral-400">
                                    {date1}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-6 relative">
                            <div className={`${errors.title ? 'text-red-600':'text4'} text-sm`}>
                                Task*
                            </div>
                            
                            <div className="ml-10">
                                <input onChange={(e)=>handleTitleChange(e.target.value)} placeholder="Enter your task..." className="text-xs w-60 h-8 p-1 outline-none rounded-md border-2"/>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6 mb-6 relative">
                            <div className={`${errors.desc ? 'text-red-600':'text4'} text-sm pt-1`}>
                                Description*
                            </div>
                            
                            <textarea onChange={(e)=>handleDescChange(e.target.value)} placeholder="Enter your task..." className="resize-none text-xs w-60 h-20 p-1 outline-none rounded-md border-2 "></textarea>
                        </div>

                        <div className="flex gap-12 mt-6 mb-6">
                            <div className={`${errors.tag ? 'text-red-600':'text4'} flex items-center text-sm`}>Tags</div>
                            <div className="flex gap-1">
                                    {["Work", "Personal", "Fitness", "Study"].map((tag) => (
                                        <Tags key={tag} name={tag} color="gray" item={form.todotype[0]} onTagClick={handleTagChange} />
                                    ))}
                            </div>
                        </div>

                        <div className="mt-4">
                            <div className={`${errors.color ? 'text-red-600':'text4'} text-sm`}>Accent Color</div>
                            <div style={{fontSize: "12px"}} className=" text-neutral-400">Update your div with the color</div>
                            <div className="flex items-center gap-1 mt-1">
                                {colors.map((item,index) => (
                                    <div
                                    key={index}
                                    className={`w-5 h-5 rounded-full border-2 transition-all cursor-pointer ${
                                        form.todocolor === item ? "border-1 border-white h-7 w-7" : "border-transparent"
                                    }`}
                                    style={{ backgroundColor: item }}
                                    onClick={()=>handleColorChange(item)}
                                    >

                                    </div>

                                ))}
                                <div className="flex items-center ml-2 gap-2">
                                    <div className="text-xs text4">Custom</div>
                                    <input onChange={(e)=>handleColorChange(e.target.value)} placeholder="#D3r4E" className="text4 text-xs p-1 outline-none bg-transparent border-2 rounded-md border-neutral-400 w-16 h-7"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function TimePickerDivLeft({totalHour , totalMinutes  , setTime}){
    return(
        <div className="flex text4 w-16 h-[100px] absolute bg-neutral-700 z-[10000] top-[30px] right-[-2px] justify-center text-[12px] pt-2 text5">
            <div className="flex flex-col gap-y-1 overflow-y-scroll">
                {totalHour.map((item , index)=>(
                    <div onClick={() => setTime((prev) => ({ ...prev, startHour: item}))} className="cursor-pointer pl-1 pr-1 rounded-md hover:bg-neutral-600" key={index}>
                        {item}
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-y-1 overflow-y-scroll">
                {totalMinutes.map((item , index)=>(
                    <div onClick={() => setTime((prev) => ({ ...prev, startMinute: item}))} className="cursor-pointer pl-1 pr-1 rounded-md hover:bg-neutral-600" key={index}>
                        {item}
                    </div>
                ))}
            </div>
        </div>
    )
}

function TimePickerDivRight({totalHour , totalMinutes  , setTime , setForm}){
    return(
        <div className="flex text4 w-16 h-[100px] absolute bg-neutral-700 z-[10000] top-[30px] right-[-2px] justify-center text-[12px] pt-2 text5">
            <div className="flex flex-col gap-y-1 overflow-y-scroll">
                {totalHour.map((item , index)=>(
                    <div onClick={() => setTime((prev) => ({ ...prev, endHour: item}))} className="cursor-pointer pl-1 pr-1 rounded-md hover:bg-neutral-600" key={index}>
                        {item}
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-y-1 overflow-y-scroll">
                {totalMinutes.map((item , index)=>(
                    <div onClick={() => setTime((prev) => ({ ...prev, endMinute: item}))} className="cursor-pointer pl-1 pr-1 rounded-md hover:bg-neutral-600" key={index}>
                        {item}
                    </div>
                ))}
            </div>
        </div>
    )
}

function Card({title , description , srt , end}){
    const srtHr = parseFloat(parseInt(srt.split(':')[0]) + parseFloat(srt.split(':')[1]) / 60)
    const endHr = parseFloat(parseInt(end.split(':')[0]) + parseFloat(end.split(':')[1]) / 60)
    const height = parseInt((endHr - srtHr) * 80)

    return(
        <div className="todo-item" style={{ top: `${srtHr * 80}px`,
                                            height: `${height}px`,}}>
            <div>
                title: {title}
            </div>
            <div>
                tododesc: {description}
            </div>
        </div>
    )
}

/*Calendar Functions*/
export function Calendar1({isAbsolute}){
    const {currentYear , currentMonth} = getCurrentDateInfo()
    const [Month , setMonth] = useState(currentMonth)
    const [Year , setYear] = useState(currentYear)

    const gotToPreviousMonth = () =>{
        setMonth((prev) =>{
            if(prev === 0){
                setYear((y) => {
                    const newYear = y - 1
                    return newYear
                })
                return 11
            }
            return prev - 1
    })}

    const gotToForwardMonth = () =>{
        setMonth((prev) =>{
            if(prev === 11){
                setYear((y) => {
                    const newYear = y + 1
                    return newYear
                })
                return 0
            }
            return prev + 1
    })}

    return(
        <div className={`${isAbsolute ? 'absolute' : ''} calendar-div pl-2 pr-2 text4`}>
            <div className="h-max w-full mt-3 flex justify-between">
                <div onClick={gotToPreviousMonth} className="flex items-center cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="#d6d5d5"><path d="M576-240 336-480l240-240 51 51-189 189 189 189-51 51Z"/></svg>
                </div>
                <div className="select-none">
                    {totalMonths.map((item) => item.id === Month ? 
                    (
                    <div key={item.id}>
                        {item.name}
                        {Year}
                    </div>   
                    ) : ('')
                    )}
                </div>
                <div onClick={gotToForwardMonth} className="flex items-center cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="#d6d5d5"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
                </div>
            </div>

            <div className="calendar-body mt-3">
            {
                totalWeekDays.map((item) => (
                    <div key={item.id}>
                        {item.day[0]}    
                    </div>
                ))
            }
            {
                generateCalendarDays(Month , Year).map((item) => (
                    <div className={`${item.isCurrentMonth ? 'text5' : 'text2'}`}>
                        <div className={`${item.currentDate ? 'calendar-current-date' : ''}`}>{item.date.getDate()}</div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

function Weekdays(zino = 0){
    const {date , currentDay , currentYear , currentMonth , currentDate} = getCurrentDateInfo()

    const weeklyDate = []
    
    const startOfWeek = new Date(currentYear , currentMonth , currentDate - currentDay)

    for(let i = 0 ; i < 7 ; i++){
        const date = new Date(startOfWeek)
        date.setDate(new Date(startOfWeek.getDate() + i + zino))

        weeklyDate.push({
            date: date,
            currentDate: date.getDate() === currentDate && date.getMonth() === currentMonth && date.getFullYear() === currentYear,
        })
    }

    return weeklyDate
}

function generateCalendarDays(currentMonth , currentYear){
    const {currentDate} = getCurrentDateInfo()
    
    const lastDateOfMonth = new Date(currentYear , currentMonth + 1 , 0)
    const firstDateOfMonth = new Date(currentYear , currentMonth , 1)
    const firstDayOfMonth = new Date(currentYear , currentMonth , 1).getDay()

    const totalDays = []

    for (let i = 0; i < firstDayOfMonth; i++) {
        const dates = new Date(currentYear, currentMonth, - i); 
    
        totalDays.unshift({  
            isCurrentMonth: false,
            date: dates
        });
    }

    for(let i = firstDateOfMonth.getDate() ; i < lastDateOfMonth.getDate() + 1 ; i++){
        const dates = new Date(currentYear , currentMonth , i)

        totalDays.push({
            isCurrentMonth: true,
            date: dates,
            currentDate: currentDate === dates.getDate() ? true : false
        })
    }

    const remainingDays = 42 - totalDays.length

    for(let i = 0 ; i < remainingDays ; i++){
        const dates = new Date(currentYear , currentMonth + 1, i + 1)

        totalDays.push({
            isCurrentMonth: false,
            date: dates
        })
    }
    return totalDays
}

const generateCalendarTime = [
    {id : 0, name: '00:00' , zone: 'am'},
    {id : 1, name: '01:00' , zone: 'am'},
    {id : 2, name: '02:00' , zone: 'am'},
    {id : 3, name: '03:00' , zone: 'am'},
    {id : 4, name: '04:00' , zone: 'am'},
    {id : 5, name: '05:00' , zone: 'am'},
    {id : 6, name: '06:00' , zone: 'am'},
    {id : 7, name: '07:00' , zone: 'am'},
    {id : 8, name: '08:00' , zone: 'am'},
    {id : 9, name: '09:00' , zone: 'am'},
    {id : 10, name: '10:00' , zone: 'am'},
    {id : 11, name: '11:00' , zone: 'am'},
    {id : 12, name: '12:00' , zone: 'pm'},
    {id : 13, name: '13:00' , zone: 'pm'},
    {id : 14, name: '14:00' , zone: 'pm'},
    {id : 15, name: '15:00' , zone: 'pm'},
    {id : 16, name: '16:00' , zone: 'pm'},
    {id : 17, name: '17:00' , zone: 'pm'},
    {id : 18, name: '18:00' , zone: 'pm'},
    {id : 19, name: '19:00' , zone: 'pm'},
    {id : 20, name: '20:00' , zone: 'pm'},
    {id : 21, name: '21:00' , zone: 'pm'},
    {id : 22, name: '22:00' , zone: 'pm'},
    {id : 23, name: '23:00' , zone: 'pm'},
]

const totalMonths = [
    { id: 0, name: "January" },
    { id: 1, name: "February" },
    { id: 2, name: "March" },
    { id: 3, name: "April" },
    { id: 4, name: "May" },
    { id: 5, name: "June" },
    { id: 6, name: "July" },
    { id: 7, name: "August" },
    { id: 8, name: "September" },
    { id: 9, name: "October" },
    { id: 10, name: "November" },
    { id: 11, name: "December" }
];

const totalWeekDays = [
    { id: 0, day: 'Sunday' },
    { id: 1, day: 'Monday' },
    { id: 2, day: 'Tuesday' },
    { id: 3, day: 'Wednesday' },
    { id: 4, day: 'Thursday' },
    { id: 5, day: 'Friday' },
    { id: 6, day: 'Saturday' }
];

const getCurrentDateInfo = () => {
    const date = new Date();
    return {
        date,
        currentDay: date.getDay(),
        currentYear: date.getFullYear(),
        currentMonth: date.getMonth(),
        currentDate: date.getDate(),
    };
}

