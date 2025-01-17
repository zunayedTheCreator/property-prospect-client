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
import ManageUser from '../Pages/Dashboard/ForAdmin/ManageUser/ManageUser';
import AdminRoute from './AdminRoute';
import AgentRoute from './AgentRoute';
import AddProperty from '../Pages/Dashboard/ForAgent/AddProperty/AddProperty';
import AddedProperties from '../Pages/Dashboard/ForAgent/AddedProperties/AddedProperties';
import UpdateProperty from '../Pages/Dashboard/ForAgent/UpdateProperty/UpdateProperty';
import RequestedProperties from '../Pages/Dashboard/ForAgent/RequestedProperties/RequestedProperties';
import PaymentPage from '../Pages/Dashboard/ForUser/PaymentPage/PaymentPage';
import SoldProperties from '../Pages/Dashboard/ForAgent/SoldProperties/SoldProperties';
import ManageReviews from '../Pages/Dashboard/ForAdmin/ManageReviews/ManageReviews';
import ManageProperties from '../Pages/Dashboard/ForAdmin/ManageProperties/ManageProperties';
import AdvertiseProperty from '../Pages/Dashboard/ForAdmin/AdvertiseProperty/AdvertiseProperty';

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
            loader: ({params}) => fetch(`https://property-prospect-server.vercel.app/property/${params.id}`)
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
                loader: ({params}) => fetch(`https://property-prospect-server.vercel.app/wishlist/${params.id}`)
            },
            {
                path: 'payment-for/:id',
                element: <PaymentPage></PaymentPage>,
                loader: ({params}) => fetch(`https://property-prospect-server.vercel.app/brought-property/${params.id}`)
            },

            // admin routes
            {
                path: 'manage-properties',
                element: <AdminRoute><ManageProperties></ManageProperties></AdminRoute>
            },
            {
                path: 'manage-users',
                element: <AdminRoute><ManageUser></ManageUser></AdminRoute>
            },
            {
                path: 'manage-reviews',
                element: <AdminRoute><ManageReviews></ManageReviews></AdminRoute>
            },
            {
                path: 'advertise-property',
                element: <AdminRoute><AdvertiseProperty></AdvertiseProperty></AdminRoute>
            },

            // agent routes
            {
                path: 'add-property',
                element: <AgentRoute><AddProperty></AddProperty></AgentRoute>
            },
            {
                path: 'my-added-properties',
                element: <AgentRoute><AddedProperties></AddedProperties></AgentRoute>
            },
            {
                path: 'update-property/:id',
                element: <AgentRoute><UpdateProperty></UpdateProperty></AgentRoute>,
                loader: ({params}) => fetch(`https://property-prospect-server.vercel.app/property/${params.id}`)
            },
            {
                path: 'requested-properties',
                element: <AgentRoute><RequestedProperties></RequestedProperties></AgentRoute>
            },
            {
                path: 'sold-properties',
                element: <AgentRoute><SoldProperties></SoldProperties></AgentRoute>
            },
        ]
    }
  ]);