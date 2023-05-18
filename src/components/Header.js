import { NavLink, Link } from "react-router-dom";

import favicon from "../../Images/logo/favicon.png";
import { useSelector } from "react-redux";

export default Header = () => {
  const cartItems = useSelector((store) => store.cart.items);
  return (
    <header className="flex justify-between items-center shadow-md pl-44 pr-52 h-20 sticky top-0 bg-white z-10">
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
          noofitems={cartItems.length}
          className={({ isActive }) => {
            return `relative before:content-[attr(noofitems)] before:text-center before:text-white before:absolute before:w-8  before:h-8 before:-right-5 before:-top-5 before:rounded-full before:bg-red-500
              ${
                isActive
                  ? "text-red-500"
                  : "hover:text-red-300 focus:outline-red-500"
              } `;
          }}
          to="cart"
        >
          Cart
        </NavLink>
      </nav>
    </header>
  );
};
