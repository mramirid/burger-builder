import { FC } from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

interface NavigationItemsProps {
  isAuthenticated: boolean;
}

const NavigationItems: FC<NavigationItemsProps> = (props) => (
  <nav className={classes.NavigationItems}>
    <ul>
      <NavigationItem to="/" exact>
        Burger Builder
      </NavigationItem>
      {props.isAuthenticated ? (
        <NavigationItem to="/orders">Orders</NavigationItem>
      ) : null}
      {!props.isAuthenticated ? (
        <NavigationItem to="/auth">Authenticate</NavigationItem>
      ) : (
        <NavigationItem to="/logout">Logout</NavigationItem>
      )}
    </ul>
  </nav>
);

export default NavigationItems;
