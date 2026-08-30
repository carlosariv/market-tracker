import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import RegisterPage from "../pages/login/RegisterPage";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

function setup() {
  return render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>
  );
}

function fillAndSubmit(username: string, password: string, confirm = password) {
  fireEvent.change(screen.getByLabelText(/^username/i), { target: { value: username } });
  fireEvent.change(screen.getByLabelText(/^password:/i), { target: { value: password } });
  fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: confirm } });
  fireEvent.click(screen.getByRole("button", { name: /log in/i }));
}

describe("RegisterPage validation", () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  it("rejects an empty username", () => {
    setup();
    fillAndSubmit("", "Abcdefg1!");
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });

  it("rejects a password shorter than 8 characters", () => {
    setup();
    fillAndSubmit("alice", "Ab1!");
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });

  it("rejects a password with no uppercase letter", () => {
    setup();
    fillAndSubmit("alice", "abcdefg1!");
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });

  it("rejects mismatched password confirmation", () => {
    setup();
    fillAndSubmit("alice", "Abcdefg1!", "Different1!");
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
  });

  it("accepts a valid password, stores it, and navigates to /login", () => {
    setup();
    fillAndSubmit("alice", "Abcdefg1!");

    expect(localStorage.getItem("username")).toBe("alice");
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
