let IdempotencyStore = [];
/**
 * Rough Idempontency
 * @param {Event} event
 */
const handleRequest = async event => {
  const IdempotencyKey = event.request.headers.get("Idempotency-Key");

  if (!IdempotencyKey || IdempotencyStore.includes(IdempotencyKey)) {
    return new Response("error");
  }

  IdempotencyStore.push(IdempotencyKey);
  if (IdempotencyStore.length > 1000) IdempotencyStore.splice(0, 50);
  return new Response("success");
};

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});
