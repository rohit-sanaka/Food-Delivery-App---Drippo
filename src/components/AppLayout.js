import { Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../utils/store";

//Component imports
import Header from "./Header";
import Footer from "./Footer";

//style sheet imports
console.log("inside applayout");
export default function AppLayout() {
  return (
    <Provider store={store}>
      <Header />
      <Outlet />
      <Footer />
    </Provider>
  );
}
