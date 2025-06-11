import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { cn } from "~/lib/utils";

interface DurationInputProps {
  value?: number;
  onChange: (value: number | undefined) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
}

export function DurationInput({
  value,
  onChange,
  min = 0,
  max = 12,
  disabled,
  className,
}: DurationInputProps) {
  const [flag, setFlag] = useState(false);
  const [prevDigit, setPrevDigit] = useState("0");

  useEffect(() => {
    if (flag) {
      const timer = setTimeout(() => setFlag(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [flag]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      return;
    }

    if (e.key >= "0" && e.key <= "9") {
      e.preventDefault();
      let newValue: number;

      if (!flag) {
        // First digit, store it temporarily
        setPrevDigit(e.key);
        newValue = parseInt(e.key, 10);
      } else {
        // Combine with previous digit
        newValue = parseInt(prevDigit + e.key, 10);
      }

      // Clamp between min and max
      if (newValue > max) newValue = max;
      if (newValue < min) newValue = min;

      onChange(newValue);
      setFlag(!flag);
    }
  };

  return (
    <Input
      type="text"
      inputMode="numeric"
      value={value === undefined ? "" : value}
      onKeyDown={handleKeyDown}
      onChange={() => {}}
      disabled={disabled}
      className={cn(
        "w-[48px] text-center font-mono text-base tabular-nums focus:outline-none focus:ring focus:ring-accent caret-black appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
        className
      )}
    />
  );
}
