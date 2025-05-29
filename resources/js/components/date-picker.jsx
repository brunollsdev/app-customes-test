import React from "react";
import { format, getMonth, getYear, parse, setMonth, setYear } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "./ui/select";

export function DatePicker({ startYear, endYear, value, onChange }) {
    const today = new Date();
    const minYear = startYear ?? getYear(today) - 100;
    const maxYear = endYear ?? getYear(today) + 100;

    if (!(value instanceof Date) && value != undefined) {
        value = new Date(`${value}T00:00:00`)
    }
    
    const date = value instanceof Date && !isNaN(value) ? value : today;

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const years = Array.from(
        { length: maxYear - minYear + 1 },
        (_, i) => minYear + i
    );

    const handleMonthChange = (month) => {
        const newDate = setMonth(date, months.indexOf(month));
        onChange?.(newDate);
    };

    const handleYearChange = (year) => {
        const newDate = setYear(date, parseInt(year));
        onChange?.(newDate);
    };

    const handleSelect = (selectedDate) => {
        if (selectedDate) {
            onChange?.(selectedDate);
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !value && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {value ? format(date, "PPP") : <span>Selecione uma data</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <div className="flex justify-between p-2">
                    <Select
                        onValueChange={handleMonthChange}
                        value={months[getMonth(date)]}
                    >
                        <SelectTrigger className="w-[110px]">
                            <SelectValue placeholder="Month" />
                        </SelectTrigger>
                        <SelectContent>
                            {months.map((month) => (
                                <SelectItem key={month} value={month}>
                                    {month}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select
                        onValueChange={handleYearChange}
                        value={getYear(date).toString()}
                    >
                        <SelectTrigger className="w-[110px]">
                            <SelectValue placeholder="Year" />
                        </SelectTrigger>
                        <SelectContent>
                            {years.map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                    {year}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleSelect}
                    initialFocus
                    month={date}
                    onMonthChange={onChange}
                />
            </PopoverContent>
        </Popover>
    );
}