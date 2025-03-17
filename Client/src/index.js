import React, { useMemo } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {createBrowserRouter , Navigate, RouterProvider} from 'react-router-dom'
import Layout from './Layout';
import {Login} from './websiteComponent/index'
import { AuthProvider , useAuth } from './context/AuthContext';
import ProtectedRoute from './websiteComponent/Protected/Protected';
import DashboardLayout from './DashboardLayout';
import { DashCenter } from './websiteComponent/Dashboard/index';
import { TodoContextProvider } from './context/TodoContext';
import Register from './websiteComponent/Register/Register';
import {TaskPage , RewardsPage , Dashboard , CalenderPage, Terms} from './Pages/index.js'
import ProfilePage from './Pages/ProfilePage.jsx';
import { FeatureContextProvider } from './context/FeatureContext.js';

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
                element: <Dashboard/>
              },
              {
                path:'/dashboard/task',
                element: <TaskPage/>
              },
              {
                path:'/dashboard/reward',
                element: <RewardsPage/>
              },
              {
                path:'/dashboard/profile',
                element: <ProfilePage/>
              },
              {
                path:'/dashboard/calendar',
                element: <CalenderPage />
              },
              {
                path:'/dashboard/terms',
                element: <Terms />
              }
            ]
          },
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
        <FeatureContextProvider>
          <AppRoutes/>
        </FeatureContextProvider>
      </TodoContextProvider>
    </AuthProvider>
  </React.StrictMode>
);


