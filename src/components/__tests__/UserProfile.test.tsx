import userEvent from "@testing-library/user-event";
import { render, screen, within } from "../../test-utils";
import UserProfile from "../UserProfile";
import { UserProvider } from "../../context/UserContext";

describe("UserProfile", () => {
  it("renders the default user name and email", () => {
    render(
      <UserProvider>
        <UserProfile />
      </UserProvider>
    );

    expect(screen.getByText("Harsh")).toBeInTheDocument();
    expect(screen.getByText("harsh@example.com")).toBeInTheDocument();
  });

  it("updates name when input is filled and button is clicked", async () => {
    render(
      <UserProvider>
        <UserProfile />
      </UserProvider>
    );

    const input = screen.getByPlaceholderText("Enter new name");
    await userEvent.type(input, "harsh k");

    const nameField = screen.getByText("Update Name").closest("div")!;
    await userEvent.click(within(nameField).getByRole("button", { name: "Update" }));

    expect(screen.getByText("harsh k")).toBeInTheDocument();
  });
});
