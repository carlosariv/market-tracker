import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AuthProvider, useAuth } from "../components/AuthContext";

function Consumer() {
  const { isAuthenticated, login, logout } = useAuth();
  return (
    <div>
      <span data-testid="status">{isAuthenticated ? "in" : "out"}</span>
      <button onClick={() => login("alice", "hunter2")}>login-correct</button>
      <button onClick={() => login("alice", "wrong")}>login-wrong</button>
      <button onClick={() => logout()}>logout</button>
    </div>
  );
}

function renderConsumer() {
  return render(
    <AuthProvider>
      <Consumer />
    </AuthProvider>
  );
}

describe("AuthContext", () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  it("rejects login when no account is registered", () => {
    renderConsumer();
    fireEvent.click(screen.getByText("login-correct"));
    expect(screen.getByTestId("status").textContent).toBe("out");
  });

  it("accepts login with the matching stored username/password", () => {
    localStorage.setItem("username", "alice");
    localStorage.setItem("password", "hunter2");
    renderConsumer();

    fireEvent.click(screen.getByText("login-correct"));

    expect(screen.getByTestId("status").textContent).toBe("in");
  });

  it("rejects login with a wrong password", () => {
    localStorage.setItem("username", "alice");
    localStorage.setItem("password", "hunter2");
    renderConsumer();

    fireEvent.click(screen.getByText("login-wrong"));

    expect(screen.getByTestId("status").textContent).toBe("out");
  });

  it("logout clears the authenticated state", () => {
    localStorage.setItem("username", "alice");
    localStorage.setItem("password", "hunter2");
    renderConsumer();

    fireEvent.click(screen.getByText("login-correct"));
    fireEvent.click(screen.getByText("logout"));

    expect(screen.getByTestId("status").textContent).toBe("out");
  });
});
