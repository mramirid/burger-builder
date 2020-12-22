import { FC } from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems: FC = () => (
  <nav className={classes.NavigationItems}>
    <ul>
      <NavigationItem to="/" isActive>
        Burger Builder
      </NavigationItem>
      <NavigationItem to="/" isActive={false}>
        Checkout
      </NavigationItem>
    </ul>
  </nav>
);

export default NavigationItems;
