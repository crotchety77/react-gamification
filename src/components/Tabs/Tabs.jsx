const tabs = [
    { id: "pomodoro", label: "⏱ Помодоро", color: "bg-rose-200" },
    // Можно добавить другие табы по вкусу!
];

export default function Tabs({ onSelect }) {
    return (
        <div className="absolute top-4 left-0 flex flex-col gap-2 px-2">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={`px-4 py-2 text-sm font-bold rounded-r shadow-md hover:scale-105 transition-all duration-150 ${tab.color}`}
                    onClick={() => onSelect(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}