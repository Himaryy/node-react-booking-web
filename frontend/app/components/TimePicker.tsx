"use client";

import React from "react";
// import { Label } from "~/components/ui/label";
import { TimePickerInput } from "~/components/ui/TimePickerInput";
import { cn } from "~/lib/utils";

interface TimePickerProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  disabled?: boolean;
  className?: string;
}

export function TimePicker({
  date,
  setDate,
  disabled,
  className,
}: TimePickerProps) {
  const minuteRef = React.useRef<HTMLInputElement>(null);
  const hourRef = React.useRef<HTMLInputElement>(null);
  const secondRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center gap-2">
      {/* <Label htmlFor="hours" className="text-xs">
        Hour
      </Label> */}
      <div className={cn("grid gap-1 text-center", className)}>
        <TimePickerInput
          placeholder="HH"
          picker="hours"
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
          disabled={disabled}
        />
      </div>
      <p>:</p>
      <div className={cn("grid gap-1 text-center", className)}>
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
        />
      </div>
      {/* <div className="grid gap-1 text-center">
        <Label htmlFor="seconds" className="text-xs">
          Seconds
        </Label>
        <TimePickerInput
          picker="seconds"
          date={date}
          setDate={setDate}
          ref={secondRef}
          onLeftFocus={() => minuteRef.current?.focus()}
        />
      </div> */}
      {/* <div className="flex h-10 items-center">
        <Clock className="ml-2 h-4 w-4" />
      </div> */}
    </div>
  );
}
