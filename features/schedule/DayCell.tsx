import { ScheduleItem } from "@/types/schedule";

interface Props {
  day: number | null;
  isSelected: boolean;
  dayItems: ScheduleItem[];
  onSelect: () => void;
}

export default function DayCell({
  day,
  isSelected,
  dayItems,
  onSelect,
}: Props) {
  if (!day) {
    return <div className="border-transparent bg-slate-50" />;
  }

  return (
    <div
      onClick={onSelect}
      className={`min-h-24 p-2 rounded-lg border-2 transition-all ${
        isSelected
          ? "border-blue-500 bg-blue-50 cursor-pointer"
          : dayItems.length > 0
            ? "border-blue-300 bg-blue-50 cursor-pointer hover:border-blue-400"
            : "border-slate-200 hover:border-slate-300 cursor-pointer"
      }`}
    >
      <p
        className={`text-sm font-semibold mb-1 ${
          isSelected
            ? "text-blue-700"
            : dayItems.length > 0
              ? "text-blue-600"
              : "text-slate-700"
        }`}
      >
        {day}
      </p>
      {dayItems.length > 0 && (
        <div className="space-y-1">
          {dayItems.slice(0, 2).map((item) => (
            <div
              key={item.id}
              className="text-xs bg-blue-500 text-white px-2 py-1 rounded truncate"
            >
              {item.activity}
            </div>
          ))}
          {dayItems.length > 2 && (
            <p className="text-xs text-blue-600 font-semibold px-2">
              +{dayItems.length - 2} more
            </p>
          )}
        </div>
      )}
    </div>
  );
}
