import React from "react";
import ReactDOM from "react-dom/client";
import "./Style.css";
import favicon from "./Images/logo/favicon.png";
import biryani from "./Images/biryani.jpg";

// import { Provider } from "react-redux";

/**
 * App
 *  -Header
 *    logo
 *    navigation
 *  -Main
 *    -Search
 *    -Sort
 *    -Filter
 *    -Restaurents
 *  -Footer
 *    license
 *    links
 *    contact us
 * */

const Header = () => {
  return (
    <header className="header">
      <img src={favicon} className="header-logo" alt="logo" />
      <h1 className="header-title">DRIZZO</h1>
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

const RestaurentCard = () => {
  return (
    <div className="restro-card">
      <img className="restro-logo" src={biryani} alt="Restaurant-img" />
      <h3>Restaurant Name</h3>
      <p>Cuisine</p>
      <p>Rating</p>
      <p>Distance</p>
      <p>Time to deliver</p>
    </div>
  );
};
const Main = () => {
  return (
    <main className="main">
      <div className="search-sort-filter-section">
        {/* <Search /> */}
        {/* <Sort /> */}
        {/* <Filter /> */}
        <h2>Search</h2>
        <h2>Sort</h2>
        <h2>Filter</h2>
      </div>
      <hr />
      <div className="restro-container">
        <RestaurentCard />
      </div>
    </main>
  );
};

const App = () => {
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
