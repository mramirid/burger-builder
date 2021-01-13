import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import { BurgerBuilder } from "./BurgerBuilder";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";

configure({
  adapter: new Adapter(),
});

jest.mock("react-redux", () => ({
  useDispatch: () => {},
  useSelector: () => ({ ingredientCounts: {} }),
}));

describe("<BurgerBuilder />", () => {
  it("Should render <BuildControls /> when receiving ingredients", () => {
    const wrapper = shallow(<BurgerBuilder />);
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
