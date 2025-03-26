import React, { useCallback, useState } from "react";
import { useFeature } from "../context/FeatureContext";
import { ShowPopup } from "../dashboardComponent/index.js";

export default function ProjectCreate(){
    const tags = [
    { name: "Work", class: "bg-blue-300 text-black" },
    { name: "Study", class: "bg-purple-300 text-black" },
    { name: "Fitness", class: "bg-green-300 text-black" },
    { name: "Personal", class: "bg-pink-300 text-black" },
    { name: "Deadline", class: "bg-red-300 text-black" },
    { name: "Shopping", class: "bg-yellow-300 text-black" },
    { name: "Meal Plan", class: "bg-amber-300 text-black" },
    { name: "Maintenance", class: "bg-gray-300 text-black" },
    { name: "Relax", class: "bg-teal-300 text-black" },
    { name: "Entertainment", class: "bg-indigo-300 text-black" },
    { name: "Goals", class: "bg-cyan-300 text-black" },
    { name: "Finance", class: "bg-orange-300 text-black" },
    { name: "Events", class: "bg-rose-300 text-black" },
    { name: "Self Growth", class: "bg-lime-300 text-black" },
    { name: "Mindfulness", class: "bg-emerald-300 text-black" }
    ];  
    const {projectForm , setProjectForm , project} = useFeature()
    const [message , setMessage] = useState('')
    const [showPopup , setShowPopup] = useState(false)

    const handleChange = useCallback((field, value) => {
        setProjectForm((prev) => ({ ...prev, [field]: value }));
    }, [setProjectForm]);

    const handleAttachChange = useCallback((event) =>{
        const file = event.target.files[0]
        if(file){
            const url = URL.createObjectURL(file)
            setProjectForm((prev)=> ({...prev, 'attachment': url}))
        }
        setTimeout(() => setShowPopup(true), 500);
        setTimeout(() => setShowPopup(false), 3000);

        setMessage('The file is been uploaded')
    },[setProjectForm])
    
    const handleTagChange = useCallback((item)=>{
        setProjectForm((prev)=>({...prev , 'tag':item}))
    }, [setProjectForm])

    const handleStatusChange = useCallback((item)=>{
        setProjectForm((prev)=>({...prev, 'status':item}))
    }, [setProjectForm])

    const handleSubmit = () =>{
        setMessage('The project has been created')

        setTimeout(() => setShowPopup(true), 500);
        setTimeout(() => setShowPopup(false), 3000);
        
        project()
    }

    return(
        <div className="w-full h-full flex justify-center relative">
            {showPopup && <ShowPopup message={message}/>}
            <div className="w-[1150px] flex flex-col relative p-3 overflow-scroll scrollbar-none max-navlg:w-full">      
                <div className="w-full">
                    <div className="heading">
                        Project create
                    </div>
                    <div className="text-[14px] text-neutral-500">
                        Enter a name and description to start a new project. Customize your tasks and set deadlines to stay on track.
                    </div>
                </div>

                <div className="flex text-[14px] w-full text-neutral-500 gap-2 mt-3">
                    <div className="flex text-[10px] gap-2 relative">
                        {[{name:'High' , color:'red-700' , bg:'bg-red-100'},
                        {name:'Medium' , color:'yellow-700' , bg:'bg-yellow-100'},
                        {name:'Low' , color:'green-700' , bg:'bg-green-100'}
                        ].map((items)=>(
                            <button onClick={()=>handleStatusChange(items.name)} key={items.name} className={`text-${items.color} ${items.bg} ${projectForm.status === items.name ? `opacity-50`:''} px-3 py-1 rounded-md`}>{items.name}</button>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-2 mt-6">
                    <div className="text-[14px] text-neutral-500">
                        Project Name
                    </div>
                    <input onChange={(e)=>handleChange('title',e.target.value)} placeholder="Enter project title..." className="w-full h-10 text-[12px] p-2 text4 rounded-lg overlay-color border-[1px] focus:outline-neutral-900 border-neutral-600"/>
                </div>

                <div className="flex flex-col gap-2 mt-3">
                    <div className="text-[14px] text-neutral-500">
                        Description
                    </div>
                    <textarea onChange={(e)=>handleChange('desc',e.target.value)} placeholder="Enter project description..." className="w-full h-28 text-[12px] p-2 text4 rounded-lg overlay-color border-[1px] focus:outline-neutral-900 border-neutral-600"/>
                </div>

                <div className="flex flex-col gap-2 mt-3">
                    <div className="text-[14px] text-neutral-500">
                        Choose Tags
                    </div>
                    <div className="w-[500px] flex flex-wrap gap-2 max-navmd:w-full">
                        {tags.map((items)=>
                            <div onClick={()=>handleTagChange({name: items.name , color: items.class})} key={items.name}>
                                <Tags name={items.name} color={items.class} projectForm={projectForm}/>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-2 mt-3">
                    <div className="text-[14px] text-neutral-500">
                        Upload Attachments
                    </div>
                    <div>
                        <input onChange={handleAttachChange} type="file" id="file" className="hidden" />
                        <label
                            htmlFor="file"
                            className={`${projectForm.attachment ? 'border-green-600':'border-neutral-500'} h-[100px] w-full rounded-lg border border-dashed flex flex-col items-center justify-center cursor-pointer text-neutral-500`}
                            >
                            <div className="text1 flex gap-1">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" ><path fill="currentColor" d="M440-320v-326L336-542l-56-58 200-200 200 200-56 58-104-104v326h-80ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z"/></svg>
                                <div>Upload</div>
                            </div>
                            <div className="text1 text-[12px]">
                                Upload the attachments here for the notes
                            </div>
                        </label>
                    </div>
                </div>

                <div className="flex flex-col gap-2 mt-3 w-full">
                    <div className="text-[14px] text-neutral-500">
                        Set Deadline
                    </div>
                    <input onChange={(e)=>handleChange('duedate',e.target.value)} type="date" placeholder="Enter project description..." className="w-full h-10 text-[12px] p-2 text-neutral-500 rounded-lg overlay-color border-[1px] focus:outline-neutral-900 border-neutral-600"/>
                </div>

                <div className="flex mt-6 w-full">
                    <button onClick={handleSubmit} className="text-[14px] p-1 text-white bg-green-600 rounded-sm">
                        Get Submit
                    </button>
                </div>
            </div>
        </div>
    )
}

function Tags({name , color , projectForm}){
    return(
        <div className={`${color} ${projectForm.tag.name === name ? `opacity-50`:``} text-[12px] pl-1 pr-1 cursor-pointer hover:opacity-80 rounded-sm max-navsm:text-[10px]`}>
            #{name}
        </div>
    )
}