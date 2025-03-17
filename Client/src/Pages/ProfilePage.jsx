import React, { useState } from "react";
import { useTodo } from "../context/TodoContext.js";
import { useFeature } from "../context/FeatureContext.js";

function ProfilePage() {
    const [link, setLink] = useState(null);
    const [todos , setTodos] = useState([])
    const {getTodoById} = useTodo()
    const {profilePicture , name , email , date} = useFeature()

    const socialLinks = [
        { name: "facebook", img: "/Images/Icons/facebook.png" },
        { name: "github", img: "/Images/Icons/github.png" },
        { name: "pinterest", img: "/Images/Icons/pinterest.png" },
        { name: "linkedin", img: "/Images/Icons/linkedin.png" },
        { name: "instagram", img: "/Images/Icons/instagram.png" },
    ];
    const tags = [
                    { name: "Work", color: "#6b7280" },        // Gray
                    { name: "Personal", color: "#2563eb" },    // Blue
                    { name: "Fitness", color: "#10b981" },     // Green
                    { name: "Study", color: "#8b5cf6" },       // Purple
                    { name: "Travel", color: "#fb923c" },      // Orange
        ]

    const handleTagClick = async (tagname) =>{
        const todo = await getTodoById(tagname[0])
        setTodos(todo)
    }

    const handleSubmitLink = (e) => {
        console.log(link);
    };

    return (
      <div className="w-full h-full flex justify-center">
          <div className="w-[1100px] h-[90%] mt-6 flex">
              {/**Profile card*/}
              <div className="w-[28%] h-full flex flex-col gap-4 background-color">
                  <div className="w-[95%] h-[max] p-3 div-color rounded-md">
                    <div className="flex gap-3 w-[100%] h-[200px] mt-3 justify-center">
                      <div style={{backgroundImage: `url(${profilePicture})`}} className="h-[95%] w-[70%] rounded-lg bg-center bg-cover">
                        
                      </div>
                      <div className="flex flex-col gap-3">
                        <div className="h-8 w-8 rounded-md flex justify-center items-center bg-red-700">
                          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                        </div>
                        
                        <div className="h-8 w-8 rounded-md flex justify-center items-center bg-neutral-700">
                          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col text4 gap-3 pl-4">
                      <div className="text-3xl font-bold">{name}</div>
                      <div>About</div>
                      <div className="flex flex-col gap-3 text-[14px]">
                        <div className="flex items-center text-gray gap-6">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px"><path fill="currentColor" d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/></svg> 
                            <div>{email}</div>
                     
                        </div>
                        <div className="flex items-center text-gray gap-6">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px"><path fill="currentColor" d="m612-292 56-56-148-148v-184h-80v216l172 172ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q133 0 226.5-93.5T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160Z"/></svg>
                            <div>{date.split('T')[0]}</div>
                          
                        </div>
                        <div className="flex items-center text-gray gap-6">
                            <svg xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px"><path fill="currentColor" d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z"/></svg>
                            <div>Mallickpur</div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex justify-center pb-3">
                      <div className="rounded-xl w-[95%] h-14 p-2 mt-3 flex justify-between items-center overlay-color">
                        <div>
                          <div className="text-4xl font-[500] text4">12</div>
                          <div className="text-[10px] text-gray text-red">Today's Streak</div>
                        </div>
                        <svg fill="#dc2626" xmlns="http://www.w3.org/2000/svg" width="40" height="40" class="bi bi-fire" viewBox="0 0 16 16">
                          <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16m0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15"/>
                        </svg>
                      </div>
                    </div>
                    
                  </div>      
              </div>
              
              {/**Todos Cards */}
              <div className="w-[70%] h-full gap-4 flex flex-col items-center background-color">
                  <div className="w-[100%] h-[35%] div-color p-3 rounded-md">
                    <div className="text4 text-lg">Latest Todos</div>
                    <div className="text-sm text-neutral-500">List of all the latest todos</div>

                    <div className="flex flex-wrap mt-3 gap-4">
                      <TaskCard/>
                      <TaskCard/>
                      <TaskCard/>
                      <TaskCard/>
                    </div>
                  </div>

                  <div className="w-[100%] h-[63%] flex gap-4">
                    <div className="h-[100%] w-[50%] p-5 rounded-md div-color">
                      <div className="text4 text-lg">Projects</div>
                      <div className="text-sm text-neutral-500">
                        List of all the Projects created
                      </div>
                      <div className="w-[100%] h-[90%]">
                        <div className="w-[100%] h-[90%] flex flex-col justify-center items-center ">
                          <div><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#e8eaed"><path d="M620-163 450-333l56-56 114 114 226-226 56 56-282 282Zm220-397h-80v-200h-80v120H280v-120h-80v560h240v80H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h167q11-35 43-57.5t70-22.5q40 0 71.5 22.5T594-840h166q33 0 56.5 23.5T840-760v200ZM480-760q17 0 28.5-11.5T520-800q0-17-11.5-28.5T480-840q-17 0-28.5 11.5T440-800q0 17 11.5 28.5T480-760Z"/></svg></div>
                          <div className="w-[70%] text-gray text-sm text-center">No Projects have been added please create a one first</div>
                        </div>
                        <ProjectCard/>
                      </div>
                    </div>
                    <div className="h-[100%] w-[50%] p-5 rounded-md div-color">
                      <div className="text4 text-lg">Achievements</div>
                      <div className="text-sm text-neutral-500">
                        Get the latest achievements by doing todos
                      </div>
                      
                      <div className="flex flex-wrap gap-3">
                        <AchievementCard img={profilePicture}/>
                        <AchievementCard/>
                        <AchievementCard/>
                        <AchievementCard/>
                      </div>
                      
                    </div>
                  </div>
              </div>
          </div>
      </div>
    );
}

function TaskCard(){
  return(
    <div style={{backgroundColor:'var(--popup-color)'}} className="h-[70px] w-[360px] flex items-center p-1 rounded-lg">
      <div className="h-10 w-10 ml-4 rounded-md overlay-color">

      </div>

      <div className="flex w-72 justify-between">
        <div className="ml-3">
          <div className="text-[14px] text4 font-medium">
            I want to LOve
          </div>
          <div className="text-[12px] text-gray">
            I want to love because i can love
          </div>
        </div>

        <div className="">
            <div className="text-[10px] text-gray">
                10 min ago
            </div>
            <div className="flex justify-end">
              <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 -960 960 960" width="18px" fill="#e8eaed"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
            </div>
        </div>
      </div>
    </div>
  )
}

function ProjectCard(){
  return(
    <div>
      
    </div>
  )
}

function AchievementCard({img , name}){
  return(
    <div style={{backgroundColor:'var(--popup-color)'}} className="flex flex-col justify-center items-center h-[160px] w-[150px] rounded-lg overflow-hidden mt-3 relative">
      <div style={{backgroundImage: `url(${img})`}} className="h-[100px] w-[100px] bg-center bg-cover relative">
        <div className="absolute w-6 left-[90px] top-[-13px] flex justify-center rounded-full text4 bg-red-500 text-sm">
          +5
        </div>            
      </div>
      <div className="text4 text-xs mt-3">
        Newbie
      </div>
    </div>
  )
}

function Notes({}){
  return(
    <div>
        
    </div>
  )
}

export default ProfilePage;
