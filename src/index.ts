import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";
import { FastifyInstance } from "fastify";
import { Static, createServer, Type } from "@fastify/type-provider-typebox";

dotenv.config();
const sql = postgres(process.env["DB_URL"] || "missingDB_URL", {});
const db = drizzle(sql);
console.log(db);

const User = Type.Object({
  name: Type.String(),
  age: Type.Number(),
  email: Type.Optional(Type.String({ format: "email" })),
});

const server: FastifyInstance = createServer();
type UserType = Static<typeof User>;
server.get<{ Params: { id: string }; Response: UserType }>(
  "/api/user/:id",
  {
    schema: {
      params: Type.Object({
        id: Type.String(),
      }),
      response: {
        200: User,
      },
    },
  },
  async (request, reply) => {
    // Retrieve the user from the database using request.params.id

    // Here is an example response.
    const response: UserType = {
      name: "Alice",
      age: 25,
      email: "alice@example.com",
    };

    return reply.status(200).send(response);
  }
);

server.get(`/:language/tenses`, opts, async (_request, _reply) => {
  const { userId } = request.params;
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
