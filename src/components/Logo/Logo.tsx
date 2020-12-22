import { FC } from "react";

import classes from "./Logo.module.css";
import burgerLogo from "../../assets/images/burger-logo.png";

const Logo: FC = () => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="Burger Builder" />
  </div>
);

export default Logo;
