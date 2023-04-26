import { render, fireEvent } from "@testing-library/vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import VueRouter from "vue-router";

import App from "./components/Router/App.vue";
import Home from "./components/Router/Home.vue";
import About from "./components/Router/About.vue";
import AboutParent from "./components/Router/AboutParent.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "*", redirect: "/about" },
];

test.only("try shallow", async () => {
  const wrapper = shallowMount(AboutParent);
  expect(wrapper.html()).toMatchInlineSnapshot(`
    <div>
      <h1>About Parent</h1>
      <about-stub></about-stub>
    </div>
  `);
});

test("full app rendering/navigating", async () => {
  const localVue = createLocalVue();
  localVue.use(VueRouter);
  const router = new VueRouter();

  // Notice how we pass a `routes` object to our render function.
  const { getByTestId } = render(App, {
    localVue,
    router,
  });

  expect(getByTestId("location-display")).toHaveTextContent("/");

  await fireEvent.click(getByTestId("about-link"));

  expect(getByTestId("location-display")).toHaveTextContent("/about");
});

test("setting initial route", () => {
  // The callback function receives three parameters: the Vue instance where
  // the component is mounted, the store instance (if any) and the router
  // object.
  const { getByTestId } = render(App, { routes }, (vue, store, router) => {
    router.push("/about");
  });

  expect(getByTestId("location-display")).toHaveTextContent("/about");
});

test("can render with an instantiated Vuex store", async () => {
  // Instantiate a router with only one route
  const instantiatedRouter = new VueRouter({
    routes: [{ path: "/special-path", component: Home }],
  });

  render(App, { routes: instantiatedRouter }, (vue, store, router) => {
    expect(router.getRoutes()).toHaveLength(1);
    expect(router.getRoutes()[0].path).toEqual("/special-path");
  });
});
