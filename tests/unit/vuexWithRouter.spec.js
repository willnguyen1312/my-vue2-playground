import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/vue";
import _ from "lodash";
import Vue from "vue";
import Vuex from "vuex";

import VuexTest from "./components/Store/VuexTest";
import { store } from "./components/Store/store";

import App from "./components/Router/App.vue";
import Home from "./components/Router/Home.vue";
import About from "./components/Router/About.vue";

// A common testing pattern is to create a custom renderer for a specific test
// file. This way, common operations such as registering a Vuex store can be
// abstracted out while avoiding sharing mutable state.
//
// Tests should be completely isolated from one another.
// Read this for additional context: https://kentcdodds.com/blog/test-isolation-with-react
function renderVuexTestComponent(customStore) {
  const routes = [
    { path: "/", component: Home },
    { path: "/about", component: About },
    { path: "/store", component: VuexTest },
    { path: "*", redirect: "/about" },
  ];
  const user = userEvent.setup();
  // Render the component and merge the original store and the custom one
  // provided as a parameter. This way, we can alter some behaviors of the
  // initial implementation.
  return {
    ...render(App, {
      store: { ..._.cloneDeep(store), ...customStore },
      routes,
    }),
    user,
  };
}

test("full app rendering", async () => {
  // Notice how we pass a `routes` object to our render function.
  const { getByTestId, user } = renderVuexTestComponent();

  expect(getByTestId("location-display")).toHaveTextContent("/");

  await user.click(getByTestId("store-link"));

  // screen.logTestingPlaygroundURL();
  expect(screen.getByText(/\/store/i)).toBeInTheDocument();
  // expect(getByTestId("location-display")).toHaveTextContent("/store");

  await user.click(screen.getByText("+"));
  await user.click(screen.getByText("+"));

  expect(getByTestId("count-value")).toHaveTextContent("2");
});

test("can render with vuex with defaults", async () => {
  const { getByTestId, getByText, user } = renderVuexTestComponent();
  await user.click(getByTestId("store-link"));
  await user.click(getByText("+"));

  expect(getByTestId("count-value")).toHaveTextContent("1");
});

test("can render with vuex with custom initial state", async () => {
  const { getByTestId, getByText, user } = renderVuexTestComponent({
    state: { count: 3 },
  });
  await user.click(getByTestId("store-link"));
  await user.click(getByText("-"));

  expect(getByTestId("count-value")).toHaveTextContent("2");
});

test("can render with vuex with custom store", async () => {
  // This is a silly store that can never be changed.
  const store = {
    state: { count: 1000 },
    actions: {
      increment: () => jest.fn(),
      decrement: () => jest.fn(),
    },
  };

  const { getByTestId, getByText } = render(VuexTest, { store });
  const user = userEvent.setup();

  await user.click(getByText("+"));
  expect(getByTestId("count-value")).toHaveTextContent("1000");

  await user.click(getByText("-"));
  expect(getByTestId("count-value")).toHaveTextContent("1000");
});

test("can render with an instantiated Vuex store", async () => {
  // Before calling new Vuex.Store in your code, you'll need to `.use` it on the
  // global (or local) Vue instance. In frameworks like Jest, the `setupFilesAfterEnv`
  // property is a good place to do this.
  // https://jestjs.io/docs/configuration#setupfilesafterenv-array
  Vue.use(Vuex);

  const { getByTestId, getByText } = render(VuexTest, {
    store: new Vuex.Store({
      state: { count: 3 },
      mutations: {
        increment(state) {
          state.count++;
        },
        decrement(state) {
          state.count--;
        },
      },
      actions: {
        increment(context) {
          context.commit("increment");
        },
        decrement(context) {
          context.commit("decrement");
        },
      },
    }),
  });

  const user = userEvent.setup();

  await user.click(getByText("+"));
  expect(getByTestId("count-value")).toHaveTextContent("4");

  await user.click(getByText("-"));
  expect(getByTestId("count-value")).toHaveTextContent("3");
});
