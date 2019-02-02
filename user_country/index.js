addEventListener('fetch', event => {
  event.respondWith(handleRequest(event));
});

async function handleRequest(event) {
  const responseInit = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    }
  };

  const body = {
    country: event.request.headers.get('cf-ipcountry').toLowerCase()
  }

  return new Response(JSON.stringify(body), responseInit)
}