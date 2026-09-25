import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProgressHearts } from "@/components/ui/ProgressHearts";

describe("ProgressHearts Component", () => {
  it("should render progressbar with correct accessibility attributes", () => {
    render(<ProgressHearts currentStep={3} totalSteps={5} />);

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toBeInTheDocument();
    expect(progressbar).toHaveAttribute("aria-valuenow", "3");
    expect(progressbar).toHaveAttribute("aria-valuemin", "1");
    expect(progressbar).toHaveAttribute("aria-valuemax", "5");
    expect(progressbar).toHaveAttribute("aria-label", "Progress: step 3 of 5");
  });
});
