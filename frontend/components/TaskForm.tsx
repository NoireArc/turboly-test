type Props = {
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  setTitle: (value: string) => void;
  setDescription: (value: string) => void;
  setDueDate: (value: string) => void;
  setPriority: (value: string) => void;
  onSubmit: () => void;
};

export default function TaskForm({
  title,
  description,
  dueDate,
  priority,
  setTitle,
  setDescription,
  setDueDate,
  setPriority,
  onSubmit,
}: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6 text-white">Add Task</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 text-white"
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 text-white"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 text-white"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-3 text-white"
        >
          <option value="low">Low</option>

          <option value="medium">Medium</option>

          <option value="high">High</option>
        </select>
      </div>

      <button
        onClick={onSubmit}
        className="mt-6 bg-white text-black px-6 py-3 rounded-2xl font-semibold"
      >
        Add Task
      </button>
    </div>
  );
}
