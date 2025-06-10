"use client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { Calendar } from "~/components/ui/calendar";
import { useEffect, useState } from "react";

// Modif
interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  disabled?: boolean;
  className?: string;
}

export function DatePicker({
  value,
  onChange,
  disabled,
  className,
}: DatePickerProps) {
  const [date, setDate] = useState<Date | undefined>(value);

  useEffect(() => {
    setDate(value);
  }, [value]);

  const handleSelectDate = (selected: Date | undefined) => {
    if (!selected) return;
    if (onChange) onChange(selected);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          // value={date ? date.toISOString().split("T")[0] : ""}
          variant={"outline"}
          className={cn(
            "w-[200px] justify-start text-left font-normal",
            !date && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelectDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
