import { FC, useCallback, useState } from "react";
import { useSelector } from "react-redux";

import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { RootState } from "../../store";

const Layout: FC = (props) => {
  const auth = useSelector((state: RootState) => state.auth);
  const [isSideDrawerDisplayed, setIsSideDrawerDisplayed] = useState(false);

  const closeSideDrawer = useCallback(() => {
    setIsSideDrawerDisplayed(false);
  }, []);

  const toggleSideDrawer = useCallback(() => {
    setIsSideDrawerDisplayed((isSideDrawerDisplayed) => !isSideDrawerDisplayed);
  }, []);

  return (
    <>
      <Toolbar
        isAuthenticated={!!auth.token}
        onDrawerToggleClicked={toggleSideDrawer}
      />
      <SideDrawer
        isAuthenticated={!!auth.token}
        isOpen={isSideDrawerDisplayed}
        onClosed={closeSideDrawer}
      />
      <main className={classes.Content}>{props.children}</main>
    </>
  );
};

export default Layout;
