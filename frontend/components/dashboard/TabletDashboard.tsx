"use client";

import { useState } from "react";
import DueTodayAlert from "@/components/DueTodayAlert";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
import { useDashboard } from "@/hooks/useDashboard";

export default function TabletDashboard() {
  const [sort, setSort] = useState("due_date");

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
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-5xl mx-auto p-6">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Dashboard</h1>

            <p className="text-zinc-400 mt-2">Manage your daily tasks</p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-5 py-3 rounded-2xl"
          >
            Logout
          </button>
        </div>

        {/* ALERT */}
        <DueTodayAlert total={dueToday.length} />

        {/* FORM */}
        <TaskForm
          title={title}
          description={description}
          dueDate={dueDate}
          priority={priority}
          setTitle={setTitle}
          setDescription={setDescription}
          setDueDate={setDueDate}
          setPriority={setPriority}
          onSubmit={handleCreateTask}
        />

        {/* TASK HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Tasks</h2>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2"
          >
            <option value="due_date">Due Date</option>

            <option value="priority">Priority</option>

            <option value="title">Title</option>
          </select>
        </div>

        {/* TASK GRID */}
        <div className="grid grid-cols-2 gap-4">
          {loading ? (
            <div className="col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-10 text-center text-zinc-500">
              Loading tasks...
            </div>
          ) : tasks.length === 0 ? (
            <div className="col-span-2 bg-zinc-900 border border-dashed border-zinc-700 rounded-3xl p-10 text-center text-zinc-500">
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
    </main>
  );
}
