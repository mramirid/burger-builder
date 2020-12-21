import { FC } from "react";

import classes from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";

interface ToolbarProps {}

const Toolbar: FC<ToolbarProps> = (props) => (
  <header className={classes.Toolbar}>
    <div>MENU</div>
    <Logo />
    <nav>...</nav>
  </header>
);

export default Toolbar;
