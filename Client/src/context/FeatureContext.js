import axios from "axios";
import { useContext , createContext, useState, useEffect } from "react";
import { ShowPopup } from "../dashboardComponent/index.js";

const FeatureContext = createContext()

export const FeatureContextProvider = ({children}) =>{

    const [email , setEmail] = useState()
    const [profilePicture , setProfilePicture] = useState()
    const [name , setName] = useState()
    const [streak , setStreak] = useState()
    const [date , setDate] = useState()
    const storedToggle = localStorage.getItem("toggle") === "true";
    const [message , setMessage] = useState({mess:'',cond:''})
    const [toogleChecked, setToogleChecked] = useState(storedToggle);
    const [projectForm , setProjectForm] = useState({status:'', title: '', desc: '', tag: '' , attachment: '' , duedate: ''})
    const [projectTodo , setProjectTodo] = useState({projid:'',title: '',desc:'',   start:  { time: '00:00' , date: ''},
                                                                                    end:    { time: '00:00' , date: ''}
                                                                                    ,status:''})
    
    const [totalNotes , setTotalNotes] = useState([])
    const [totalProjects , setTotalProjects] = useState([])
    const [totalProjectTodos , setTotalProjectTodos] = useState([])

    useEffect(()=>{
        getproject()
    },[])

    const userdetails = async (username , profilepic) =>{
        try {
            const response = await axios.post("http://localhost:4000/userdetails" , {
                username: username,
                profilepic: profilepic
            })
            
        } catch (error) {
            console.log("Error while submiting the details in the frontend" , error)
        }
    } 

    const users = async ()=>{
        try {
            const response = await axios.get("http://localhost:4000/getuserinfo")
            const result = response.data
            setEmail(result.email)
            setProfilePicture(result.profilepic)
            setName(result.username)
            setDate(result.date)
        } catch (error) {
            console.log("Error while submiting the details in the frontend" , error)
        }
    }

    const project = async ()=>{
        try {
            await axios.post("http://localhost:4000/project", {
                status: projectForm.status,
                title: projectForm.title,
                description: projectForm.desc,
                tag: projectForm.tag,
                attachment: projectForm.attachment,
                duedate: projectForm.duedate
            })
        } catch (error) {
            console.log("Error while submiting the project in the frontend" , error)
        }
    }

    const sumbitprojecttodo = async ()=>{
        if(!projectTodo.projid){
            return setMessage("Can't get the Project Id please refresh")
        }

        if(projectTodo.title.trim() === '' || projectTodo.desc.trim() === ''){
            return setMessage('Please enter valid information')
        }

        if(projectTodo.start.time.trim() === '' || projectTodo.end.time.trim() === '' || projectTodo.end.date.trim() === ''){
            return setMessage('Enter the valid Date and time')
        }

        try {
            const response = await axios.post("http://localhost:4000/projecttodosubmit",{
                proj_id: projectTodo.projid,
                title: projectTodo.title,
                description: projectTodo.desc,
                starttime: `${projectTodo.start.time} ${projectTodo.start.date}`,
                endtime: `${projectTodo.end.time} ${projectTodo.end.date}`,
                status: projectTodo.status
            })
        } catch (error) {
            console.log("Error while submiting the project todo in the frontend" , error)
        }
    }

    const getproject = async ()=>{
        try {
            const response = await axios.get("http://localhost:4000/getproject")
            setTotalProjects(response.data)
        } catch (error) {
            console.log("Error while getting the project in the frontend" , error)
        }
    }

    const getprojecttodo = async (projid)=>{
        try {
            const response = await axios.post('http://localhost:4000/getprojecttodo', {
                proj_id : projid
            })
            const data = response.data.result;
            setTotalProjectTodos(data)
            return data

        } catch (error) {
            console.log("Error while getting the project todo in the frontend" , error)
        }
    }

    const deleteprojecttodo = async (projid , todoid)=>{
        try {
            const response = await axios.post('http://localhost:4000/deleteprojecttodo',{
                id : todoid,
                proj_id : projid
            })
            const data = response.data.result
            return data
        } catch (error) {
            console.log("Error while deleting the project todo in the frontend" , error)
        }
    }

    const notes = async (projid , notes)=>{
        try {
            const response = await axios.post('http://localhost:4000/notes',{
                proj_id : projid,
                notes: notes,
            })
            const data = response.data.result
            return data
        } catch (error) {
            console.log("Error while submitting the notes in the frontend" , error)
        }
    }

    const getnotes = async (projid)=>{
        if (!projid) return console.log("Project ID is missing");

        try {
            const response = await axios.post('http://localhost:4000/getnotes', {
                proj_id : projid
            })
            setTotalNotes(response.data.result)
        } catch (error) {
            console.log("Error while getting the notes in the frontend" , error)
        }
    }

    const noteschecked = async (id , projid)=>{
        if (!projid) return console.log("Project ID is missing");

        try {
            const response = await axios.post('http://localhost:4000/noteschecked', {
                id: id,
                proj_id : projid
            })
            const data = response.data.result
            return data
        } catch (error) {
            console.log("Error while updating the notes in the frontend" , error)
        }
    }

    const streaks = async ()=>{
        try {
            const response = await axios.post("http://localhost:4000/visit")
            setStreak(response.data.streak)
        } catch (error) {
            console.log("Error while fetching the streak", error)
        }
    }

    return (
        <FeatureContext.Provider value={{userdetails , users , streaks , setToogleChecked , setProjectForm  , project , setProjectTodo , sumbitprojecttodo , setMessage , getprojecttodo , deleteprojecttodo , setTotalProjectTodos , notes , getnotes , setTotalNotes , noteschecked , totalNotes , totalProjectTodos , message , totalProjects , projectForm , toogleChecked , streak , email , profilePicture , projectTodo , name , date}}>
            {children}
        </FeatureContext.Provider>
    )
}

export const useFeature = () =>{
    return(useContext(FeatureContext))
}

