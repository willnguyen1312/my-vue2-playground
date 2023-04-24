import { render, screen, fireEvent } from "@testing-library/vue";
import { shallowMount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    render(HelloWorld, {
      propsData: { msg },
    });
    // expect(wrapper.text()).toMatch(msg);
    expect(
      screen.getByRole("heading", {
        name: /new message/i,
      })
    ).toBeInTheDocument();
  });
});
