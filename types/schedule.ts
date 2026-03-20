// types/schedule.ts
export interface ScheduleItem {
  id: string;
  activity: string;
  startTime: string; // HH:MM format
  endTime: string; // HH:MM format
  date: string; // YYYY-MM-DD
  description?: string;
}