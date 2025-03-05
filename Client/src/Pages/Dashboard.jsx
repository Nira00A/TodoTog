import React, { useEffect , useState} from "react";
import axios from "axios"
import {Area, AreaChart, Line , LineChart, XAxis , YAxis , Tooltip , CartesianGrid , ResponsiveContainer, Brush} from "recharts"
import { Calendar } from "./Calendar";
import { NavLink } from "react-router-dom";
import { useFeature } from "../context/FeatureContext";

export default function Dashboard(){
    const [newUserCheck , setNewUserCheck] = useState(true)
    const [loading , setLoading] = useState(true)
    const [step , setStep] = useState('1')
    const [profileImage , setProfileImage] = useState('/Images/Char/char1.png')
    const [username , setUsername] = useState('')
    const {userdetails , users } = useFeature()
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

    useEffect(()=>{
        users()
    },[])

    const handleClick = (link) =>{
        setProfileImage(link)
    }

    const handleChange = (event) =>{
        const file = event.target.files[0]
        if(file){
            const url = URL.createObjectURL(file)
            setProfileImage(url)
        }
    }

    const handleNameChange = (name) =>{
        setUsername(name)
        console.log(username)
    }

    const handleNext = () =>{
        setStep('2')
    }

    const handlePrev = () =>{
        setStep('1')
    }

    const handleSubmit = async () =>{
        try {
            const result = await axios.post("http://localhost:4000/newuser")
            console.log('Successfully turned the newuser False')
        } catch (error) {
            console.log("Error in the front end" , error)
        }
        setNewUserCheck(false)
    }

    const handleSubmitUserdetails = (e) =>{
        e.preventDefault()

        userdetails(username ,profileImage)
        handleSubmit()
    }

    useEffect(() => {
        axios.get("http://localhost:4000/getnewuser")
            .then((response) => {
                const result = response.data.result[0].newuser
                if(!result){
                    setNewUserCheck(false)
                }
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return null

    return(
        <div className="flex w-full h-full justify-center">

            {newUserCheck && 
            ( step === "1" ?
                <WelcomePopup onNext={handleNext} handleNameChange={handleNameChange}/>
                :
                <PicturePopup img={profileImage} onClick={handleClick} onPrev={handlePrev} onChange={handleChange} onSubmit={handleSubmitUserdetails}/>
            )}

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

function WelcomePopup({onNext , handleNameChange}){
    return(
        <div className="details-popup bg-opacity-70 bg-black relative">
            <div className="welcome-popup rounded-lg">
                <div style={{backgroundImage: `url('/Images/Image/welcome-popup.jpg')`}} className="welcome-popup-1 rounded-l-lg">

                </div>
                <div style={{display: 'grid' , gridTemplateRows: "100px 150px 130px"}} className="mt-8 ml-8">
                    <div>
                        <div className="heading">Getting Started</div>
                    </div>
                    <div className="flex-col content-center">
                        <div className="text4 pb-3">
                            Lets pick an @username
                        </div>
                        <div className="flex gap-2">
                            <input onChange={(e)=>handleNameChange(e.target.value)} className="h-8 w-64 pl-1 outline-none rounded-md"/>
                            <svg className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#e8eaed"><path d="M120-40q-33 0-56.5-23.5T40-120v-720q0-33 23.5-56.5T120-920h720q33 0 56.5 23.5T920-840v720q0 33-23.5 56.5T840-40H120Zm440-120h240v-240h-80v102L594-424l-57 57 127 127H560v80Zm-344 0 504-504v104h80v-240H560v80h104L160-216l56 56Zm151-377 56-56-207-207-56 56 207 207Z"/></svg>
                        </div>
                    </div>
                    <div style={{fontSize: '12px'}} className="flex-col content-center">
                        <div className="flex gap-3 text-gray mb-2">
                            <input type="checkbox"/>
                            <div>
                                I agree to receive mails
                            </div>
                        </div>
                        <div className="flex gap-3 text-gray">
                            <input type="checkbox"/>
                            <div>
                                I agree to the Terms & Services
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end h-max text-xs">
                        <button onClick={onNext} className="bg-white p-1 pl-2 pr-2 rounded-md mr-3 m">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function PicturePopup({img , onClick , onChange , onPrev , onSubmit}){
    const charImg = [
        { id: 1, link: '/Images/Char/char1.png' },
        { id: 2, link: '/Images/Char/char2.png' },
        { id: 3, link: '/Images/Char/char3.png' },
        { id: 4, link: '/Images/Char/char4.png' },
        { id: 5, link: '/Images/Char/char5.png' },
        { id: 6, link: '/Images/Char/char6.png' },
        { id: 7, link: '/Images/Char/char7.png' },
        { id: 8, link: '/Images/Char/char8.png' },
        { id: 9, link: '/Images/Char/char9.png' },
        { id: 10, link: '/Images/Char/char10.png' },
        { id: 11, link: '/Images/Char/char11.png' },
        { id: 12, link: '/Images/Char/char12.png' },
      ];

    return(
        <div className="details-popup bg-opacity-70 bg-black relative">
            <div className="welcome-popup rounded-lg relative">
                <div onClick={onPrev} className="absolute p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#888888"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
                </div>
                <div style={{height: '450px'}} className="flex justify-center items-center">
                    <div style={{backgroundImage: `url(${img})`}} className="h-40 w-40 rounded-full flex justify-center items-center bg-cover bg-center bg-white">
                        
                    </div>
                </div>

                <div style={{height: '450px'}} className="flex-col justify-items-center w-full relative">
                    <div className="flex-col heading h-max relative">
                        <div className="flex justify-center mt-8">Profile Picture</div>

                        <div className="flex flex-wrap gap-3 h-44 w-60 mt-8">
                            {charImg.map((items) => (
                                <div onClick={() => onClick(items.link)} key={items.id} className="h-12 w-12 rounded-full bg-cover bg-center cursor-pointer" style={{backgroundImage: `url(${items.link})`}}>
                                    
                                </div>
                            ))
                            }
                        </div>

                        <div className="h-24 w-56 rounded-lg bg-neutral-800 flex justify-center items-center mt-6">
                            <input onChange={onChange} style={{fontSize: '10px'}} className="w-max" type="file"/>
                        </div>
                    </div>
                    <button onClick={onSubmit} style={{left: "350px", bottom: "10px" , right:'10px'}} className="text-xs absolute rounded-md p-1 bg-white">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

function NewUserPopup({name , email ,handleSubmit}){

    return(
        <div className="details-popup bg-opacity-70 bg-black relative">
            <div className="profile-details-grid relative">
                <div className="bg-neutral-200 rounded-t-lg relative">
                    <div style={{top: '35px' , left: "10px"}} className="h-16 w-16 border-white border-2 shadow-lg rounded-full absolute">

                    </div>
                </div>
                
                <div className="bg-white rounded-b-lg">
                    <div className="flex justify-end mr-3 mt-1 gap-2">
                        <button className="profile-details-button shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" height="15px" viewBox="0 -960 960 960" width="15px" fill="#888888"><path d="M440-280H280q-83 0-141.5-58.5T80-480q0-83 58.5-141.5T280-680h160v80H280q-50 0-85 35t-35 85q0 50 35 85t85 35h160v80ZM320-440v-80h320v80H320Zm200 160v-80h160q50 0 85-35t35-85q0-50-35-85t-85-35H520v-80h160q83 0 141.5 58.5T880-480q0 83-58.5 141.5T680-280H520Z"/></svg>
                            Copy Link
                        </button>
                        <button className="profile-details-button shadow-sm">
                            View Profile
                        </button>
                    </div>
                    <div className="ml-3 mt-4">
                        <div style={{fontSize: '16px'}} className="font-bold text5">
                            {name}
                        </div>

                        <div style={{fontSize: '10px'}} className= "text2">
                            {email}
                        </div>
                    </div>

                    <hr className="border-neutral-200"/>

                    <div>
                        
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