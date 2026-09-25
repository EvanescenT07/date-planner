"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

/**
 * Romantic input field with 20px rounded pill corners,
 * smooth focus transitions, and clear error indications.
 */
export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, icon, className, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full text-left">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-medium text-[var(--text-secondary)] mb-1.5 ml-1"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {icon && (
            <div className="pointer-events-none absolute left-4 text-[var(--primary)]">
              {icon}
            </div>
          )}

          <input
            id={inputId}
            ref={ref}
            className={cn(
              "w-full px-5 py-3.5 text-base text-[var(--text-primary)]",
              "bg-white/90 rounded-[20px] border border-[var(--border)]",
              "placeholder:text-[var(--text-secondary)]/50",
              "transition-all duration-200 outline-none",
              "focus:border-[var(--primary)] focus:bg-white focus:ring-4 focus:ring-[var(--accent)]/50",
              "shadow-[inset_0_2px_4px_rgba(231,143,179,0.04)]",
              icon ? "pl-11" : "pl-5",
              error && "border-red-400 focus:border-red-500 focus:ring-red-100",
              className
            )}
            {...props}
          />
        </div>

        {error && (
          <p className="mt-1.5 ml-2 text-xs text-rose-500 font-medium">
            {error}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
