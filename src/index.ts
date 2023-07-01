import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
//import { Http2Server } from "node:http2";

const server: FastifyInstance = Fastify({});

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          pong: {
            type: "string",
          },
        },
      },
    },
  },
};

server.get("/ping", opts, async (_request, _reply) => {
  return { pong: "it worked!" };
});

const start = async () => {
  try {
    await server.listen({ port: parseInt(process.env["PORT"] || "3050") });

    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
    console.log(`API running on port ${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
