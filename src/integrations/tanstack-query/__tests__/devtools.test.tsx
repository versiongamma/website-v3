import { render } from "@testing-library/react";
import { isValidElement } from "react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@tanstack/react-query-devtools", () => ({
  ReactQueryDevtoolsPanel: () => (
    <div data-testid="rq-devtools-panel" />
  ),
}));

import devtools from "../devtools";

describe("devtools default export", () => {
  it("has the expected name", () => {
    expect(devtools.name).toBe("Tanstack Query");
  });

  it("exposes a render React element", () => {
    expect(isValidElement(devtools.render)).toBe(true);
  });

  it("renders the ReactQueryDevtoolsPanel", () => {
    const { getByTestId } = render(devtools.render);
    expect(getByTestId("rq-devtools-panel")).toBeInTheDocument();
  });

  it("only exposes the name and render fields", () => {
    expect(Object.keys(devtools).sort()).toEqual(["name", "render"]);
  });
});
