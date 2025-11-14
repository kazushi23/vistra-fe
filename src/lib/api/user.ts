import {client} from "../graphql/client";

const GET_USERS = `
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

export async function fetchUsers() {
  try {
    const data = await client.request<{ users: { id: string; name: string; email: string }[] }>(GET_USERS);
    console.log(data.users);
    return data.users;
  } catch (err) {
    console.error(err);
  }
}
