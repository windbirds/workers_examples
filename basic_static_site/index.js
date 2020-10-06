const static_site = async event => {
  const cache_time = 3600;
  const parsedUrl = new URL(event.request.url);
  let path = parsedUrl.pathname;

  let lastSegment = path.substring(path.lastIndexOf("/"));
  if (lastSegment.indexOf(".") === -1) path += "/index.html";

  return await fetch(
    "https://windbirds.ams.digitaloceanspaces.com/static/" + path,
    {
      cf: {
        cacheTtlByStatus: {
          "200-299": cache_time,
          404: 1,
          "500-599": -1
        },
        apps: false,
        minify: {
          javascript: true,
          css: true,
          html: true
        }
      }
    }
  );
};

addEventListener("fetch", event => event.respondWith(static_site(event)));
