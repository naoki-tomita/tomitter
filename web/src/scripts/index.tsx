import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./pages/App";
import { init } from "./utils/I18n";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

async function main() {
  library.add(faTimes);
  await init(navigator.language as "en" | "ja");
  ReactDOM.render(<App />, document.getElementById("app"))
}

main();
