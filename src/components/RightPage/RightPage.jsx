import PomadoroBox from "../PomadoroBox/PomadoroBox.jsx";

export default function RightPage({ currentModule }) {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            {currentModule === "pomodoro" && <PomadoroBox />}
            {!currentModule && (
                <p className="text-gray-400 italic">Выбери модуль с помощью закладок слева 👉</p>
            )}
        </div>
    );
}