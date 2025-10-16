export default function ProjectCardInside({ project }) {
    return (
        <div className="p-4 flex flex-col gap-4">
            <h1 className="text-3xl font-bold">{project.icon} {project.name}</h1>

            <section>
                <h2 className="text-xl mb-2">Время (помидоры)</h2>
                {/* Добавить визуализацию времени, если нужно */}
            </section>

            <section>
                <h2 className="text-xl mb-2">Связи</h2>
                {/* Возможно, стоит использовать LinkedItemBadge здесь */}
            </section>

            <section>
                <h2 className="text-xl mb-2">Заметки</h2>
                <ul className="list-disc list-inside">
                    <li>Ссылка на открытие другой части программы</li>
                </ul>
            </section>
        </div>
    );
}
