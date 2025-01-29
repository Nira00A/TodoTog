import {React , createContext , useContext, useState} from "react";

const TodoContext = createContext()

export const TodoContextProvider = ({children}) =>{

    const [todo , setTodo] = useState([])

    const addTodo = (todo) =>{
        setTodo((prev) => [{ ...todo} , ...prev])
    }

    const updateTodo = (id , todo) =>{
        setTodo((prev) => prev.map((prevTodo) => (prevTodo.id == id ? todo : prevTodo)))
    }

    const deleteTodo = (id) =>{
        setTodo((prev) => prev.filter((todo) => todo.id !== id))
    }

    return(
        <TodoContext.Provider value={{todo ,addTodo , updateTodo , deleteTodo}}>
            {children}
        </TodoContext.Provider>
    )
}

export const useTodo = () =>{
    return useContext(TodoContext)
}
