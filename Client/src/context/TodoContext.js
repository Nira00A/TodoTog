import axios from "axios";
import {React , createContext , useContext, useState , useEffect} from "react";

const TodoContext = createContext()

export const TodoContextProvider = ({children}) =>{

    const [form , setForm] = useState({todo:"" , todotype:"" , tododate:`${new Date().toISOString().split('T')[0]}` , tododesc:"" , todocolor:""})
    const [todos , setTodos] = useState([])
    const [refresh , setRefresh] = useState(0)
    const [todoList , setTodoList] = useState(todos)
    const [editingId, setEditingId] = useState(null);

    useEffect(()=>{
        getTodo()
    }, [])

    const getTodo = async () =>{
        try {
            const response = await axios.get('http://localhost:4000/gettodo')
            setTodos(response.data)
        } catch (error) {
            console.log('Error While getting the data', error)
        }
    }

    const submitTodo = async (e) =>{
        e.preventDefault()
        
        if(!form.todo) return

        try {
            await axios.post('http://localhost:4000/todosubmit' , 
                {todo: form.todo ,
                todotype: form.todotype ,
                tododate: form.tododate ,
                tododesc: form.tododesc,
                todocolor: form.todocolor
                })
            console.log('sucess') 
            getTodo()

        } catch (error) {
            console.log('Error while Posting the Todos' , error)
        }
    }

    const updateTodo = async (updatedTodo , taskId) =>{
        try {
            await axios.post('http://localhost:4000/todoupdate',
                {
                    id: taskId,
                    updatedTodo
                })
            setTodoList((prevtodo) => 
                prevtodo.map((todo) => todo.id === taskId ? {...todo , todo: updatedTodo} : todo)
            )
            setEditingId(null)
            getTodo()
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    }

    const deleteTodo = async (taskId) =>{
        try {
            await axios.delete(`http://localhost:4000/tododelete/${taskId}`)
            getTodo()
        } catch (error) {
            console.log('Error while deleting records', error)
        }
    }

    return(
        <TodoContext.Provider value={{form , setForm , todos , setTodos , todoList , setTodoList , editingId , setEditingId , getTodo , submitTodo , updateTodo , deleteTodo}}>
            {children}
        </TodoContext.Provider>
    )
}

export const useTodo = () =>{
    return useContext(TodoContext)
}
