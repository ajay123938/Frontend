import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {RouterProvider,createBrowserRouter} from 'react-router-dom';
import Profile from './Components/Profile/Profile';
import Attendance from './Components/Attendance/Attendance';
import InternalResult from './Components/Internal-result/InternalResult';
import Fee from './Components/Fee/Fee';
import Notices from './Components/Notices/Notices';
import HelpDesk from './Components/Help-Desk/HelpDesk';
import Login from './Components/Login/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  
  {path:'/',element:<Login/>},
  {
    path: '/studentPortal',
    element: <App />,
    children:[
      
        {path: 'profile',
        element: <Profile />,
      },
    {path: 'Attendance',
        element: <Attendance />,
      }, 
      {path: 'InternalResult',
        element: <InternalResult />,
      },
      {path: 'Fee',
        element: <Fee />,
      },
       {path: 'Notices',
        element: <Notices />,
      },
       {path: 'HelpDesk',
        element: <HelpDesk />,
      },
       
    ]
  },
]);
root.render(
  
   <RouterProvider router={router} />
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
