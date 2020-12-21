import { FC } from "react";

import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";

const Layout: FC = (props) => (
  <>
    <Toolbar />
    <main className={classes.Content}>{props.children}</main>
  </>
);

export default Layout;
