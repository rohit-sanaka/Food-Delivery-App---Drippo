// Library imports
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "../src/components/AppLayout";
import Main from "../src/components/Main";
import Offers from "../src/components/Offers";
import Help from "../src/components/Help";
import Profile from "../src/components/Profile";
import Cart from "../src/components/Cart";
import ErrorPage from "../src/components/ErrorPage";

console.log("inside app");
const App = () => {
  return (
    <BrowserRouter>
      <StrictMode>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Main />} />
            <Route path="offers" element={<Offers />} />
            <Route path="help" element={<Help />} />
            <Route path="profile" element={<Profile />} />
            <Route path="cart" element={<Cart />} />

            {/* <Route path="host" element={<HostLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="income" element={<Income />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="vans" element={<HostVans />} />
          <Route path="vans/:id" element={<HostVanDetail />}>
            <Route index element={<HostVanInfo />} />
            <Route path="pricing" element={<HostVanPricing />} />
            <Route path="photos" element={<HostVanPhotos />} />
          </Route>
        </Route> */}
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </StrictMode>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
