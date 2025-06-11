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
  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            variant={"outline"}
            className={cn(
              "w-[200px] justify-start text-left font-normal",
              !value && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon />
            {value ? format(value, "PPP") : <span>Pilih tanggal</span>}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="z-[100] w-auto p-0 pointer-events-auto"
          align="start"
        >
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => {
              if (date && onChange) onChange(date);
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
