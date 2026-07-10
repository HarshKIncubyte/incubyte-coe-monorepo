import { render, screen, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing/react";
import UsersPage from "../UsersPage";
import { GET_USERS } from "../../graphql/queries/users";

const mocks = [
  {
    request: { query: GET_USERS },
    result: {
      data: {
        users: [
          { id: "1", name: "Test User 1", email: "test1@example.com" },
          { id: "2", name: "Test User 2", email: "test2@example.com" },
        ],
      },
    },
  },
];

describe("UsersPage", () => {
  it("shows loading state initially", () => {
    render(
      <MockedProvider mocks={mocks}  >
        <UsersPage />
      </MockedProvider>
    );

    expect(screen.getByText("Loading users...")).toBeInTheDocument();
  });

  it("renders users after data is fetched", async () => {
    render(
      <MockedProvider mocks={mocks}  >
        <UsersPage />
      </MockedProvider>
    );

    await waitFor(() => {
      // ✅ test what mock returns, not real DB data
      expect(screen.getByText("Test User 1")).toBeInTheDocument();
      expect(screen.getByText("test1@example.com")).toBeInTheDocument();
      expect(screen.getByText("Test User 2")).toBeInTheDocument();
    });
  });

  it("renders empty state when no users exist", async () => {
    const emptyMock = [
      {
        request: { query: GET_USERS },
        result: { data: { users: [] } },
      },
    ];

    render(
      <MockedProvider mocks={emptyMock}  >
        <UsersPage />
      </MockedProvider>
    );

    await waitFor(() => {
      // ✅ test the empty state message
      expect(screen.getByText("No users found.")).toBeInTheDocument();
    });
  });

  it("renders error state when query fails", async () => {
    const errorMock = [
      {
        request: { query: GET_USERS },
        error: new Error("Failed to fetch users"),
      },
    ];

    render(
      <MockedProvider mocks={errorMock}  >
        <UsersPage />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Error: Failed to fetch users")).toBeInTheDocument();
    });
  });
});
