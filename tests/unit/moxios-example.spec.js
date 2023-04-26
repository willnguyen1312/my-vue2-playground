import axios from "axios";
import moxios from "moxios";
import { faker } from "@faker-js/faker";

describe("mocking axios requests", function () {
  describe("across entire suite", function () {
    beforeEach(function () {
      // import and pass your custom axios instance to this method
      moxios.install();
    });

    afterEach(function () {
      // import and pass your custom axios instance to this method
      moxios.uninstall();
    });

    it("stub response for any matching request URL", async function () {
      const mockedData = {
        data: faker.random.numeric(4),
      };
      // Match against an exact URL value
      moxios.stubRequest("GET", "/say/hello", {
        status: 200,
        response: mockedData,
      });

      const result = await axios.get("/say/hello");
      expect(result.data).toEqual(mockedData);
    });
  });
});
