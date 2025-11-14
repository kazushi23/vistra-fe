import { GraphQLClient } from "graphql-request";

const endpoint = `${process.env.NEXT_PUBLIC_API_BASE_URL}/graphql`;
const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

export const client = new GraphQLClient(endpoint, {
  headers: {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
});
