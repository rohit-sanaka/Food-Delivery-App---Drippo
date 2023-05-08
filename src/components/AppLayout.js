import { Outlet } from "react-router-dom";

//Component imports
import Header from "./Header";
import Footer from "./Footer";

//style sheet imports
import "/Style.css";
console.log("inside applayout");
export default function AppLayout() {
  return (
    <div className="app-layout">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
