import React, { Children, createContext, useEffect, useState , useContext } from "react";
import authService from "../appwrite/authService";

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user , setUser] = useState('')
    const [message , setMessage] = useState('')
    const [loading , setLoading] = useState(false)
 
    useEffect(()=>{
        const checkedUserSession = async () =>{
            try {
                const currentUser = await authService.getCurrentUser()
                setUser(currentUser)
            } catch (error) {
                setUser(null)
            } finally{
                setLoading(false)
            }
        }
        checkedUserSession()
    }, [])

    const login = async({email , password}) =>{
        try {
            const LoggedinUser = await authService.login({email , password})
            setUser(LoggedinUser)
        } catch (error) {
            setMessage('Check the email again')
        }
    }

    const logout = async() =>{
        try {
            await authService.logout()
            setUser(null)
        } catch (error) {
            setMessage('There is a problem in Logging out')
        }
    }
    return(
        <AuthContext.Provider value={{user , loading , message , login , logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);