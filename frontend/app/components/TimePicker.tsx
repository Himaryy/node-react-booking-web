"use client";

import React from "react";
import { TimePickerInput } from "~/components/ui/TimePickerInput";
import { cn } from "~/lib/utils";

interface TimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  disabled?: boolean;
  className?: string;
  inputClassName?: string;
}

export function TimePicker({
  date,
  setDate,
  disabled,
  className,
  inputClassName,
}: TimePickerProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {/* <Label htmlFor="hours" className="text-xs">
        Hour
      </Label> */}
      <div className="grid gap-1 text-center">
        <TimePickerInput
          placeholder="HH"
          picker="hours"
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
          disabled={disabled}
          className={inputClassName}
        />
      </div>
      <p>:</p>
      <div className="grid gap-1 text-center">
        {/* <Label htmlFor="minutes" className="text-xs ">
          Minute
        </Label> */}
        <TimePickerInput
          picker="minutes"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          onRightFocus={() => secondRef.current?.focus()}
          disabled={disabled}
          className={inputClassName}
        />
      </div>
    </div>
  );
}
