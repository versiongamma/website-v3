import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

const navigate = vi.fn();
vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => navigate,
}));

vi.mock("~/hooks/useOnComponentMount", () => ({
  useOnComponentMount: (cb: () => void) => {
    cb();
  },
}));

vi.mock("../InputCaret", () => ({
  default: ({ show }: { show: boolean }) => (
    <div data-testid="input-caret" data-show={String(show)} />
  ),
}));

import InputField from "../InputField";

const renderInputField = () => {
  const ref = createRef<HTMLInputElement>();
  return {
    ref,
    ...render(<InputField inputRef={ref} />),
  };
};

describe("InputField", () => {
  it("renders the prompt prefix", () => {
    renderInputField();
    expect(screen.getByText(/versiongamma\.com/)).toBeInTheDocument();
  });

  it("renders a text input with id 'input'", () => {
    renderInputField();
    const input = document.getElementById("input") as HTMLInputElement;
    expect(input).not.toBeNull();
    expect(input.tagName).toBe("INPUT");
    expect(input.type).toBe("text");
  });

  it("attaches the inputRef to the input element", () => {
    const { ref } = renderInputField();
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.id).toBe("input");
  });

  it("focuses the input on mount via useOnComponentMount", () => {
    const { ref } = renderInputField();
    // useOnComponentMount mock fires the callback synchronously, which calls focus().
    expect(document.activeElement).toBe(ref.current);
  });

  it("renders InputCaret with show=true initially", () => {
    renderInputField();
    expect(screen.getByTestId("input-caret")).toHaveAttribute(
      "data-show",
      "true",
    );
  });

  it("hides the caret on input blur", () => {
    const { ref } = renderInputField();
    expect(screen.getByTestId("input-caret")).toHaveAttribute(
      "data-show",
      "true",
    );

    fireEvent.blur(ref.current!);
    expect(screen.getByTestId("input-caret")).toHaveAttribute(
      "data-show",
      "false",
    );
  });

  it("shows the caret again on focus after blur", () => {
    const { ref } = renderInputField();
    fireEvent.blur(ref.current!);
    expect(screen.getByTestId("input-caret")).toHaveAttribute(
      "data-show",
      "false",
    );
    fireEvent.focus(ref.current!);
    expect(screen.getByTestId("input-caret")).toHaveAttribute(
      "data-show",
      "true",
    );
  });

  it("calls navigate with the typed path on submit", async () => {
    navigate.mockClear();
    const { ref } = renderInputField();

    await userEvent.type(ref.current!, "/photo");
    await userEvent.keyboard("{Enter}");

    expect(navigate).toHaveBeenCalledWith({ to: "/photo" });
  });

  it("submits an empty path when the input is empty", async () => {
    navigate.mockClear();
    const { ref } = renderInputField();

    ref.current?.focus();
    await userEvent.keyboard("{Enter}");

    expect(navigate).toHaveBeenCalledWith({ to: "" });
  });

  it("applies font-mono and text-lg classes to the wrapper", () => {
    const { container } = renderInputField();
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("font-mono");
    expect(wrapper).toHaveClass("text-lg");
  });
});
