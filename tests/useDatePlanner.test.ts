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
    expect(result.current.introAccepted).toBe(false);
    expect(result.current.data.name).toBe("");
    expect(result.current.data.date).toBe("");
    expect(result.current.canProceed).toBe(false);
  });

  it("should accept intro and update introAccepted state", () => {
    const { result } = renderHook(() => useDatePlanner());

    expect(result.current.introAccepted).toBe(false);

    act(() => {
      result.current.acceptIntro();
    });

    expect(result.current.introAccepted).toBe(true);
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

  it("should reset planner state, introAccepted, and clear sessionStorage on reset()", () => {
    const { result } = renderHook(() => useDatePlanner());

    act(() => {
      result.current.acceptIntro();
      result.current.updateField("name", "Sophia");
      result.current.next();
    });

    expect(result.current.introAccepted).toBe(true);
    expect(result.current.step).toBe(1);
    expect(result.current.data.name).toBe("Sophia");

    act(() => {
      result.current.reset();
    });

    expect(result.current.introAccepted).toBe(false);
    expect(result.current.step).toBe(0);
    expect(result.current.data.name).toBe("");
    expect(window.sessionStorage.getItem(SESSION_STORAGE_KEY)).toBeNull();
  });

  it("should restore introAccepted from sessionStorage on mount", () => {
    const savedSession = {
      introAccepted: true,
      step: 2,
      data: {
        name: "Sophia",
        date: "2026-10-14",
        time: "19:00",
        food: "italian",
        activity: "picnic",
        note: "Wear something warm",
      },
    };
    window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(savedSession));

    const { result } = renderHook(() => useDatePlanner());

    expect(result.current.introAccepted).toBe(true);
    expect(result.current.step).toBe(2);
    expect(result.current.data.name).toBe("Sophia");
  });
});
