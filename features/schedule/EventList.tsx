import { Clock } from "lucide-react";
import { ScheduleItem } from "@/types/schedule";
import EventItem from "./EventItem";

interface Props {
  selectedDay: string;
  items: ScheduleItem[];
  onDelete: (id: string) => Promise<void>;
}

export default function EventList({ selectedDay, items, onDelete }: Props) {
  return (
    <div className="mt-6 pt-6 border-t border-slate-200">
      <h3 className="text-sm font-semibold text-slate-700 mb-3">
        Activities for{" "}
        {new Date(selectedDay).toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
        })}
      </h3>

      {items.length === 0 ? (
        <div className="text-center py-8">
          <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
          <p className="text-sm text-slate-500">
            No activities scheduled for this day
          </p>
        </div>
      ) : (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {items.map((item) => (
            <EventItem key={item.id} item={item} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
