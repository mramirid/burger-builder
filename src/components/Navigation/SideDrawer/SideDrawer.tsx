import { FC } from "react";

import Logo from "../../Logo/Logo";
import classes from "./SideDrawer.module.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../UI/Backdrop/Backdrop";
import { DivClickEvent } from "../../types";

interface SideDrawerProps {
  isOpen: boolean;
  onClosed: (event: DivClickEvent) => void;
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
      <div className={sideDrawerClasses}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <NavigationItems />
      </div>
      <Backdrop isDisplayed={props.isOpen} onClicked={props.onClosed} />
    </>
  );
};

export default SideDrawer;
