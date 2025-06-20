import { useState } from "react";
import Drawer from "./Drawer/Drawer.jsx";

export default function PomadoroViewSession() {
    const [isOpenPanel, setIsOpenPanel] = useState(false);

    return (
        <div className="p-6">
            <button
                onClick={() => setIsOpenPanel(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Открыть окно
            </button>

            <Drawer isOpen={isOpenPanel} onClose={() => setIsOpenPanel(false)}>
                <h2 className="text-xl font-bold mb-4">Моя информация</h2>
                <p>Ты можешь взаимодействовать с этим блоком.</p>
                <input
                    type="text"
                    placeholder="Введите что-то..."
                    className="border p-2 mt-4 w-full"
                />
            </Drawer>
        </div>
    );
}