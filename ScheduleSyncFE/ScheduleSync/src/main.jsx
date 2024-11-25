import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import YourSchedule from './pages/YourSchedule.jsx';
import Groups from './pages/Groups.jsx';
// import EditGroup from './pages/EditGroup.jsx';
// import EditPassword from './pages/EditPassword.jsx';

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
  // {
  //   path: 'edit-password',
  //   element: <EditPassword/>
  // },
  // {
  //   path: 'edit-group',
  //   element: <EditGroup/>
  // },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
