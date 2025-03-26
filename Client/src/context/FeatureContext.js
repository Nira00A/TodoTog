import axios from "axios";
import { useContext , createContext, useState, useEffect } from "react";

const FeatureContext = createContext()

export const FeatureContextProvider = ({children}) =>{

    const [email , setEmail] = useState()
    const [profilePicture , setProfilePicture] = useState()
    const [name , setName] = useState()
    const [streak , setStreak] = useState()
    const [date , setDate] = useState()
    const storedToggle = localStorage.getItem("toggle") === "true";
    const [toogleChecked, setToogleChecked] = useState(storedToggle);
    const [projectForm , setProjectForm] = useState({status:'', title: '', desc: '', tag: '' , attachment: '' , duedate: ''})

    const [totalProjects , setTotalProjects] = useState([])

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
            const response = await axios.post("http://localhost:4000/project", {
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

    const getproject = async ()=>{
        try {
            const response = await axios.get("http://localhost:4000/getproject")
            setTotalProjects(response.data)
        } catch (error) {
            console.log("Error while getting the project in the frontend" , error)
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
        <FeatureContext.Provider value={{userdetails , users , streaks , setToogleChecked , setProjectForm  , project , totalProjects , projectForm , toogleChecked , streak , email , profilePicture , name , date}}>
            {children}
        </FeatureContext.Provider>
    )
}

export const useFeature = () =>{
    return(useContext(FeatureContext))
}

