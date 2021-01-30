import { FC } from "react";

import Logo from "../../Logo/Logo";
import classes from "./SideDrawer.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import { DivClickHandler } from "../../../types/event-handlers";

interface SideDrawerProps {
  isAuthenticated: boolean;
  isOpen: boolean;
  onClosed: DivClickHandler;
}

const SideDrawer: FC<SideDrawerProps> = (props) => {
  let sideDrawerClasses: string;
  if (props.isOpen) {
    sideDrawerClasses = `${classes.SideDrawer} ${classes.Open}`;
  } else {
    sideDrawerClasses = `${classes.SideDrawer} ${classes.Close}`;
  }

  return (
    <>
      <div className={sideDrawerClasses} onClick={props.onClosed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <NavigationItems isAuthenticated={props.isAuthenticated} />
      </div>
      <Backdrop isDisplayed={props.isOpen} onClicked={props.onClosed} />
    </>
  );
};

export default SideDrawer;
