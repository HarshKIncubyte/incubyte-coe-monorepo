export type User = {
  id: string;
  name: string;
  email: string;
};

export type GetUsersData = {
  users: User[];
};

export interface CreateUserData {
  createUser: {
    user: {
      id: string;
      name: string;
      email: string;
    } | null;
    errors: string[];
  };
}

export interface CreateUserVariables {
  name: string;
  email: string;
}
