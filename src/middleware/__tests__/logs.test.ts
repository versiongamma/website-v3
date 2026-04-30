import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@tanstack/react-start", () => ({
  // The chain is `createMiddleware({...}).server(handler)`. We want the handler
  // back so we can call it directly in tests.
  createMiddleware: () => ({
    server: <T>(handler: T) => handler,
  }),
}));

const { debug, info, error, withMetadata } = vi.hoisted(() => {
  const debug = vi.fn();
  const info = vi.fn();
  const error = vi.fn();
  const chain = { debug, info, error };
  const withMetadata = vi.fn((_metadata: Record<string, unknown>) => chain);
  return { debug, info, error, withMetadata };
});
vi.mock("~/logger", () => ({
  logger: { withMetadata, info, error },
}));

import {
  functionLoggerMiddleware,
  requestLoggerMiddleware,
} from "../logs";

describe("requestLoggerMiddleware", () => {
  beforeEach(() => {
    withMetadata.mockClear();
    info.mockClear();
    debug.mockClear();
  });

  const makeRequest = (
    overrides: Partial<{ url: string; method: string; headers: Headers }> = {},
  ) =>
    ({
      url: "https://example.com/api/x",
      method: "GET",
      headers: new Headers({ "x-test": "1", "user-agent": "vitest" }),
      ...overrides,
    }) as unknown as Request;

  it("logs request metadata at info level", async () => {
    const next = vi.fn().mockResolvedValue("next-result");
    const handler = requestLoggerMiddleware as unknown as (ctx: {
      request: Request;
      next: () => unknown;
    }) => unknown;

    await handler({ request: makeRequest(), next });

    expect(withMetadata).toHaveBeenCalledTimes(1);
    expect(info).toHaveBeenCalledWith("Request: ", "https://example.com/api/x");
  });

  it("includes the url and serialised headers in the metadata", async () => {
    const next = vi.fn();
    const request = makeRequest({
      url: "https://example.com/test",
      headers: new Headers({ "content-type": "application/json" }),
    });
    const handler = requestLoggerMiddleware as unknown as (ctx: {
      request: Request;
      next: () => unknown;
    }) => unknown;

    await handler({ request, next });

    const metadata = withMetadata.mock.calls[0]![0];
    expect(metadata.url).toBe("https://example.com/test");
    expect(metadata.headers).toEqual({ "content-type": "application/json" });
  });

  it("returns the result of next() so the chain continues", async () => {
    const next = vi.fn().mockResolvedValue({ ok: true });
    const handler = requestLoggerMiddleware as unknown as (ctx: {
      request: Request;
      next: () => unknown;
    }) => Promise<unknown>;

    const result = await handler({ request: makeRequest(), next });

    expect(next).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ ok: true });
  });

  it("logs even when next() throws (next is called regardless)", async () => {
    const boom = new Error("downstream");
    const next = vi.fn().mockRejectedValue(boom);
    const handler = requestLoggerMiddleware as unknown as (ctx: {
      request: Request;
      next: () => unknown;
    }) => Promise<unknown>;

    await expect(
      handler({ request: makeRequest(), next }),
    ).rejects.toBe(boom);
    expect(info).toHaveBeenCalledWith("Request: ", "https://example.com/api/x");
  });
});

describe("functionLoggerMiddleware", () => {
  beforeEach(() => {
    withMetadata.mockClear();
    info.mockClear();
  });

  it("logs the context (minus next) at info level with label 'Server Function'", async () => {
    const next = vi.fn().mockResolvedValue(undefined);
    const handler = functionLoggerMiddleware as unknown as (ctx: {
      next: () => unknown;
      [k: string]: unknown;
    }) => unknown;

    await handler({
      next,
      functionId: "myFn",
      data: { key: "value" },
      serverFnMeta: { name: "myFn" },
    });

    expect(withMetadata).toHaveBeenCalledWith({
      functionId: "myFn",
      data: { key: "value" },
      serverFnMeta: { name: "myFn" },
    });
    expect(info).toHaveBeenCalledWith("Server Function: ", "myFn");
  });

  it("returns the result of next()", async () => {
    const next = vi.fn().mockResolvedValue("result");
    const handler = functionLoggerMiddleware as unknown as (ctx: {
      next: () => unknown;
      [k: string]: unknown;
    }) => Promise<unknown>;

    const result = await handler({ next, serverFnMeta: { name: "myFn" } });
    expect(next).toHaveBeenCalled();
    expect(result).toBe("result");
  });

  it("does not include `next` in the logged metadata", async () => {
    const next = vi.fn();
    const handler = functionLoggerMiddleware as unknown as (ctx: {
      next: () => unknown;
      [k: string]: unknown;
    }) => unknown;

    await handler({ next, foo: 1, serverFnMeta: { name: "myFn" } });

    const metadata = withMetadata.mock.calls[0]![0];
    expect(metadata).not.toHaveProperty("next");
    expect(metadata).toEqual({ foo: 1, serverFnMeta: { name: "myFn" } });
  });
});
