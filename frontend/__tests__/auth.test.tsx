import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { signIn } from "next-auth/react";
import { act } from "react";
import "@testing-library/jest-dom";
import SignIn from "@/src/app/sign-in/page";
import SignUp from "@/src/app/sign-up/page";
import SignInForm from "@/src/components/sign-in/sign-in-form";
import SignUpForm from "@/src/components/sign-up/sign-up-form";

describe("Authentication", () => {
  beforeEach(() => {
    (signIn as jest.Mock).mockClear();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    ) as jest.Mock;
  });

  describe("Sign In Page", () => {
    test("renders sign-in page with form", async () => {
      await act(async () => {
        render(<SignIn />);
      });
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    test("handles credential sign-in at page level", async () => {
      await act(async () => {
        render(<SignIn />);
      });

      await act(async () => {
        fireEvent.change(screen.getByLabelText(/email/i), {
          target: { value: "test@example.com" },
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
          target: { value: "password123" },
        });
        fireEvent.click(screen.getByRole("button", { name: /sign in/i }));
      });

      await waitFor(() => {
        expect(signIn).toHaveBeenCalledWith("credentials", expect.any(Object));
      });
    });
  });

  describe("Sign Up Page", () => {
    test("renders sign-up page with form", () => {
      render(<SignUp />);
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    test("handles user registration at page level", async () => {
      const mockFetch = jest.fn();
      global.fetch = mockFetch;
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ message: "User created successfully" }),
      });

      render(<SignUp />);

      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: "test@example.com" },
      });
      fireEvent.change(screen.getByLabelText(/password/i), {
        target: { value: "password123" },
      });

      fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith("/api/auth/sign-up", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "test@example.com",
            password: "password123",
          }),
        });
      });
    });
  });

  describe("SignInForm Component", () => {
    test("renders sign in form with all elements", () => {
      render(<SignInForm />);
      expect(screen.getByText("Sign in to your account")).toBeInTheDocument();
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
      expect(screen.getByLabelText("Password")).toBeInTheDocument();
    });

    test("handles successful sign in submission", async () => {
      (signIn as jest.Mock).mockResolvedValueOnce({ error: null });
      render(<SignInForm />);

      fireEvent.change(screen.getByLabelText("Email"), {
        target: { value: "test@example.com" },
      });
      fireEvent.change(screen.getByLabelText("Password"), {
        target: { value: "password123" },
      });
      fireEvent.click(screen.getByText("Sign In"));

      await waitFor(() => {
        expect(signIn).toHaveBeenCalledWith("credentials", {
          email: "test@example.com",
          password: "password123",
          redirect: false,
        });
      });
    });

    test("handles sign in error state", async () => {
      (signIn as jest.Mock).mockResolvedValueOnce({
        error: "Invalid credentials",
      });
      render(<SignInForm />);

      fireEvent.change(screen.getByLabelText("Email"), {
        target: { value: "test@example.com" },
      });
      fireEvent.change(screen.getByLabelText("Password"), {
        target: { value: "wrongpassword" },
      });
      fireEvent.click(screen.getByText("Sign In"));

      await waitFor(() => {
        expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
      });
    });

    test("handles GitHub social sign in", () => {
      render(<SignInForm />);
      fireEvent.click(screen.getByText("GitHub"));
      expect(signIn).toHaveBeenCalledWith("github", {
        callbackUrl: "http://localhost:3000/home",
      });
    });
  });

  describe("SignUpForm Component", () => {
    test("renders sign up form with all elements", () => {
      render(<SignUpForm />);
      expect(screen.getByText("Create a new account")).toBeInTheDocument();
      expect(screen.getByLabelText("Email")).toBeInTheDocument();
      expect(screen.getByLabelText("Password")).toBeInTheDocument();
    });

    test("handles successful sign up submission", async () => {
      render(<SignUpForm />);

      fireEvent.change(screen.getByLabelText("Email"), {
        target: { value: "test@example.com" },
      });
      fireEvent.change(screen.getByLabelText("Password"), {
        target: { value: "password123" },
      });
      fireEvent.click(screen.getByText("Sign Up"));

      await waitFor(() => {
        expect(signIn).toHaveBeenCalledWith("credentials", {
          email: "test@example.com",
          password: "password123",
          callbackUrl: "/home",
        });
      });
    });

    test("handles sign up error state", async () => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          ok: false,
          text: () => Promise.resolve("Email already exists"),
        })
      ) as jest.Mock;

      render(<SignUpForm />);

      fireEvent.change(screen.getByLabelText("Email"), {
        target: { value: "test@example.com" },
      });
      fireEvent.change(screen.getByLabelText("Password"), {
        target: { value: "password123" },
      });
      fireEvent.click(screen.getByText("Sign Up"));

      await waitFor(() => {
        expect(screen.getByText("Email already exists")).toBeInTheDocument();
      });
    });

    test("handles GitHub social sign up", () => {
      render(<SignUpForm />);
      fireEvent.click(screen.getByText("GitHub"));
      expect(signIn).toHaveBeenCalledWith("github", {
        callbackUrl: "http://localhost:3000/home",
      });
    });
  });
});
