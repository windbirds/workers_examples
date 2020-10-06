/**
 * Purge Cache for Cloudflare Zone
 * @param {string} zone - zone to purge
 * @param {string} key - API key
 */
const purgeCache = async (zone, key) => {
  let response = await fetch(
    `https://api.cloudflare.com/client/v4/zones/${zone}/purge_cache`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json"
      },
      body: '{"purge_everything":true}'
    }
  );
  let data = await response.json();
  return data.success;
};

const handleRequest = async () =>
  new Response(await purgeCache("1234abcdf", "39123013adf"), { status: 200 });

addEventListener("fetch", event => event.respondWith(handleRequest()));
