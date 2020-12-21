import { FC } from "react";

import classes from "./NavigationItem.module.css";

interface NavigationItemProps {
  to: string;
  isActive: boolean;
}

const NavigationItem: FC<NavigationItemProps> = (props) => (
  <li className={classes.NavigationItem}>
    <a href={props.to} className={props.isActive ? classes.active : ""}>
      {props.children}
    </a>
  </li>
);

export default NavigationItem;
