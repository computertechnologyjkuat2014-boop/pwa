"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import ScheduleForm from "@/features/schedule/ScheduleForm";
import ScheduleDisplay from "@/features/schedule/ScheduleDisplay";
import { ScheduleItem } from "@/types/schedule";

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState("");

  // Initialize with today's date
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setSelectedDate(today);
  }, []);

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

  // Navigate to previous day
  const handlePreviousDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() - 1);
    setSelectedDate(date.toISOString().split("T")[0]);
  };

  // Navigate to next day
  const handleNextDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + 1);
    setSelectedDate(date.toISOString().split("T")[0]);
  };

  // Navigate to today
  const handleToday = () => {
    setSelectedDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Schedule</h1>
        <p className="text-slate-600">
          Plan your daily activities and manage your time efficiently
        </p>
      </div>

      {/* Date Navigation */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between">
          <button
            onClick={handlePreviousDay}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            title="Previous day"
          >
            <ChevronLeft className="w-6 h-6 text-slate-600" />
          </button>

          <div className="text-center">
            <p className="text-sm text-slate-500 uppercase tracking-wider">
              Selected Date
            </p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {new Date(selectedDate).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          <button
            onClick={handleNextDay}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            title="Next day"
          >
            <ChevronRight className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        <div className="mt-4 flex justify-center">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          {selectedDate !== new Date().toISOString().split("T")[0] && (
            <button
              onClick={handleToday}
              className="ml-3 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Today
            </button>
          )}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Column */}
        <div>
          <ScheduleForm onAdd={handleAddSchedule} selectedDate={selectedDate} />
        </div>

        {/* Schedule Display Column */}
        <div className="lg:col-span-2">
          <ScheduleDisplay
            items={scheduleItems}
            onDelete={handleDeleteSchedule}
            selectedDate={selectedDate}
          />
        </div>
      </div>
    </div>
  );
}
