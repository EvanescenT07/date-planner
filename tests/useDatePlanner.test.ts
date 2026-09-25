import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDatePlanner } from "@/hooks/useDatePlanner";
import { SESSION_STORAGE_KEY } from "@/lib/constants";

describe("useDatePlanner Hook", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("should initialize at step 0 with empty planner data", () => {
    const { result } = renderHook(() => useDatePlanner());

    expect(result.current.step).toBe(0);
    expect(result.current.data.name).toBe("");
    expect(result.current.data.date).toBe("");
    expect(result.current.canProceed).toBe(false);
  });

  it("should update planner fields correctly", () => {
    const { result } = renderHook(() => useDatePlanner());

    act(() => {
      result.current.updateField("name", "Sophia");
    });

    expect(result.current.data.name).toBe("Sophia");
    expect(result.current.canProceed).toBe(true);
  });

  it("should advance and reverse through steps", () => {
    const { result } = renderHook(() => useDatePlanner());

    expect(result.current.step).toBe(0);

    act(() => {
      result.current.next();
    });
    expect(result.current.step).toBe(1);

    act(() => {
      result.current.next();
    });
    expect(result.current.step).toBe(2);

    act(() => {
      result.current.back();
    });
    expect(result.current.step).toBe(1);
  });

  it("should allow navigating directly to a valid step using goToStep", () => {
    const { result } = renderHook(() => useDatePlanner());

    act(() => {
      result.current.goToStep(4);
    });

    expect(result.current.step).toBe(4);
  });

  it("should reset planner state and clear sessionStorage on reset()", () => {
    const { result } = renderHook(() => useDatePlanner());

    act(() => {
      result.current.updateField("name", "Sophia");
      result.current.next();
    });

    expect(result.current.step).toBe(1);
    expect(result.current.data.name).toBe("Sophia");

    act(() => {
      result.current.reset();
    });

    expect(result.current.step).toBe(0);
    expect(result.current.data.name).toBe("");
    expect(window.sessionStorage.getItem(SESSION_STORAGE_KEY)).toBeNull();
  });
});
