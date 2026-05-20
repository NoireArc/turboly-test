"use client";

import { useEffect, useState } from "react";
import {
  createTask,
  deleteTask,
  getTasks,
  toggleTask,
} from "@/services/task.services";
import DueTodayAlert from "@/components/DueTodayAlert";
import TaskCard from "@/components/TaskCard";
import TaskForm from "@/components/TaskForm";
import { Task } from "@/types/task";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("low");
  const [sort, setSort] = useState("due_date");
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const data = await getTasks(sort);

      setTasks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/";
    }

    fetchTasks();
  }, [sort]);

  const handleCreateTask = async () => {
    await createTask({
      title,
      description,
      due_date: dueDate,
      priority,
    });

    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("low");

    fetchTasks();
  };

  const handleToggle = async (id: number) => {
    await toggleTask(id);

    fetchTasks();
  };

  const handleDelete = async (id: number) => {
    await deleteTask(id);

    fetchTasks();
  };

  const today = new Date().toLocaleDateString("en-CA");

  const dueToday = tasks.filter(
    (task) =>
      new Date(task.due_date).toLocaleDateString("en-CA") === today &&
      !task.completed,
  );

  const handleLogout = () => {
    localStorage.removeItem("token");

    window.location.href = "/";
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Dashboard</h1>

            <p className="text-zinc-400 mt-2">Manage your daily tasks</p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 px-4 py-2 rounded-xl"
          >
            Logout
          </button>
        </div>

        <DueTodayAlert total={dueToday.length} />

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
    </main>
  );
}
