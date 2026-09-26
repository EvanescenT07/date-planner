import React, { createRef } from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { EscapeButton } from "@/components/planner/EscapeButton";

describe("EscapeButton Component", () => {
  it("renders with default label and accessibility attributes", () => {
    const containerRef = createRef<HTMLDivElement>();
    render(
      <div ref={containerRef}>
        <EscapeButton containerRef={containerRef}>No</EscapeButton>
      </div>
    );

    const button = screen.getByRole("button", { name: /no/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("aria-label", "No");
  });

  it("triggers evasion and fires onEscape callback on click/tap", () => {
    const containerRef = createRef<HTMLDivElement>();
    const onEscapeMock = vi.fn();

    render(
      <div ref={containerRef}>
        <EscapeButton containerRef={containerRef} onEscape={onEscapeMock}>
          No
        </EscapeButton>
      </div>
    );

    const button = screen.getByRole("button", { name: /no/i });
    fireEvent.click(button);

    expect(onEscapeMock).toHaveBeenCalledTimes(1);
  });

  it("respects cooldown threshold and avoids duplicate triggers in rapid succession", () => {
    const containerRef = createRef<HTMLDivElement>();
    const onEscapeMock = vi.fn();

    render(
      <div ref={containerRef}>
        <EscapeButton containerRef={containerRef} cooldownMs={300} onEscape={onEscapeMock}>
          No
        </EscapeButton>
      </div>
    );

    const button = screen.getByRole("button", { name: /no/i });
    fireEvent.click(button);
    fireEvent.click(button);

    // Because of the 300ms cooldown, the second immediate click is throttled
    expect(onEscapeMock).toHaveBeenCalledTimes(1);
  });
});
