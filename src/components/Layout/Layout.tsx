import { FC } from "react";

import classes from "./Layout.module.css";

const Layout: FC = (props) => (
  <>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main className={classes.Content}>{props.children}</main>
  </>
);

export default Layout;
