import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
// This is the default location for the generator, but this can be customized as described above.
// Using a type only import will help avoid issues with undeclared exports in esm mode
import type PrismaTypes from "./prisma/pothos-types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes;
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
    // defaults to false, uses /// comments from prisma schema as descriptions
    // for object types, relations and exposed fields.
    // descriptions can be omitted by setting description to false
    exposeDescriptions: false,
    // use where clause from prismaRelatedConnection for totalCount (will true by default in next major version)
    filterConnectionTotalCount: true,
  },
});

builder.prismaObject("Verb", {
  fields: (t) => ({
    id: t.exposeID("id"),
    infinitive: t.exposeString("infinitive"),
  }),
});

builder.queryType({
  fields: (t) => ({
    verbs: t.prismaField({
      type: "Verb",
      resolve: async (query, root, args, ctx, info) =>
        prisma.verb.findUniqueOrThrow({
          ...query,
          where: { id: 1 },
        }),
    }),
  }),
});

const schema = builder.toSchema();
const server = new ApolloServer({ schema });

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: parseInt(process.env.PORT || "4000") },
  });
  console.log(`🚀  Server ready at: ${url}`);
};

startServer();
