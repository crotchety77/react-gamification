import { useEffect } from "react";

export default function Drawer({ isOpen, onClose, children }) {
    useEffect(() => {
        const escClose = (e) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", escClose);
        return () => document.removeEventListener("keydown", escClose);
    }, [onClose]);

    return (
        <>
            {/* Затемнение фона */}
            <div
                className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={onClose}
            />

            {/* Панель */}
            <div
                className={`fixed top-0 right-0 h-full w-80 bg-white z-50 shadow-lg transition-transform duration-300 ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <button
                    className="absolute top-2 right-2 text-xl"
                    onClick={onClose}
                >
                    ✖
                </button>
                <div className="p-4">{children}</div>
            </div>
        </>
    );
}