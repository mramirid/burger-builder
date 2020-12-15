import { FC } from "react";

const Layout: FC = (props) => (
  <>
    <div>Toolbar, SideDrawer, Backdrop</div>
    <main>{props.children}</main>
  </>
);

export default Layout;
