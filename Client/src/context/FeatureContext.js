import axios from "axios";
import { useContext , createContext, useState } from "react";

const FeatureContext = createContext()

export const FeatureContextProvider = ({children}) =>{

    const [email , setEmail] = useState()
    const [profilePicture , setProfilePicture] = useState()
    const [name , setName] = useState()

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
        } catch (error) {
            console.log("Error while submiting the details in the frontend" , error)
        }
    }

    return (
        <FeatureContext.Provider value={{userdetails , users , email , profilePicture , name}}>
            {children}
        </FeatureContext.Provider>
    )
}

export const useFeature = () =>{
    return(useContext(FeatureContext))
}

