import { FC } from "react";
import { NavLink } from "react-router-dom";

import classes from "./NavigationItem.module.css";

interface NavigationItemProps {
  to: string;
  exact?: boolean;
}

const NavigationItem: FC<NavigationItemProps> = (props) => (
  <li className={classes.NavigationItem}>
    <NavLink to={props.to} exact={props.exact} activeClassName={classes.active}>
      {props.children}
    </NavLink>
  </li>
);

export default NavigationItem;
