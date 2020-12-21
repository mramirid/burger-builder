import { FC } from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems: FC = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem to="/" isActive>
      Burger Builder
    </NavigationItem>
    <NavigationItem to="/" isActive={false}>
      Checkout
    </NavigationItem>
  </ul>
);

export default NavigationItems;
