"use client";

import { db } from "@/lib/db";
import { useState } from "react";

export default function ExtractPage() {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [message, setMessage] = useState("");

  const exportData = async () => {
    setIsExporting(true);
    setMessage("");

    try {
      // Fetch all data from each table
      const [expenses, schedules, topics, games] = await Promise.all([
        db.expenses.toArray(),
        db.schedules.toArray(),
        db.topics.toArray(),
        db.games.toArray(),
      ]);

      const data = {
        expenses,
        schedules,
        topics,
        games,
        exportedAt: new Date().toISOString(),
      };

      // Create and download JSON file
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `database-export-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setMessage("Data exported successfully!");
    } catch (error) {
      console.error("Export failed:", error);
      setMessage("Export failed. Please try again.");
    } finally {
      setIsExporting(false);
    }
  };

  const importData = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    setMessage("");

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      // Validate data structure
      if (!data.expenses || !data.schedules || !data.topics || !data.games) {
        throw new Error("Invalid file format. Missing required data tables.");
      }

      // Clear existing data (optional - you might want to ask user)
      await Promise.all([
        db.expenses.clear(),
        db.schedules.clear(),
        db.topics.clear(),
        db.games.clear(),
      ]);

      // Import data
      await Promise.all([
        db.expenses.bulkAdd(data.expenses),
        db.schedules.bulkAdd(data.schedules),
        db.topics.bulkAdd(data.topics),
        db.games.bulkAdd(data.games),
      ]);

      setMessage("Data imported successfully!");
    } catch (error) {
      console.error("Import failed:", error);
      setMessage(
        `Import failed: ${error instanceof Error ? error.message : "Unknown error"}`,
      );
    } finally {
      setIsImporting(false);
      // Reset file input
      event.target.value = "";
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Database Extract</h1>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Export Database</h2>
          <p className="text-gray-600 mb-4">
            Export all data from the database to a JSON file. This includes
            expenses, schedules, topics, and games.
          </p>
          <button
            onClick={exportData}
            disabled={isExporting}
            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-6 py-2 rounded-md font-medium transition-colors"
          >
            {isExporting ? "Exporting..." : "Export Data"}
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Import Database</h2>
          <p className="text-gray-600 mb-4">
            Import data from a previously exported JSON file. This will replace
            all existing data.
          </p>
          <div className="flex items-center space-x-4">
            <input
              type="file"
              accept=".json"
              onChange={importData}
              disabled={isImporting}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {isImporting && <span className="text-blue-600">Importing...</span>}
          </div>
        </div>

        {message && (
          <div
            className={`p-4 rounded-md ${message.includes("failed") ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"}`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
