import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import AllProperties from '../Pages/AllProperties/AllProperties';

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path:"/",
            element: <Home></Home>
        },
        {
            path:"/all-properties",
            element: <AllProperties></AllProperties>
        },
      ]
    },
  ]);