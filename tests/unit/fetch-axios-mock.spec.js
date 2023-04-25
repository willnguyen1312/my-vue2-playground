import { render, screen } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { mockAxios } from "../axiosMock";
import Component from "./components/Fetch.vue";

test.only("mocks an API call when load-greeting is clicked", async () => {
  mockAxios.onGet("/greeting").replyOnce(200, {
    data: { greeting: "Hello there" },
  });
  const user = userEvent.setup();

  const { html } = render(Component, {
    props: { url: "/greeting" },
  });

  // Test loading state, no need to await
  user.click(screen.getByText("Fetch"));

  expect(await screen.findByText("Loading")).toBeInTheDocument();

  expect(await screen.findByText("Hello there")).toBeInTheDocument();

  // You can render component snapshots by using html(). However, bear in mind
  // that Snapshot Testing should not be treated as a replacement for regular
  // tests.
  // More about the topic: https://twitter.com/searls/status/919594505938112512
  expect(html()).toMatchInlineSnapshot(`
    <div><button>Fetch</button> <span>
        Hello there
      </span>
      <!---->
    </div>
  `);
});
