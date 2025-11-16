import {client} from "../graphql/client";
import { GetUsersResponse, UserData } from "../types/user.types";

const GET_USERS = `
  query GetUsers($page: Int, $limit: Int, $filter: UserFilter, $sort: UserSort) {
    users(page: $page, limit: $limit, filter: $filter, sort: $sort) {
      data {
        id
        name
        email
        updatedAt
      }
      total
      page
      limit
    }
  }
`;

export async function getUsers(
  page = 1,
  limit = 10,
  search?: string,
  sortField?: string,
  sortOrder: "asc" | "desc" = "asc"
): Promise<GetUsersResponse> {
  try {
    const variables = {
      page,
      limit,
      filter: search ? { search } : undefined,
      sort: sortField ? { field: sortField, order: sortOrder } : undefined,
    };

    const data = await client.request<GetUsersResponse>(GET_USERS, variables);

    return data;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to retrieve data");
  }
}

