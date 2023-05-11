import { NavLink, Link } from "react-router-dom";

import favicon from "../../Images/logo/favicon.png";

// console.log("Inside header");
export default Header = () => {
  //   const activeStyles = {
  //     color: "#FA3B32",
  //   };

  return (
    <header className="flex justify-between items-center shadow-md pl-44 pr-52 h-20 sticky top-0 bg-white">
      <Link to="/" className="inline-flex items-center h-full">
        <img src={favicon} className="h-full" alt="logo" />
        <h1 className="inline h-auto text-red-500 font-bold italic text-4xl">
          ZORRO
        </h1>
      </Link>
      <nav className="text-2xl flex gap-10">
        <NavLink
          className={({ isActive }) => {
            return isActive
              ? "text-red-500"
              : "hover:text-red-300 focus:outline-red-500";
          }}
          to="."
          end
        >
          Home
        </NavLink>

        <NavLink
          className={({ isActive }) => {
            return isActive
              ? "text-red-500"
              : "hover:text-red-300 focus:outline-red-500";
          }}
          to="offers"
        >
          Offers
        </NavLink>

        <NavLink
          className={({ isActive }) => {
            return isActive
              ? "text-red-500"
              : "hover:text-red-300 focus:outline-red-500";
          }}
          to="help"
        >
          Help
        </NavLink>

        <NavLink
          className={({ isActive }) => {
            return isActive
              ? "text-red-500"
              : "hover:text-red-300 focus:outline-red-500";
          }}
          to="profile"
        >
          Profile
        </NavLink>

        <NavLink
          className={({ isActive }) => {
            return isActive
              ? "text-red-500"
              : "hover:text-red-300 focus:outline-red-500";
          }}
          to="cart"
        >
          Cart
        </NavLink>
      </nav>
    </header>
  );
};
