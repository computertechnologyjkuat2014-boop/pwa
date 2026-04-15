"use client";
import { ScheduleItem } from "@/types/schedule";
import { useState } from "react";
import MonthHeader from "./MonthHeader";
import MonthGrid from "./MonthGrid";
import EventList from "./EventList";

interface Props {
  items: ScheduleItem[];
  onDelete: (id: string) => Promise<void>;
}

const date = new Date();
const formatted = date.toISOString().split("T")[0];

export default function ScheduleDisplay({ items, onDelete }: Props) {
  const [selectedDay, setSelectedDay] = useState<string | null>(formatted);
  const [currentMonth, setCurrentMonth] = useState(
    new Date(selectedDay || formatted),
  );

  // Get all days in the current month
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
  console.log("firstDayOfMonth", firstDayOfMonth);

  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Create day grid with empty cells for days before month starts
  const calendarDays = [...Array(firstDayOfMonth).fill(null), ...monthDays];

  // Group items by date
  const itemsByDate = items.reduce(
    (acc, item) => {
      if (!acc[item.date]) acc[item.date] = [];
      acc[item.date].push(item);
      return acc;
    },
    {} as Record<string, ScheduleItem[]>,
  );

  // Get items for selected day
  const selectedDayItems = selectedDay
    ? itemsByDate[selectedDay]?.sort((a, b) =>
        a.startTime.localeCompare(b.startTime),
      ) || []
    : [];

  const formatDateString = (day: number) => {
    const dateObj = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      day,
    );
    return dateObj.toISOString().split("T")[0];
  };

  const previousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
    );
    setSelectedDay(null);
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
    );
    setSelectedDay(null);
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
      <MonthHeader
        currentMonth={currentMonth}
        selectedDay={selectedDay}
        selectedDayItems={selectedDayItems.length}
        onPreviousMonth={previousMonth}
        onNextMonth={nextMonth}
      />

      <div className="p-6">
        <MonthGrid
          calendarDays={calendarDays}
          itemsByDate={itemsByDate}
          selectedDay={selectedDay}
          onDaySelect={setSelectedDay}
          formatDateString={formatDateString}
        />

        {selectedDay && (
          <EventList
            selectedDay={selectedDay}
            items={selectedDayItems}
            onDelete={onDelete}
          />
        )}
      </div>
    </div>
  );
}
