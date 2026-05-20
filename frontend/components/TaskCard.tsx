import { Task } from "@/types/task";

type Props = {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

export default function TaskCard({ task, onToggle, onDelete }: Props) {
  const isDueToday =
    new Date(task.due_date).toLocaleDateString("en-CA") ===
    new Date().toLocaleDateString("en-CA");

  return (
    <div
      className={`rounded-3xl p-5 border ${
        isDueToday
          ? "bg-yellow-500/10 border-yellow-500"
          : "bg-zinc-900 border-zinc-800"
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3
            className={`text-xl font-semibold text-white ${
              task.completed ? "line-through text-zinc-500" : ""
            }`}
          >
            {task.title}
          </h3>

          <p className="text-zinc-400 mt-1">{task.description}</p>

          <div className="flex gap-4 mt-3 text-sm text-zinc-500">
            <span>{new Date(task.due_date).toLocaleDateString()}</span>

            <span> {task.priority}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onToggle(task.id)}
            className="bg-green-500 px-4 py-2 rounded-xl text-sm text-white"
          >
            {task.completed ? "Undo" : "Done"}
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="bg-red-500 px-4 py-2 rounded-xl text-sm text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
