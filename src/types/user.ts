export type User = {
  __typename?: "User";
  id: string;
  name: string;
  email: string;
};

export type GetUsersData = {
  users: User[];
};

export interface CreateUserData {
  createUser: {
    __typename?: "CreateUserPayload";
    user: User | null;
    errors: string[];
  };
}

export interface CreateUserVariables {
  name: string;
  email: string;
}
