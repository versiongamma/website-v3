import { createServerOnlyFn } from "@tanstack/react-start";
import { logger } from "../logger";

export const fetch = createServerOnlyFn(
  async <T extends object>(
    url: string,
    options: {
      params?: URLSearchParams;
      headers?: Headers;
      body?: RequestInit["body"];
      fetchOptions?: Omit<RequestInit, "headers" | "body">;
    } = {},
  ): Promise<T> => {
    const { params, headers, body: reqBody, fetchOptions } = options;
    const urlWithParams = params ? `${url}?${params.toString()}` : url;

    logger
      .withMetadata({
        url,
        params: Object.fromEntries([...(params?.entries() ?? [])]),
        body: reqBody,
        headers,
        fetchOptions,
      })
      .info("Fetch Request");

    const response = await globalThis.fetch(urlWithParams, {
      ...fetchOptions,
      body: reqBody,
      headers,
    });
    const resBody = await response.json();

    logger
      .withMetadata({
        status: response.status,
        length: JSON.stringify(resBody).length,
        body: resBody,
      })
      .info("Fetch Response");

    return resBody;
  },
);
