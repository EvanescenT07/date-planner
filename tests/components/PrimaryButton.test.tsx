import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { PrimaryButton } from "@/components/ui/PrimaryButton";

describe("PrimaryButton Component", () => {
  it("should render children text properly", () => {
    render(<PrimaryButton>Click Me</PrimaryButton>);
    expect(screen.getByRole("button", { name: /click me/i })).toBeInTheDocument();
  });

  it("should trigger onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<PrimaryButton onClick={handleClick}>Submit</PrimaryButton>);

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should not trigger onClick handler when disabled", () => {
    const handleClick = vi.fn();
    render(
      <PrimaryButton onClick={handleClick} disabled>
        Disabled Button
      </PrimaryButton>
    );

    const button = screen.getByRole("button", { name: /disabled button/i });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("should render optional icon", () => {
    render(
      <PrimaryButton icon={<span data-testid="test-icon">★</span>}>
        With Icon
      </PrimaryButton>
    );

    expect(screen.getByTestId("test-icon")).toBeInTheDocument();
  });
});
