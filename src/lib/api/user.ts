import {client} from "../graphql/client";
import { UserData } from "../types/user.types";

const GET_USERS = `
  query GetUsers {
    users {
      id
      name
      email
      updatedAt
    }
  }
`;

export async function getUsers(): Promise<UserData[]> {
  try {
    const data = await client.request<{ users: UserData[] }>(GET_USERS);
    console.log(data.users);
    return data.users;
  } catch (err) {
    throw new Error("Failed to retrieve data");
  }
}

