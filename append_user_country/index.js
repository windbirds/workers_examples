/**
 * Append country
 * @param {Event} event
 */
const handleRequest = async event => {
  let url = new URL(event.request.url);
  let params = new URLSearchParams(url.search.slice(1));
  params.append("country", eventrequest.headers.get("cf-ipcountry"));
  url.search = params;
  return fetch(url);
};

addEventListener("fetch", event => event.respondWith(handleRequest(event)));
