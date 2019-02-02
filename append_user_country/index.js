addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Fetch and log a given request object
 * @param {Request} request
 */
async function handleRequest(request) {
  let url = new URL(request.url);
  let params = new URLSearchParams(url.search.slice(1));
  params.append('country', request.headers.get("cf-ipcountry"));
  url.search = params;
  return fetch(url)
}