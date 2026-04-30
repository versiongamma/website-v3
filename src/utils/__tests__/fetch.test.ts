import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@tanstack/react-start", () => ({
  createServerOnlyFn: <T>(fn: T) => fn,
}));

const { debug, error, withMetadata } = vi.hoisted(() => {
  const debug = vi.fn();
  const error = vi.fn();
  const withMetadata = vi.fn(() => ({ debug }));
  return { debug, error, withMetadata };
});
vi.mock("../../logger", () => ({
  logger: {
    withMetadata,
    error,
  },
}));

import { fetch as wrappedFetch } from "../fetch";

const originalFetch = globalThis.fetch;

const setFetch = (impl: unknown) => {
  globalThis.fetch = impl as typeof globalThis.fetch;
};

const makeResponse = (body: unknown, opts: { type?: "json" | "text" } = {}) => {
  const isText = opts.type === "text";
  return {
    status: 200,
    json: vi.fn().mockResolvedValue(body),
    text: vi.fn().mockResolvedValue(isText ? body : JSON.stringify(body)),
  } as unknown as Response;
};

describe("fetch wrapper", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it("calls globalThis.fetch with the url when no params are provided", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(makeResponse({ ok: true }));
    setFetch(fetchSpy);

    const result = await wrappedFetch<{ ok: boolean }>("https://example.com");

    expect(fetchSpy).toHaveBeenCalledWith(
      "https://example.com",
      expect.objectContaining({}),
    );
    expect(result).toEqual({ ok: true });
  });

  it("appends URLSearchParams to the url", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(makeResponse({}));
    setFetch(fetchSpy);

    const params = new URLSearchParams({ foo: "bar", baz: "qux" });
    await wrappedFetch("https://example.com", { params });

    expect(fetchSpy).toHaveBeenCalledWith(
      "https://example.com?foo=bar&baz=qux",
      expect.any(Object),
    );
  });

  it("forwards headers, body, and fetchOptions to globalThis.fetch", async () => {
    const fetchSpy = vi.fn().mockResolvedValue(makeResponse({}));
    setFetch(fetchSpy);

    const headers = new Headers({ Authorization: "Bearer token" });
    const body = JSON.stringify({ hello: "world" });
    await wrappedFetch("https://example.com", {
      headers,
      body,
      fetchOptions: { method: "POST" },
    });

    expect(fetchSpy).toHaveBeenCalledWith(
      "https://example.com",
      expect.objectContaining({
        method: "POST",
        headers,
        body,
      }),
    );
  });

  it("parses the response as JSON by default", async () => {
    const payload = { foo: "bar" };
    const response = makeResponse(payload);
    setFetch(vi.fn().mockResolvedValue(response));

    const result = await wrappedFetch<typeof payload>("https://example.com");

    expect(response.json).toHaveBeenCalled();
    expect(result).toEqual(payload);
  });

  it("parses the response as text when type is 'text'", async () => {
    const payload = "raw text body";
    const response = makeResponse(payload, { type: "text" });
    setFetch(vi.fn().mockResolvedValue(response));

    const result = await wrappedFetch<string>("https://example.com", {
      type: "text",
    });

    expect(response.text).toHaveBeenCalled();
    expect(result).toBe(payload);
  });

  it("returns an empty object when fetch errors and type is explicitly JSON", async () => {
    setFetch(vi.fn().mockRejectedValue(new Error("network")));

    const result = await wrappedFetch<Record<string, unknown>>(
      "https://example.com",
      { type: "json" },
    );

    expect(result).toEqual({});
    expect(error).toHaveBeenCalledWith("Fetch Error", expect.any(Error));
  });

  it("returns an empty string when fetch errors and type is text", async () => {
    setFetch(vi.fn().mockRejectedValue(new Error("network")));

    const result = await wrappedFetch<string>("https://example.com", {
      type: "text",
    });

    expect(result).toBe("");
  });

  it("logs the request with metadata before fetching", async () => {
    setFetch(vi.fn().mockResolvedValue(makeResponse({})));

    const params = new URLSearchParams({ a: "1" });
    await wrappedFetch("https://example.com", { params });

    expect(withMetadata).toHaveBeenCalledWith(
      expect.objectContaining({
        url: "https://example.com",
        params: { a: "1" },
      }),
    );
    expect(debug).toHaveBeenCalledWith("Fetch Request");
  });

  it("logs the response with status and length after fetching", async () => {
    const payload = { hello: "world" };
    setFetch(vi.fn().mockResolvedValue(makeResponse(payload)));

    await wrappedFetch("https://example.com");

    expect(withMetadata).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 200,
        body: payload,
        length: JSON.stringify(payload).length,
      }),
    );
    expect(debug).toHaveBeenCalledWith("Fetch Response");
  });

  it("handles missing params object gracefully when logging", async () => {
    setFetch(vi.fn().mockResolvedValue(makeResponse({})));

    await wrappedFetch("https://example.com");

    expect(withMetadata).toHaveBeenCalledWith(
      expect.objectContaining({ params: {} }),
    );
  });
});
