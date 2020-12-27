import { FC } from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems: FC = () => (
  <nav className={classes.NavigationItems}>
    <ul>
      <NavigationItem to="/" exact>
        Burger Builder
      </NavigationItem>
      <NavigationItem to="/orders">Orders</NavigationItem>
    </ul>
  </nav>
);

export default NavigationItems;
