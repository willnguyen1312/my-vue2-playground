import { axe, toHaveNoViolations } from "jest-axe";
expect.extend(toHaveNoViolations);

export async function testA11y(element: HTMLElement) {
  const results = await axe(element as HTMLElement);
  expect(results).toHaveNoViolations();
}
