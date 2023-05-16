import { Outlet } from "react-router-dom";

//Component imports
import Header from "./Header";
import Footer from "./Footer";

//style sheet imports
console.log("inside applayout");
export default function AppLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
