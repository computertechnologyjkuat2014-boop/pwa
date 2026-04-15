"use client";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import ScheduleForm from "@/features/schedule/ScheduleForm";
import ScheduleDisplay from "@/features/schedule/ScheduleDisplay";
import { ScheduleItem } from "@/types/schedule";

export default function SchedulePage() {
  // Automatically updates the list whenever data changes in IndexedDB
  const scheduleItems = useLiveQuery(() => db.schedules.toArray()) || [];

  // Handle adding a new schedule item
  const handleAddSchedule = async (item: Omit<ScheduleItem, "id">) => {
    await db.schedules.add({
      ...item,
      id: Date.now().toString(),
    });
  };

  // Handle deleting a schedule item
  const handleDeleteSchedule = async (id: string) => {
    await db.schedules.delete(id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-blue-500 mb-2">Schedule</h1>
        <p className="text-slate-600">
          Plan your daily activities and manage your time efficiently
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Column */}
        <div>
          <ScheduleForm onAdd={handleAddSchedule} />
        </div>

        {/* Schedule Display Column */}
        <div className="lg:col-span-2">
          <ScheduleDisplay
            items={scheduleItems}
            onDelete={handleDeleteSchedule}
          />
        </div>
      </div>
    </div>
  );
}
