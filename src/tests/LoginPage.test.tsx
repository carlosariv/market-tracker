import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";

const mockNavigate = vi.fn();
const mockLogin = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

vi.mock("../components/AuthContext", () => ({
  useAuth: () => ({ login: mockLogin }),
}));

function setup() {
  return render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );
}

describe("LoginPage", () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    mockLogin.mockReset();
  });

  it("lets the user type into the username and password fields", () => {
    setup();
    const username = screen.getByLabelText(/username/i) as HTMLInputElement;
    const password = screen.getByLabelText(/password/i) as HTMLInputElement;

    fireEvent.change(username, { target: { value: "alice" } });
    fireEvent.change(password, { target: { value: "hunter2" } });

    expect(username.value).toBe("alice");
    expect(password.value).toBe("hunter2");
  });

  it("navigates to /markets on successful login", () => {
    mockLogin.mockReturnValue(true);
    setup();

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "alice" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "hunter2" } });
    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(mockLogin).toHaveBeenCalledWith("alice", "hunter2");
    expect(mockNavigate).toHaveBeenCalledWith("/markets");
  });

  it("shows an error and does not navigate on failed login", () => {
    mockLogin.mockReturnValue(false);
    setup();

    fireEvent.click(screen.getByRole("button", { name: /log in/i }));

    expect(screen.getByText(/invalid username or password/i)).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
