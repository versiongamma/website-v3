import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import TanStackQueryProvider, { getContext } from "../root-provider";

describe("getContext", () => {
  beforeEach(() => {
    // The context is module-scoped — reset it between tests so each one starts fresh.
    vi.resetModules();
  });

  it("returns an object with a queryClient", async () => {
    const { getContext: freshGetContext } = await import("../root-provider");
    const ctx = freshGetContext();
    expect(ctx).toHaveProperty("queryClient");
    expect(ctx.queryClient).toBeDefined();
  });

  it("returns the same QueryClient instance on subsequent calls (singleton)", async () => {
    const { getContext: freshGetContext } = await import("../root-provider");
    const a = freshGetContext();
    const b = freshGetContext();
    expect(a).toBe(b);
    expect(a.queryClient).toBe(b.queryClient);
  });

  it("the QueryClient exposes the standard query/mutation cache APIs", async () => {
    const { getContext: freshGetContext } = await import("../root-provider");
    const { queryClient } = freshGetContext();
    expect(typeof queryClient.getQueryCache).toBe("function");
    expect(typeof queryClient.getMutationCache).toBe("function");
  });
});

describe("TanStackQueryProvider", () => {
  it("renders its children", () => {
    render(
      <TanStackQueryProvider>
        <div data-testid="child">hello</div>
      </TanStackQueryProvider>,
    );
    expect(screen.getByTestId("child")).toHaveTextContent("hello");
  });

  it("uses the singleton QueryClient from getContext", () => {
    const { queryClient } = getContext();
    expect(queryClient).toBeDefined();

    // Render the provider — should not throw and should use the same client.
    render(
      <TanStackQueryProvider>
        <span>x</span>
      </TanStackQueryProvider>,
    );
    expect(getContext().queryClient).toBe(queryClient);
  });

  it("renders multiple children unchanged", () => {
    render(
      <TanStackQueryProvider>
        <span data-testid="a">A</span>
        <span data-testid="b">B</span>
      </TanStackQueryProvider>,
    );
    expect(screen.getByTestId("a")).toHaveTextContent("A");
    expect(screen.getByTestId("b")).toHaveTextContent("B");
  });
});
