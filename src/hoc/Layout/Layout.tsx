import { FC, useCallback, useState } from "react";

import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { useAppSelector } from "../../store";
import { selectIsAuth } from "../../store/reducers/auth";

const Layout: FC = (props) => {
  const isAuthenticated = useAppSelector(selectIsAuth);
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
        isAuthenticated={isAuthenticated}
        onDrawerToggleClicked={toggleSideDrawer}
      />
      <SideDrawer
        isAuthenticated={isAuthenticated}
        isOpen={isSideDrawerDisplayed}
        onClosed={closeSideDrawer}
      />
      <main className={classes.Content}>{props.children}</main>
    </>
  );
};

export default Layout;
