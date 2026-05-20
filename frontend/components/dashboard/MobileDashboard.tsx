"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import DueTodayAlert from "@/components/DueTodayAlert";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
import { useDashboard } from "@/hooks/useDashboard";

export default function MobileDashboard() {
  const [sort, setSort] = useState("due_date");

  const [openForm, setOpenForm] = useState(false);

  const {
    tasks,
    title,
    description,
    dueDate,
    priority,
    loading,
    dueToday,

    setTitle,
    setDescription,
    setDueDate,
    setPriority,

    handleCreateTask,
    handleToggle,
    handleDelete,
    handleLogout,
  } = useDashboard(sort);

  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-32">
      <div className="p-4">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>

            <p className="text-zinc-400 mt-1 text-sm">
              Manage your daily tasks
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-xl text-sm"
          >
            Logout
          </button>
        </div>

        {/* ALERT */}
        <DueTodayAlert total={dueToday.length} />

        {/* SORT */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Tasks</h2>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2 text-sm"
          >
            <option value="due_date">Due Date</option>

            <option value="priority">Priority</option>

            <option value="title">Title</option>
          </select>
        </div>

        {/* TASKS */}
        <div className="space-y-4">
          {loading ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center text-zinc-500">
              Loading tasks...
            </div>
          ) : tasks.length === 0 ? (
            <div className="bg-zinc-900 border border-dashed border-zinc-700 rounded-3xl p-10 text-center text-zinc-500">
              No tasks yet
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>

      {/* FLOATING BUTTON */}
      <button
        onClick={() => setOpenForm(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-white text-black flex items-center justify-center shadow-2xl z-50"
      >
        <Plus size={28} />
      </button>

      {/* MOBILE MODAL */}
      {openForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-end">
          <div className="w-full bg-zinc-950 rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Add Task</h2>

              <button
                onClick={() => setOpenForm(false)}
                className="text-zinc-400"
              >
                Close
              </button>
            </div>

            <TaskForm
              title={title}
              description={description}
              dueDate={dueDate}
              priority={priority}
              setTitle={setTitle}
              setDescription={setDescription}
              setDueDate={setDueDate}
              setPriority={setPriority}
              onSubmit={() => {
                handleCreateTask();

                setOpenForm(false);
              }}
            />
          </div>
        </div>
      )}
    </main>
  );
}
