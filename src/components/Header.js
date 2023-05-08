import { NavLink } from "react-router-dom";

import favicon from "../../Images/logo/favicon.png";

console.log("Inside header");
export default Header = () => {
  const activeStyles = {
    fontWeight: "bold",
    color: "#FA3B32",
  };

  return (
    <header className="header">
      <img src={favicon} className="header-logo" alt="logo" />
      <h1 className="header-title">ZORRO</h1>
      <nav className="nav-links">
        <NavLink
          to="."
          end
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Home
        </NavLink>

        <NavLink
          to="offers"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Offers
        </NavLink>

        <NavLink
          to="help"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Help
        </NavLink>

        <NavLink
          to="profile"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Profile
        </NavLink>

        <NavLink
          to="cart"
          style={({ isActive }) => (isActive ? activeStyles : null)}
        >
          Cart
        </NavLink>
      </nav>
    </header>
  );
};
