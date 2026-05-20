type Props = {
  total: number;
};

export default function DueTodayAlert({ total }: Props) {
  if (total === 0) return null;

  return (
    <div className="bg-yellow-500/20 border border-yellow-500 text-yellow-300 p-4 rounded-2xl mb-8">
      You have {total} tasks due today
    </div>
  );
}
