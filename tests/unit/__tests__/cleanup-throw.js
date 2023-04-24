import { render, cleanup } from "@testing-library/vue";
import Vue from "vue";

test("cleanup re-throws errors from async lifecycle hooks", async () => {
  const err = new Error("foo");
  render({
    async mounted() {
      await new Promise((resolve, reject) => {
        reject(err);
      });
    },
    template: `<h1>Hello World</h1>`,
  });
  // thrown errors are logged redundantly by vue-test-utils injected Vue.config.errorHandler
  // mute console
  const spy = jest.spyOn(console, "error").mockImplementation(() => {});

  await Vue.nextTick();
  expect(cleanup).toThrow(err);

  // unmute console
  spy.mockReset();
});
