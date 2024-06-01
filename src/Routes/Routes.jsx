import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import AllProperties from '../Pages/AllProperties/AllProperties';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <ErrorPage></ErrorPage>,
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