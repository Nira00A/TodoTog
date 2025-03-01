import React, { useEffect, useState } from "react"

export function CalenderPage(){
    const date = new Date()
    const [zino , setZino] = useState(0)
    const [today , setToday] = useState('')
    const [openCalendar , setOpenCalendar] = useState(false)

    const todos = [
        { title: "Workout", startTime: "02:30am", endTime: "5:00am", description: "Evening exercise" },
        { title: "Workout", startTime: "00:30am", endTime: "2:00am", description: "Evening exercise" }
    ]

    useEffect(()=>{
        const day = new Date().getDay()

        /*For Day Generation*/
        const foundDay = totalWeekDays.find((item)=> item.id === day)
        if (foundDay){
            setToday(foundDay.day.toUpperCase())
        }
    },[])


    return(
        <div className="calendar-container relative">
            <div className="w-max mt-3 flex-col relative overflow-scroll">
                <div className="flex-col relative">
                    {/**Header of the calendar*/}
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

                    {/**Weekdays and mini-Calendar*/}
                    <div className="flex gap-5 mt-5 relative">
                        <div className="flex gap-3 relative">
                            <div onClick={()=>setOpenCalendar((prev) => !prev)} className="flex items-center cursor-pointer relative">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#d6d5d5"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/></svg>
                            </div>
                            {
                                openCalendar && (
                                    <Calendar isAbsolute={true}/>
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

                {/*Big-Calendar*/}
                <div className="calendar-big-body mt-10">
                    {generateCalendarTime.map((item) =>
                        <div className="calendar-time">
                            <div>{item.name}</div>
                            <div>{item.zone}</div>
                        </div>
                    )}
                    {todos.map((todo)=> 
                        <Card 
                            key={todo.startTime} 
                            title={todo.title} 
                            description={todo.description} 
                            srt={todo.startTime} 
                            end={todo.endTime} 
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

function Card({title , description , srt , end}){
    const srtHr = parseFloat(parseInt(srt.split(':')[0]) + parseFloat(srt.split(':')[1]) / 60)
    const endHr = parseFloat(parseInt(end.split(':')[0]) + parseFloat(end.split(':')[1]) / 60)
    const height = parseInt((endHr - srtHr) * 100)

    return(
        <div className="todo-item" style={{ top: `${srtHr * 100}px`,
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
export function Calendar({isAbsolute}){
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
                    <div>
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
                    <div>
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
