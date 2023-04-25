import { render, waitForElementToBeRemoved } from "@testing-library/vue";
import Disappearance from "./components/Disappearance";

test("waits for the data to be loaded", async () => {
  jest.useFakeTimers();
  const { getByText, queryByText, queryByTestId } = render(Disappearance);

  // Assert initial state
  expect(getByText("Loading...")).toBeInTheDocument();
  expect(queryByText(/Loaded this message/)).not.toBeInTheDocument();

  jest.runAllTimers();

  // Following line reads as follows:
  // "Wait until element with text 'Loading...' is gone."
  await waitForElementToBeRemoved(queryByText("Loading..."));
  // It is equivalent to:
  //
  // await waitFor(() => {
  //   expect(queryByText('Loading...')).not.toBeInTheDocument()
  // })

  // After 'Loading...' is gone, we can assert that fetched data is rendered.
  expect(queryByTestId("message")).toHaveTextContent(/Hello World/);

  // Read more about async utilities:
  // https://testing-library.com/docs/dom-testing-library/api-async

  jest.useRealTimers();
});
