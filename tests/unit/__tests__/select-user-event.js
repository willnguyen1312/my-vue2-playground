import "@testing-library/jest-dom";
import { render } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import Select from "./components/Select";

beforeEach(() => {
  jest.spyOn(console, "warn").mockImplementation(() => {
    // Do nothing
  });
});

afterEach(() => {
  console.warn.mockRestore();
});

test("selecting option with user events", async () => {
  const { getByDisplayValue } = render(Select);
  const select = getByDisplayValue("Tyrannosaurus");
  expect(select.value).toBe("dino1");

  await userEvent.selectOptions(select, "dino2");
  expect(select.value).toBe("dino2");

  await userEvent.selectOptions(select, "dino3");
  expect(select.value).not.toBe("dino2");
  expect(select.value).toBe("dino3");
});
