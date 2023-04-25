import axios from "axios";
import { render, screen } from "@testing-library/vue";
import HelloWorld from "@/components/HelloWorld.vue";
import { mockAxios } from "../axiosMock";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    render(HelloWorld, {
      propsData: { msg },
    });

    expect(
      screen.getByRole("heading", {
        name: /new message/i,
      })
    ).toBeInTheDocument();
  });

  it("should mock axios properly", async () => {
    mockAxios.onGet("/users").replyOnce(200, {
      users: [{ id: 1, name: "John Smith" }],
    });

    const result = await axios.get("/users");
    expect(result.data).toMatchInlineSnapshot(`
      {
        "users": [
          {
            "id": 1,
            "name": "John Smith",
          },
        ],
      }
    `);
  });
});
