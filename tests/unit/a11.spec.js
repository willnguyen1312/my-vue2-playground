import { render } from "@testing-library/vue";

import A11y from "./components/A11y.vue";
import { testA11y } from "../a11y";

test("Button should pass a11y test", async () => {
  const { container } = render(A11y);
  await testA11y(container);
});
