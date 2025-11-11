import "preact/debug";
import { createElement } from "preact";
import { hydrate, prerender as ssr } from "preact-iso";
import App from "./app";

import "./i18n";

if (typeof window !== "undefined") {
  hydrate(
    createElement(App, {}),
    document.getElementById("app") as HTMLElement
  );
}

export async function prerender(data: any) {
  return await ssr(createElement(App, data));
}
