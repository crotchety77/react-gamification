import ProjectCardOutside from "./ProjectCardsOutside/ProjectCardOutside.jsx";
import { useEffect } from "react";

export default function ProjectBox({ projects }) {
    useEffect(() => {
        console.log("ProjectBox: Монтирован");
        return () => {
            console.log("ProjectBox: Размонтирован");
        };
    }, []);

    console.log("ProjectBox: Ререндер");

    if (!projects || !Array.isArray(projects)) {
        return <div className="p-4">Нет данных о проектах.</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-black text-2xl mb-4">Тут будут проектики</h1>
            <div className="grid grid-cols-2 gap-4">
                {projects?.map((project) => (
                    <ProjectCardOutside key={project.id} project={project} />
                ))}

            </div>
        </div>
    );
}
