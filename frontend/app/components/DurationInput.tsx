import React from "react";
import { Input } from "./ui/input";

interface DurationInputProps {
  value?: number;
  onChange: (value: number | undefined) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export function DurationInput({
  value,
  onChange,
  min = 0,
  max = 12,
  disabled,
}: DurationInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valStr = e.target.value;

    // Izinkan input kosong
    if (valStr === "") {
      onChange(undefined);
      return;
    }

    // Konversi string ke number
    let val = parseInt(valStr, 10);

    if (isNaN(val)) return;

    // Batasi antara min dan max
    if (val < min) val = min;
    if (val > max) val = max;

    onChange(val);
  };

  return (
    <Input
      type="number"
      min={min}
      max={max}
      inputMode="numeric"
      value={value === undefined ? "" : value}
      onChange={handleChange}
      disabled={disabled}
      className="w-[48px] text-center font-mono text-base tabular-nums focus:outline-none focus:ring focus:ring-accent caret-black appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
    />
  );
}
