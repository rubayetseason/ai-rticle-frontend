import { render, screen, fireEvent } from "@testing-library/react";
import SearchForm from "../SearchForm";

// Mock useRouter
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    back: jest.fn(),
    forward: jest.fn(),
    refresh: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// Mock sonner (toast)
jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
  },
}));

describe("SearchForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("navigates to /explore/[searchTerm] on submit", () => {
    render(<SearchForm />);

    const input = screen.getByPlaceholderText(/search for topics/i);
    const form = input.closest("form");

    fireEvent.change(input, { target: { value: "react hooks" } });
    fireEvent.submit(form!);

    expect(mockPush).toHaveBeenCalledWith("/explore/react%20hooks");
  });

  it("shows error toast when search query is empty", () => {
    const { toast } = require("sonner");

    render(<SearchForm />);
    const input = screen.getByPlaceholderText(/search for topics/i);
    const form = input.closest("form");

    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.submit(form!);

    expect(toast.error).toHaveBeenCalledWith(
      "Please enter a valid search term."
    );
    expect(mockPush).not.toHaveBeenCalled();
  });
});
