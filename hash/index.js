async function hashTo(message, digest) {
  // hash the message digest(SHA-1 SHA-256 SHA-384 SHA-512)
  const msgBuffer = new TextEncoder('utf-8').encode(message);
  const hashBuffer = await crypto.subtle.digest(digest, msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
  return hashHex;
}

async function handleRequest(event) {
  const parsedUrl = new URL(event.request.url);
  const str = parsedUrl.pathname.replace('/', '');
  let result = {
    sha1: await hashTo(str, 'SHA-1'),
    sha256: await hashTo(str, 'SHA-256'),
    sha384: await hashTo(str, 'SHA-384'),
    sha512: await hashTo(str, 'SHA-512')
  }

  const responseInit = {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*'
    }
  };

  return new Response(JSON.stringify(result), responseInit)
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event));
});