import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  currentMonth: Date;
  selectedDay: string | null;
  selectedDayItems: number;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

export default function MonthHeader({
  currentMonth,
  selectedDay,
  selectedDayItems,
  onPreviousMonth,
  onNextMonth,
}: Props) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-slate-200">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-slate-800">
          {currentMonth.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={onPreviousMonth}
            className="p-2 hover:bg-blue-200 rounded-lg transition-colors"
            title="Previous month"
          >
            <ChevronLeft className="w-5 h-5 text-slate-600" />
          </button>
          <button
            onClick={onNextMonth}
            className="p-2 hover:bg-blue-200 rounded-lg transition-colors"
            title="Next month"
          >
            <ChevronRight className="w-5 h-5 text-slate-600" />
          </button>
        </div>
      </div>
      <p className="text-xs text-slate-600">
        {selectedDay
          ? `${new Date(selectedDay).toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })} - ${selectedDayItems} activity${
              selectedDayItems !== 1 ? "ies" : ""
            }`
          : "Click on a day to view activities"}
      </p>
    </div>
  );
}
