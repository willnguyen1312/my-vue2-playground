import { mount } from "@vue/test-utils";
import { waitFor } from "@testing-library/vue";

import TimeOut from "./components/TimeOut";
import { navigationTarget } from "../shared";

let lastLocation = window.location;

beforeEach(() => {
  jest.useFakeTimers();
  delete window.location;
  window.location = { assign: jest.fn() };
  // Avoid showing error logs in the console
  // [vue-test-utils]: overwriting methods via the `methods` property is deprecated and will be removed in the next major version
  jest.spyOn(console, "error").mockImplementation(() => {
    // Do nothing
  });
});

afterEach(() => {
  window.location = lastLocation;
  jest.useRealTimers();
  console.error.mockRestore();
});

// In this test file we showcase several ways to interact with a Select element.
test("TimeOut component should work as expected", async () => {
  const wrapper = mount(TimeOut, {
    methods: {
      apiCall: jest.fn().mockResolvedValue(),
    },
  });

  await wrapper.vm.$nextTick();
  jest.runAllTimers();

  await waitFor(() => expect(window.location.href).toBe(navigationTarget));
});
