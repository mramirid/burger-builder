import { FC } from "react";

import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import { DivClickHandler } from "../../../shared/types/events";

interface ToolbarProps {
  onDrawerToggleClicked: DivClickHandler;
}

const Toolbar: FC<ToolbarProps> = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggle onClicked={props.onDrawerToggleClicked} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <div className={classes.DesktopOnly}>
      <NavigationItems />
    </div>
  </header>
);

export default Toolbar;
