import { ScheduleItem } from "@/types/schedule";
import DayCell from "./DayCell";

interface Props {
  calendarDays: (number | null)[];
  itemsByDate: Record<string, ScheduleItem[]>;
  selectedDay: string | null;
  onDaySelect: (dateStr: string) => void;
  formatDateString: (day: number) => string;
}

export default function MonthGrid({
  calendarDays,
  itemsByDate,
  selectedDay,
  onDaySelect,
  formatDateString,
}: Props) {
  return (
    <div className="mb-6">
      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center font-semibold text-sm text-slate-600 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => {
          const dateStr = day ? formatDateString(day) : "";
          const dayItems = day ? itemsByDate[dateStr] || [] : [];
          const isSelected = selectedDay === dateStr;

          return (
            <DayCell
              key={index}
              day={day}
              isSelected={isSelected}
              dayItems={dayItems}
              onSelect={() => day && onDaySelect(dateStr)}
            />
          );
        })}
      </div>
    </div>
  );
}
