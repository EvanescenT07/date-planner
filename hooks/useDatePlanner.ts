"use client";

import { useState, useEffect, useCallback } from "react";
import { PlannerData, PlannerStep } from "@/types/planner";
import { INITIAL_PLANNER_DATA, SESSION_STORAGE_KEY } from "@/lib/constants";

interface StoredSession {
  introAccepted?: boolean;
  step: PlannerStep;
  data: PlannerData;
}

export interface UseDatePlannerReturn {
  introAccepted: boolean;
  step: PlannerStep;
  data: PlannerData;
  isHydrated: boolean;
  canProceed: boolean;
  acceptIntro: () => void;
  next: () => void;
  back: () => void;
  goToStep: (targetStep: PlannerStep) => void;
  updateField: <K extends keyof PlannerData>(field: K, value: PlannerData[K]) => void;
  reset: () => void;
}

/**
 * Reusable hook managing the multi-step romantic date planner state.
 * Implements session storage persistence, URL query pre-filling,
 * intro decision gating, and step validation rules.
 */
export function useDatePlanner(): UseDatePlannerReturn {
  const [introAccepted, setIntroAccepted] = useState<boolean>(false);
  const [step, setStep] = useState<PlannerStep>(0);
  const [data, setData] = useState<PlannerData>(INITIAL_PLANNER_DATA);
  const [isHydrated, setIsHydrated] = useState(false);

  // Restore state from sessionStorage on client mount & check URL prefill
  useEffect(() => {
    try {
      // 1. Check for URL prefill e.g. ?name=Iqbal
      const params = new URLSearchParams(window.location.search);
      const urlName = params.get("name");

      // 2. Check for existing session in sessionStorage
      const rawStored = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (rawStored) {
        const parsed = JSON.parse(rawStored) as StoredSession;
        if (parsed && typeof parsed.step === "number" && parsed.data) {
          setIntroAccepted(Boolean(parsed.introAccepted));
          setStep(parsed.step);
          setData({
            ...parsed.data,
            name: urlName ? urlName : parsed.data.name,
          });
          setIsHydrated(true);
          return;
        }
      }

      if (urlName) {
        setData((prev) => ({ ...prev, name: urlName }));
      }
    } catch (err) {
      if (err instanceof DOMException || err instanceof SyntaxError) {
        console.warn("Could not read planner session storage:", err.message);
      }
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Persist state to sessionStorage whenever introAccepted, step or data updates
  useEffect(() => {
    if (!isHydrated) return;

    try {
      if (!introAccepted && step === 0 && !data.name.trim()) {
        window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
        return;
      }
      const sessionPayload: StoredSession = { introAccepted, step, data };
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionPayload));
    } catch (err) {
      if (err instanceof DOMException) {
        console.warn("Could not persist planner session to storage:", err.message);
      }
    }
  }, [introAccepted, step, data, isHydrated]);

  const acceptIntro = useCallback(() => {
    setIntroAccepted(true);
  }, []);

  const updateField = useCallback(
    <K extends keyof PlannerData>(field: K, value: PlannerData[K]) => {
      setData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const canProceed = useCallback((): boolean => {
    switch (step) {
      case 0:
        return data.name.trim().length > 0;
      case 1:
        return data.date.trim().length > 0;
      case 2:
        return data.time.trim().length > 0;
      case 3:
        return data.food.trim().length > 0;
      case 4:
        return data.activity.trim().length > 0;
      case 5:
        // Note is optional
        return true;
      case 6:
        return true;
      default:
        return false;
    }
  }, [step, data]);

  const next = useCallback(() => {
    setStep((prev) => {
      if (prev < 6) {
        return (prev + 1) as PlannerStep;
      }
      return prev;
    });
  }, []);

  const back = useCallback(() => {
    setStep((prev) => {
      if (prev > 0) {
        return (prev - 1) as PlannerStep;
      }
      return prev;
    });
  }, []);

  const goToStep = useCallback((targetStep: PlannerStep) => {
    if (targetStep >= 0 && targetStep <= 6) {
      setStep(targetStep);
    }
  }, []);

  const reset = useCallback(() => {
    setData(INITIAL_PLANNER_DATA);
    setStep(0);
    setIntroAccepted(false);
    try {
      window.sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch (err) {
      if (err instanceof DOMException) {
        console.warn("Could not remove planner session:", err.message);
      }
    }
  }, []);

  return {
    introAccepted,
    step,
    data,
    isHydrated,
    canProceed: canProceed(),
    acceptIntro,
    next,
    back,
    goToStep,
    updateField,
    reset,
  };
}

export default useDatePlanner;
