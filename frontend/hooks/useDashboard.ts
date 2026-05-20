"use client";

import { useEffect, useState } from "react";
import {
    createTask,
    deleteTask,
    getTasks,
    toggleTask,
} from "@/services/task.services";
import { Task } from "@/types/task";

export const useDashboard = (sort: string) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState("low");
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

    return {
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
    };
};
