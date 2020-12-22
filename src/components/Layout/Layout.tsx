import { FC, useCallback, useState } from "react";

import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const Layout: FC = (props) => {
  const [isSideDrawerDisplayed, setIsSideDrawerDisplayed] = useState(true);

  const closeSideDrawer = useCallback(() => {
    setIsSideDrawerDisplayed(false);
  }, []);

  const toggleSideDrawer = useCallback(() => {
    setIsSideDrawerDisplayed((isSideDrawerDisplayed) => !isSideDrawerDisplayed);
  }, []);

  return (
    <>
      <Toolbar onDrawerToggleClicked={toggleSideDrawer} />
      <SideDrawer isOpen={isSideDrawerDisplayed} onClosed={closeSideDrawer} />
      <main className={classes.Content}>{props.children}</main>
    </>
  );
};

export default Layout;
