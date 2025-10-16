import PomadoroBox from "../PomadoroBox/PomadoroBox.jsx";
import NoteBox from "../NoteBox/NoteBox.jsx";
import ProjectBox from "../ProjectsBox/ProjectBox.jsx";

const demoProjects = [
    {
        id: 1,
        name: "Проект A",
        description: "Описание проекта A",
        links: 123
    },
    {
        id: 2,
        name: "Проект B",
        description: "Описание проекта B",
        links: 123,
        focus: 50,
        progress: 70
    },
];


export default function RightPage({ currentModule }) {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            {currentModule === "pomodoro" && <PomadoroBox />}
            {currentModule === "notes" && <NoteBox />}
            {currentModule === "projects" && <ProjectBox projects={demoProjects} />}
            {!currentModule && (
                <p className="text-gray-400 italic">
                    Выбери модуль с помощью закладок слева 👉
                </p>
            )}
        </div>
    );
}