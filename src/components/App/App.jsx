import { useEffect, useState } from "react";
import LeftPage from "../LeftPage/LeftPage.jsx";
import RightPage from "../RightPage/RightPage.jsx";
import Tabs from "../Tabs/Tabs.jsx";
import './App.css'

export default function App() {
    const [rightPage, setRightPage] = useState(null);
    const [backendStatus, setBackendStatus] = useState("⏳ Проверка...");
    const [dbStatus, setDbStatus] = useState("⏳ Проверка...");

    useEffect(() => {
        // Проверяем бекенд
        fetch("http://localhost:4200/")
            .then(res => res.json())
            .then(() => setBackendStatus("✅ Бекенд доступен"))
            .catch(() => setBackendStatus("❌ Нет связи с бекендом"));

        // Проверяем базу
        fetch("http://localhost:4200/api/status")
            .then(res => res.json())
            .then(data => {
                if (data.ok) setDbStatus("✅ БД подключена");
                else setDbStatus("❌ Ошибка БД");
            })
            .catch(() => setDbStatus("❌ Нет связи с БД"));
    }, []);

    return (
        <>
            <div className="app-wrapper">

                <div className="left-page">
                    <LeftPage/>
                </div>

                <div className="right-page">
                    <RightPage currentModule={rightPage}/>
                </div>

                <Tabs onSelect={setRightPage}/>

                {/* ↓ Строка состояния */}

            </div>

            <div className="status-bar">
                <span>{backendStatus}</span> | <span>{dbStatus}</span>
            </div>
        </>
    );
}
