import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import SchemaBuilder from "@pothos/core";

type Verb = {
  infinitive: string;
};

const Verbs = [
  {
    infinitive: "ser",
  },
  {
    infinitive: "estar",
  },
];

const builder = new SchemaBuilder<{ Objects: { Verb: Verb } }>({});

builder.objectType("Verb", {
  description: "This is a verb",
  fields: (t) => ({
    infinitive: t.exposeString("infinitive", {}),
  }),
});

builder.queryType({
  fields: (t) => ({
    verb: t.field({
      args: {
        infinitive: t.arg.string({ required: true }),
      },
      type: "Verb",
      resolve: (parent, { infinitive }) =>
        // TODO: how to return nothing?
        Verbs.find((v) => v.infinitive === infinitive) || {
          infinitive: "not found",
        },
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
