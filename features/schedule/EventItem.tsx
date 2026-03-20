import { Trash2, Clock } from "lucide-react";
import { ScheduleItem } from "@/types/schedule";

interface Props {
  item: ScheduleItem;
  onDelete: (id: string) => Promise<void>;
}

export default function EventItem({ item, onDelete }: Props) {
  return (
    <div className="flex items-start justify-between p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
      <div className="flex-1">
        <p className="font-semibold text-slate-800 text-sm">{item.activity}</p>
        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {item.startTime} - {item.endTime}
        </p>
        {item.description && (
          <p className="text-xs text-slate-600 mt-2">{item.description}</p>
        )}
      </div>
      <button
        onClick={() => onDelete(item.id)}
        className="ml-2 p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
        title="Delete activity"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
