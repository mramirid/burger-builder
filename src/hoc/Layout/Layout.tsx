import { FC, useCallback, useState } from "react";

import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

const Layout: FC = (props) => {
  const [isSideDrawerDisplayed, setIsSideDrawerDisplayed] = useState(false);

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
