export default {
  async fetch(request, env, ctx) {
    try {
      return await handleRequest(request, env, ctx);
    } catch (e) {
      console.log(e);
      return new Response(e.message);
    }
  },
  async scheduled(event, env) {
    try {
      return await handleScheduled(event, env, ctx);
    } catch (e) {
      console.log(e);
      return new Response(e.message);
    }
  }
};

const handleRequest = async (request, env, ctx) => {
  return new Response("success fetch");
};

const handleScheduled = async (event, env, ctx) => {
  console.log("success trigger");
};
