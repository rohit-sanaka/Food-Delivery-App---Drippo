import favicon from "../../Images/logo/favicon.png";

export default Header = () => {
  return (
    <header className="header">
      <img src={favicon} className="header-logo" alt="logo" />
      <h1 className="header-title">ZORRO</h1>
      <ul className="header-links">
        <li>Home</li>
        <li>Offers</li>
        <li>Help</li>
        <li>Profile</li>
        <li>Cart</li>
      </ul>
    </header>
  );
};
