// import * as xstatic from "./static.js";
const xstatic = require("./static.js").default;

addEventListener("fetch", (event) => {
  const path = new URL(event.request.url).pathname.slice(1);
  const file = xstatic[path];
  const response = new Response(file.data, {
    headers: {
      "content-type": file.mime,
    },
  });
  event.respondWith(response);
});
