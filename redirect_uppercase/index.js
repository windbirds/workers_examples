const handleRequest = async event => {
  const lowerCase = event.request.url.toLowerCase();
  if (event.request.url !== lowerCase) {
    return Response.redirect(lowerCase, 301);
  }
  return await fetch(event.request);
};

addEventListener("fetch", event => event.respondWith(handleRequest(event)));
