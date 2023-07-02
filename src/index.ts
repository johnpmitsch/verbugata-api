import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

require("dotenv").config();

const sql = postgres(process.env["DB_URL"] || "missingDB_URL", {});
const db = drizzle(sql);
console.log(db);

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
    console.log("hi");
    await server.listen({ port: parseInt(process.env["PORT"] || "3050") });

    const address = server.server.address();
    const port = typeof address === "string" ? address : address?.port;
    console.log(`API running on port ${port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
