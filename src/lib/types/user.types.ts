export interface UserData {
    id: number;
    name: string;
    email: string;
    updatedAt: number;
}

export interface GetUsersResponse {
  users: {
    data: UserData[];
    total: number;
    page: number;
    limit: number;
  };
}