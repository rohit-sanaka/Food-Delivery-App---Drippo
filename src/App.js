// Library imports
import React from "react";
import ReactDOM from "react-dom/client";

//Component imports
import Header from "./components/Header";
import Main from "./components/Main";

//style sheet imports
import "/Style.css";

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
