// Library imports
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, Router, RouterProvider } from "react-router-dom";

import AppLayout from "../src/components/AppLayout";
import Main from "../src/components/Main";
import Offers from "../src/components/Offers";
import Help from "../src/components/Help";
// import ProfileFunctional from "../src/components/Profile";
import ProfileClass from "../src/components/ProfileClass";
import Cart from "../src/components/Cart";
import ErrorPage from "../src/components/ErrorPage";
import RestaurantMenu from "../src/components/RestaurantMenu";

console.log("inside app");
const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "offers",
        element: <Offers />,
      },
      {
        path: "help",
        element: <Help />,
      },
      {
        path: "profile",
        element: <ProfileClass name={"Rohit"} />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "restaurant/:id",
        element: <RestaurantMenu />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
