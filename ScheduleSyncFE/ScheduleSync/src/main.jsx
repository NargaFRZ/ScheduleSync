import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import YourSchedule from './pages/YourSchedule.jsx';
import Groups from './pages/Groups.jsx';
import GroupDetail from './pages/GroupDetail.jsx';
import EditGroup from './pages/EditGroup.jsx';
import EditPassword from './pages/EditPassword.jsx';
import EditProfile from './pages/EditProfile.jsx';
import AddSchedule from './pages/AddSchedule.jsx';
import EditSchedule from './pages/EditSchedule.jsx';
import EditGroupInfo from './pages/EditGroupInfo.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'signup',
    element: <SignUp />
  },
  {
    path: 'yourschedule',
    element: <YourSchedule/>
  },
  {
    path: 'groups',
    element: <Groups/>
  },
  {
    path: 'groups/group-detail/:groupid',
    element: <GroupDetail/>
  },
  {
    path: 'edit-group',
    element: <EditGroup/>
  },
  {
    path: 'edit-group-info',
    element: <EditGroupInfo/>
  },
  {
    path: 'edit-password',
    element: <EditPassword/>
  },
  {
    path: 'edit-profile',
    element: <EditProfile/>
  },
  {
    path: 'add-schedule',
    element: <AddSchedule/>
  },
  {
    path: 'edit-schedule',
    element: <EditSchedule/>
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
