import MetricBar from "../ProjectCardsInside/MetricBar/MetricBar.jsx";
import LinkedItemBadge from "../ProjectCardsInside/LinkedItemBadge/LinkedItemBadge.jsx";

export default function ProjectCardOutside({ project }) {
    return (
        <div className="rounded-xl p-4 shadow-lg bg-white border-l-8" style={{ borderColor: project.color }}>
            <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-bold text-black">{project.icon} {project.name}</span>
                <input type="checkbox" checked={project.completed} readOnly />
            </div>
            <MetricBar label="Прогресс" value={project.progress} />
            <MetricBar label="Фокус" value={project.focus} />
        </div>
    );
}
