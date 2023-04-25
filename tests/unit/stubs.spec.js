import { render, screen } from "@testing-library/vue";

import Stubs from "./components/Stubs";

test("Form contains search button", () => {
  render(Stubs, {
    stubs: ["FontAwesomeIcon"],
  });

  expect(screen.getByText("Search now")).toBeInTheDocument();
});

test("Form contains stubbed icon", () => {
  const StubComponent = {
    render(h) {
      return h("p", "I'm stubbed");
    },
  };

  render(Stubs, {
    stubs: {
      FontAwesomeIcon: StubComponent,
    },
  });

  expect(screen.getByText("I'm stubbed")).toBeInTheDocument();
});
