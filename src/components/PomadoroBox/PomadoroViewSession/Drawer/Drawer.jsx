import { useEffect } from "react";
import "./Drawer.css";

export default function Drawer({ isOpen, onClose, children }) {
    useEffect(() => {
        const escClose = (e) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", escClose);
        return () => document.removeEventListener("keydown", escClose);
    }, [onClose]);

    return (
        <>
            <div
                className={`drawer-backdrop ${isOpen ? "visible" : "hidden"}`}
                onClick={onClose}
            />
            <div className={`drawer-panel ${isOpen ? "open" : ""}`}>
                <button
                    className="drawer-close-button"
                    onClick={onClose}
                >
                    ✖
                </button>
                <div className="drawer-content">{children}</div>
            </div>
        </>
    );
}
