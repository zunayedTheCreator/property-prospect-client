import React from 'react';
import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import AllProperties from '../Pages/AllProperties/AllProperties';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import Login from '../Pages/Login/Login';
import Register from '../Pages/Register/Register';
import PrivateRoute from './PrivateRoute';
import Details from '../Pages/Details/Details';
import Dashboard from '../Layout/Dashboard';
import UserProfile from '../Pages/Dashboard/Profile/UserProfile';
import MyReviews from '../Pages/Dashboard/ForUser/MyReviews/MyReviews';
import WishList from '../Pages/Dashboard/ForUser/WishList/WishList';
import PropertyBrought from '../Pages/Dashboard/ForUser/PropertyBrought/PropertyBrought';
import MakeOffer from '../Pages/Dashboard/ForUser/MakeOffer/MakeOffer';

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
            element: <PrivateRoute><AllProperties></AllProperties></PrivateRoute>
        },
        {
            path:"/login",
            element: <Login></Login>
        },
        {
            path:"/register",
            element: <Register></Register>
        },
        {
            path:"/property-details/:id",
            element: <PrivateRoute><Details></Details></PrivateRoute>,
            loader: ({params}) => fetch(`http://localhost:5000/property/${params.id}`)
        },
      ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: 'profile',
                element: <UserProfile></UserProfile>
            },

            // users route
            {
                path: 'wishlist',
                element: <WishList></WishList>
            },
            {
                path: 'property-brought',
                element: <PropertyBrought></PropertyBrought>
            },
            {
                path: 'my-reviews',
                element: <MyReviews></MyReviews>
            },
            {
                path: 'make-offer-for/:id',
                element: <MakeOffer></MakeOffer>,
                loader: ({params}) => fetch(`http://localhost:5000/wishlist/${params.id}`)
            },

            // admin routes
            {
                path: 'manage-properties',
                element: <h2>manage-properties</h2>
            },
            {
                path: 'manage-users',
                element: <h2>manage-users</h2>
            },
            {
                path: 'manage-reviews',
                element: <h2>manage-reviews</h2>
            },
        ]
    }
  ]);