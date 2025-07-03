import "./Tabs.css";

const tabs = [
  { id: "pomodoro", label: "⏰ Помодоро", colorClass: "bg-rose-200" },
  { id: "notes", label: "📝 Заметки", colorClass: "bg-yellow-200" },
  { id: "projects", label: "📚 Проекты", colorClass: "bg-green-200" },
  { id: "inventory", label: "🔧 Инвентарь", colorClass: "bg-blue-200" },
];

export default function Tabs({ onSelect }) {
  return (
    <div className="tabsContainer">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tabButton ${tab.colorClass}`}
          onClick={() => onSelect(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
