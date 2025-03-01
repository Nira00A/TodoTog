import React from "react";
import {Area, AreaChart, Line , LineChart, XAxis , YAxis , Tooltip , CartesianGrid , ResponsiveContainer, Brush} from "recharts"
import { Calendar } from "./Calendar";
import { data, NavLink } from "react-router-dom";

export default function Dashboard(){
    const data = [
  { month: "January", completed: 45, pending: 10, total: 55 },
  { month: "February", completed: 38, pending: 12, total: 50 },
  { month: "March", completed: 50, pending: 8, total: 58 },
  { month: "April", completed: 42, pending: 15, total: 57 },
  { month: "May", completed: 55, pending: 5, total: 60 },
  { month: "June", completed: 48, pending: 10, total: 58 },
  { month: "July", completed: 52, pending: 7, total: 59 },
  { month: "August", completed: 60, pending: 4, total: 64 },
  { month: "September", completed: 58, pending: 6, total: 64 },
  { month: "October", completed: 47, pending: 9, total: 56 },
  { month: "November", completed: 49, pending: 8, total: 57 },
  { month: "December", completed: 53, pending: 5, total: 58 },
];


    return(
        <div className="flex w-full h-full justify-center">
            <div className="flex-col pt-1">
                {/**Heading of Dashboard*/}
                <div className="heading mb-3">
                    Dashboard
                </div>

                {/**Two portions*/}
                <div className="flex gap-3">
                    {/**Cards Portion*/}
                    <div className="flex-col h-full">
                        <div className="flex gap-3">
                            <Card chart={<Chart data={data} datakey='completed'/>} name={'Task Completed'} desc={"This is a sample text"} svg={<svg style={{fill: "var(--div-color)"}} xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" ><path fill="currentColor" d="m332-264 148-113 148 113-56-182 148-106H538l-58-192-58 192H240l148 106-56 182ZM480-96q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q80 0 149.5 30t122 82.5Q804-699 834-629.5T864-480q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Zm0-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z"/></svg>}/>
                            <Card chart={<Chart data={data} datakey='completed'/>} name={'Task Pending'} desc={"This is a sample text"} svg={<svg style={{fill: "var(--div-color)"}} xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px"><path fill="currentColor" d="M336-240h288v-72H336v72Zm0-144h288v-72H336v72ZM263.72-96Q234-96 213-117.15T192-168v-624q0-29.7 21.15-50.85Q234.3-864 264-864h312l192 192v504q0 29.7-21.16 50.85Q725.68-96 695.96-96H263.72ZM528-624v-168H264v624h432v-456H528ZM264-792v189-189 624-624Z"/></svg>}/>
                            <Card chart={<Chart data={data} datakey='completed'/>} name={'streak'} desc={"This is a sample text"} svg={<svg style={{fill: "var(--div-color)"}} xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" ><path fill="currentColor" d="m332-264 148-113 148 113-56-182 148-106H538l-58-192-58 192H240l148 106-56 182ZM480-96q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q80 0 149.5 30t122 82.5Q804-699 834-629.5T864-480q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Zm0-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z"/></svg>}/>
                        </div>

                        <div className="flex gap-3 mt-4">
                            <LongCard data={data} dataKey="pv"/>
                            <Calendar />
                        </div>

                        <div className="flex-col">
                            <div></div>
                            <div></div>
                        </div>
                    </div>

                    {/**SideCard Portion */}
                    <div className="flex-col h-full w-80 rounded-lg div-color">
                        <div className="flex-col">
                            <div className="flex justify-between p-2 text4">
                                <div>Today's Work</div>
                                <NavLink to={'/dashboard/calendar'}>
                                    <svg style={{fill: "var(--div-color)"}} xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px"><path fill="currentColor" d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/></svg>
                                </NavLink>
                            </div>
                            <div>
                                This is a sample first todo
                            </div>
                        </div>

                        <div>
                            <div className="text4">Achievements</div>

                            <div>This will contain the recent achievementts</div>
                        </div>

                        <div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

function Card({name , svg , chart , desc}){
    return(
        <div className="dashboard-card">
            {/**Card-Header*/}
            <div className="flex items-center pl-3 gap-1">
                <div className="p-1 overlay-color rounded-full">{svg}</div>
                <div>{name}</div>
            </div>
            
            <div>
                <hr className="m-0"/>
                <div className="flex pl-4">
                    <div className="h-24 w-36">
                        {chart}
                    </div>
                    <div className="flex justify-center items-end w-max text1 text-xs">
                        {desc}
                    </div>
                </div>
            </div>
        </div>
    )
}

function LongCard({data , datakey}){
    return(
        <div className="dashboard-long-card">
            <div>
                <div className="flex justify-between p-2 text4">
                    <div className="text-xl font-semibold p-2">
                        Todo
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="p-2 text-sm h-max cursor-pointer overlay-color rounded-lg">
                            Wekkly
                        </div>
                        <div className="p-2 text-sm h-max cursor-pointer overlay-color rounded-lg">
                            Monthly
                        </div>
                    </div>
                </div>

                <div className="h-48">
                    <LongChart data={data} datakey={datakey}/>
                </div>
            </div>

        </div>
    )
}

function AchievementsCard({name , tag , desc , url}){
    return(
        <div className="">
            <div>
                <div style={{backgroundImage: `url(${desc})`}}>

                </div>
                <div>
                    <div>{name}</div>
                    <div>{desc}</div>
                </div>
                <div>
                    <div>{tag}</div>
                </div>
            </div>
        </div>
    )
}

function LongChart({data}){
    return(
        <ResponsiveContainer height='100%' width="100%">
            <AreaChart width={300} height={100} data={data} syncId="anyId" margin={{top: 10 , right: 30}}>

            <Area type="monotone" fill="red" stroke="" dataKey="completed" />
            <Area type="monotone" fill="" stroke="" dataKey="pending" />
            <XAxis dataKey={"month"} tick={{ fontSize: 10 }}/>
            <YAxis />
            </AreaChart>
        </ResponsiveContainer>
    )
}

function Chart({data , datakey}){
    
    return(
        <ResponsiveContainer height='100%' width="100%">
            <LineChart width={300} height={100} data={data}>
                <Line type="monotone" dataKey={datakey} stroke="red" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
    )
}