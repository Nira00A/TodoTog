import React, { useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter , Navigate, RouterProvider} from 'react-router-dom'
import Layout from './Layout';
import {Dashboard, Login} from './websiteComponent/index'
import Signin from './websiteComponent/Signin/Signin';
import { AuthProvider , useAuth } from './context/AuthContext';
import ProtectedRoute from './websiteComponent/Protected/Protected';
import DashboardLayout from './DashboardLayout';
import { DashCenter } from './dashboardBuilderComponent';
import TaskPage from './dashboardBuilderComponent/Pages/TaskPage';

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
            element: user ? <Navigate to='/dashboard/dashcenter'/> : <Login/>
          },
          {
            path:`/signin`,
            element:<Signin/>
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
                path: '/dashboard/dashcenter',
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
      <AppRoutes/>
    </AuthProvider>
  </React.StrictMode>
);


