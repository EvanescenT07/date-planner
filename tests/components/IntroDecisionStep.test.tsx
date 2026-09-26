import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { IntroDecisionStep } from "@/components/planner/IntroDecisionStep";

const mockPlay = vi.fn().mockResolvedValue(undefined);

vi.mock("@/components/music/MusicProvider", () => ({
  useMusic: () => ({
    play: mockPlay,
  }),
}));

describe("IntroDecisionStep Component", () => {
  it("renders romantic heading, subtitle, and both YES and NO buttons on initial question stage", () => {
    render(<IntroDecisionStep onAccept={vi.fn()} />);

    expect(screen.getByText(/Can I ask you something\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Promise you'll answer honestly/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /yes/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /no/i })).toBeInTheDocument();
  });

  it("transitions to celebratory screen on YES click and proceeds to planner on 'okay okay!' click", async () => {
    const onAcceptMock = vi.fn();
    render(<IntroDecisionStep onAccept={onAcceptMock} />);

    const yesButton = screen.getByRole("button", { name: /yes/i });
    fireEvent.click(yesButton);

    // Should trigger music playback immediately
    expect(mockPlay).toHaveBeenCalled();

    // Should display the celebratory reaction screen matching mockup
    await waitFor(() => {
      expect(screen.getByText(/HUH\?\? you said yes\?\?/i)).toBeInTheDocument();
      expect(screen.getByText(/okay i need a minute to process this/i)).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /okay okay!/i })).toBeInTheDocument();
    });

    // Clicking the proceed button calls onAccept
    const proceedButton = screen.getByRole("button", { name: /okay okay!/i });
    fireEvent.click(proceedButton);

    expect(onAcceptMock).toHaveBeenCalledTimes(1);
  });
});
