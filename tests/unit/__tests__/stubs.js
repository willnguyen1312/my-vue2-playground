import { render } from "@testing-library/vue";

import Stubs from "./components/Stubs";

test("Form contains search button", () => {
  const { getByText } = render(Stubs, {
    stubs: ["FontAwesomeIcon"],
  });
  expect(getByText("Search now")).toBeInTheDocument();
});
