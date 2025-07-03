export default function LinkedItemBadge({ type }) {
  const icons = {
    note: "📝",
    pomodoro: "⏱️",
    idea: "💡",
  };

  return (
    <div className="text-xs bg-gray-100 px-2 py-1 rounded-full shadow-sm">
      {icons[type] || "🔗"} {type}
    </div>
  );
}
