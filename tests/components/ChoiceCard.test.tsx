import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ChoiceCard } from "@/components/ui/ChoiceCard";

describe("ChoiceCard Component", () => {
  it("should render card title and description", () => {
    render(
      <ChoiceCard
        id="sushi"
        title="Sushi Night"
        description="Fresh salmon rolls"
        selected={false}
        onSelect={vi.fn()}
      />
    );

    expect(screen.getByText("Sushi Night")).toBeInTheDocument();
    expect(screen.getByText("Fresh salmon rolls")).toBeInTheDocument();
  });

  it("should fire onSelect with card ID when clicked", () => {
    const handleSelect = vi.fn();
    render(
      <ChoiceCard
        id="arcade"
        title="Arcade Games"
        selected={false}
        onSelect={handleSelect}
      />
    );

    fireEvent.click(screen.getByRole("radio"));
    expect(handleSelect).toHaveBeenCalledWith("arcade");
  });

  it("should have correct accessibility attributes when selected", () => {
    const { rerender } = render(
      <ChoiceCard
        id="sunset"
        title="Sunset Walk"
        selected={false}
        onSelect={vi.fn()}
      />
    );

    expect(screen.getByRole("radio")).toHaveAttribute("aria-checked", "false");

    rerender(
      <ChoiceCard
        id="sunset"
        title="Sunset Walk"
        selected={true}
        onSelect={vi.fn()}
      />
    );

    expect(screen.getByRole("radio")).toHaveAttribute("aria-checked", "true");
  });
});
