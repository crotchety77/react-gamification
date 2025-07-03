import PomadoroBox from "../PomadoroBox/PomadoroBox.jsx";
import NoteBox from "../NoteBox/NoteBox.jsx";
import ProjectBox from "../ProjectsBox/ProjectBox.jsx";

export default function RightPage({ currentModule }) {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            {currentModule === "pomodoro" && <PomadoroBox />}
            {currentModule === "notes" && <NoteBox />}
            {currentModule === "projects" && <ProjectBox />}
            {!currentModule && (
                <p className="text-gray-400 italic">
                    Выбери модуль с помощью закладок слева 👉
                </p>
            )}
        </div>
    );
}