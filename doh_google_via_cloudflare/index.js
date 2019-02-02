addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  const name = url.searchParams.get('name')
  const type = url.searchParams.get('type')
  if (type == null || type == '') {
    return new Response('type is missing', {
      status: 406,
      statusText: 'Not Acceptable'
    })
  } else if (name == null || name == '') {
    return new Response('name is missing', {
      status: 406,
      statusText: 'Not Acceptable'
    })
  }
  const response = await fetch('https://cloudflare-dns.com/dns-query?name=' + name + '&type=' + type + '&ct=application/dns-json')
  const responseInit = {
    headers: {
      'Content-Type': 'application/x-javascript; charset=UTF-8',
      'Access-Control-Allow-Origin': '*'
    }
  };
  return new Response(response.body, responseInit)
}