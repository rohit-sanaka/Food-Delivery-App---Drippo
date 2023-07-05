// Library imports
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import '/Index.css';

import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom';

import AppLayout from './components/AppLayout';
import Main from './components/Main';
import Offers from './components/Offers';
import Help from './components/Help';
// import ProfileFunctional from "../src/components/Profile";
import ProfileClass from './components/ProfileClass';
import Cart from './components/Cart';
import ErrorPage from './components/ErrorPage';
import RestaurantMenu from './components/RestaurantMenu';

console.log('inside app');
const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: 'offers',
        element: <Offers />,
      },
      {
        path: 'help',
        element: <Help />,
      },
      {
        path: 'profile',
        element: <ProfileClass name={'Rohit'} />,
      },
      {
        path: 'cart',
        element: <Cart />,
      },
      {
        path: 'restaurant/:id',
        element: <RestaurantMenu />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RouterProvider router={router} />);
