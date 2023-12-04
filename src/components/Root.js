import { Outlet, useLocation } from "react-router-dom";
import classes from "./Root.module.css";
import MainNavigation from "./MainNavigation";
import Footer from "./Footer/Footer";


const RootLayout = () => {
  const location = useLocation();

  // Check if the current route is the home page
  const isHomePage = location.pathname === "/";

  return (
    <>
      {<MainNavigation />}
      <main className={classes.content}>
        <Outlet />
      </main>
      {<Footer />}
    </>
  );
};

export default RootLayout;
