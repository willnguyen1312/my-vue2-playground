import { mount } from "@vue/test-utils";

import TimeOut from "./components/TimeOut";
import { navigationTarget } from "../shared";

// The window.location object is readonly in test environment so we need to mock it
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
  jest.restoreAllMocks();
});

test("TimeOut component should work as expected", async () => {
  const wrapper = mount(TimeOut, {
    methods: {
      apiCall: jest.fn().mockResolvedValue(),
    },
  });

  await wrapper.vm.$nextTick();
  jest.runAllTimers();

  expect(window.location.href).toBe(navigationTarget);
});
