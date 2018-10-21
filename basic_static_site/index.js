addEventListener('fetch', event => {
  event.respondWith(static_site(event.request))
})

async function static_site(request) {
  const parsedUrl = new URL(request.url)
  let path = parsedUrl.pathname

  let lastSegment = path.substring(path.lastIndexOf('/'))
  if (lastSegment.indexOf('.') === -1)
    path += '/index.html'

  return fetch("https://windbirds.ams.digitaloceanspaces.com/static/" + path)
}
