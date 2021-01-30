import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";

import NavigationItems from "./NavigationItems";

describe("<NavigationItem />", () => {
  it("Should render 2 <NavigationItem /> elements if not authenticated", () => {
    render(<NavigationItems isAuthenticated={false} />, {
      wrapper: BrowserRouter,
    });
    const navigationItems = screen.getAllByRole("listitem");
    expect(navigationItems).toHaveLength(2);
  });

  it("Should render 3 <NavigationItem /> elements if authenticated", () => {
    render(<NavigationItems isAuthenticated={true} />, {
      wrapper: BrowserRouter,
    });
    const navigationItems = screen.getAllByRole("listitem");
    expect(navigationItems).toHaveLength(3);
  });

  it("Should render logout <NavigationItem /> elements if authenticated", () => {
    render(<NavigationItems isAuthenticated={true} />, {
      wrapper: BrowserRouter,
    });
    const logoutNav = screen.getByText("Logout");
    expect(logoutNav).toBeInTheDocument();
  });
});
