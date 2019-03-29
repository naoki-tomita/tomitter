import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./pages/App";
import { init } from "./utils/I18n";

async function main() {
  await init(navigator.language as "en" | "ja");
  ReactDOM.render(<App />, document.getElementById("app"))
}

main();
