import { Children, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";

import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/register';
import Single from './Pages/single';
import Write from './Pages/write';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';


const Layout = ()=>{
  return (
      	<div className='app'>
        <Navbar/>
        <div id='container'>
        <Outlet className='container'/>
        </div>
        <Footer/>
        </div>
         );
};

const router = createBrowserRouter([
  {
    path: "/",
    element:( 
    <div>
      <Layout/>
    </div>),
    
    children: [
    { path: "/",
        element:<Home/>
    }, 
    {
      path: "/Post/:id",
        element:<Single/>
,
    },
    {
      path: "/Write",
      element:<Write/>
,
    },

    ],
  },
  {
    path: "Login",
    element: <div>
        <Login/>
        </div> ,
  },
    {
    path: "Register",
    element: <div>
        <Register/>
        </div>,
  },
   
]);



function App() {

  return (
    <>
          <RouterProvider router={router} />
      
    </>
  )
}

export default App
