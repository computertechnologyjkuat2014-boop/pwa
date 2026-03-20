"use client";
import { useState, useEffect } from "react";
import { Plus, Clock, FileText } from "lucide-react";
import { ScheduleItem } from "@/types/schedule";

interface Props {
  onAdd: (item: Omit<ScheduleItem, "id">) => Promise<void>;
  selectedDate: string;
}

export default function ScheduleForm({ onAdd, selectedDate }: Props) {
  const [activity, setActivity] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    // Reset form when date changes
    setActivity("");
    setStartTime("");
    setEndTime("");
    setDescription("");
  }, [selectedDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!activity || !startTime || !endTime) {
      alert("Please fill in all required fields");
      return;
    }

    // Validate time format
    if (!/^\d{2}:\d{2}$/.test(startTime) || !/^\d{2}:\d{2}$/.test(endTime)) {
      alert("Please use HH:MM format");
      return;
    }

    // Validate end time is after start time
    if (startTime >= endTime) {
      alert("End time must be after start time");
      return;
    }

    await onAdd({
      activity,
      startTime,
      endTime,
      date: selectedDate,
      description: description || undefined,
    });

    // Reset form
    setActivity("");
    setStartTime("");
    setEndTime("");
    setDescription("");
  };

  return (
    <section className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
      <h2 className="text-lg font-bold text-slate-800 mb-4">Schedule Activity</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Activity Input */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 ml-1">
            Activity
          </label>
          <input
            type="text"
            placeholder="What activity do you want to schedule?"
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            required
            className="w-full px-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
          />
        </div>

        {/* Time Inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 ml-1">
              Start Time
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 ml-1">
              End Time
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
            </div>
          </div>
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 ml-1">
            Description (Optional)
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
            <textarea
              placeholder="Add any notes or details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 transition-all outline-none resize-none"
              rows={2}
            />
          </div>
        </div>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 
            rounded-2xl shadow-lg shadow-blue-100 transition-all active:scale-95 flex items-center 
            justify-center gap-2"
          type="submit"
        >
          <Plus className="w-5 h-5" /> Schedule Activity
        </button>
      </form>
    </section>
  );
}
