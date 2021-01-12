import { configure, shallow, ShallowWrapper } from "enzyme";
import EnzymeAdapter from "@wojtekmaj/enzyme-adapter-react-17";

import NavigationItems, { NavigationItemsProps } from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({
  adapter: new EnzymeAdapter(),
});

describe("<NavigationItem />", () => {
  let wrapper: ShallowWrapper<NavigationItemsProps>;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems isAuthenticated={false} />);
  });

  it("Should render 2 <NavigationItem /> elements if not authenticated", () => {
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("Should render 3 <NavigationItem /> elements if authenticated", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it("Should render logout <NavigationItem /> elements if authenticated", () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(
      wrapper.contains(<NavigationItem to="/logout">Logout</NavigationItem>)
    ).toEqual(true);
  });
});
