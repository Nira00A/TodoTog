import React, { useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter , Navigate, RouterProvider} from 'react-router-dom'
import Layout from './Layout';
import {Dashboard, Login} from './websiteComponent/index'
import Signin from './websiteComponent/Register/Register';
import { AuthProvider , useAuth } from './context/AuthContext';
import ProtectedRoute from './websiteComponent/Protected/Protected';
import DashboardLayout from './DashboardLayout';
import { DashCenter } from './dashboardBuilderComponent';
import {TaskPage , Tasks} from './dashboardBuilderComponent/Pages/TaskPage';
import { TodoContextProvider } from './context/TodoContext';
import Register from './websiteComponent/Register/Register';

const root = ReactDOM.createRoot(document.getElementById('root'));

const AppRoutes = () =>{
  const {user} = useAuth()
  
  const router = useMemo(() =>{
    return createBrowserRouter([
      {
        path: '/',
        element: <Layout/>,
        children:[
          {
            path: '/login',
            element: user ? <Navigate to='/dashboard'/> : <Login/>
          },
          {
            path:`/register`,
            element:<Register/>
          }
        ]
      },
      {
        path: '/',
        element: <ProtectedRoute />,
        children:[
          {
            path: '/dashboard',
            element: <DashboardLayout/>,
            children:[
              {
                path: '/dashboard',
                element: <DashCenter/>
              },
              {
                path:'/dashboard/task',
                element: <TaskPage/>
              }
            ]
          }
        ]
      }
    ])
  }, [user])

  return(
    <RouterProvider router = {router}/>
  )
}

root.render(
  <React.StrictMode>
    <AuthProvider>
      <TodoContextProvider>
        <AppRoutes/>
      </TodoContextProvider>
    </AuthProvider>
  </React.StrictMode>
);


