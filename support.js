"use strict";

// Legacy compatibility shim.
// The project runtime now lives in main.js.
(() => {
  if (window.__altinoMainLoaded) {
    return;
  }
  const script = document.createElement("script");
  script.src = "./main.js";
  document.head.appendChild(script);
})();
