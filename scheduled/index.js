const handleRequest = async event => {
  return new Response("success fetch");
};

const handleScheduled = async event => {
  console.log("success trigger");
};

addEventListener("fetch", event => event.respondWith(handleRequest(event)));
addEventListener("scheduled", event => event.waitUntil(handleScheduled(event)));
