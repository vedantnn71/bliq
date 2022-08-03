import scriptSrc from "./script?script&module";

const script = document.createElement("script");

script.src = chrome.runtime.getURL(scriptSrc);
script.type = "module";

script.addEventListener("load", () => {
  console.log("bliq loaded");
});

script.addEventListener("error", (error) => {
  console.log("bliq error");
  console.error(error);
});

console.log("starting bliq");
document.head.append(script);
