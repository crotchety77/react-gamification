import { useState } from "react";
import Sidebar from "./Sidebar/SidebarNotes.jsx";
import Editor from "./Editor/EditorNotes.jsx";
import "./NoteBox.css";

export default function NoteBox() {
  const [notes, setNotes] = useState([]);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleAddNote = () => {
    const newNote = {
      id: Date.now(),
      content: "# Новая заметка\n\nЗдесь можно писать свои мысли...",
      createdAt: new Date(),
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const handleSelectNote = (id) => setActiveNoteId(id);

  const handleUpdateContent = (newContent) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === activeNoteId ? { ...note, content: newContent } : note
      )
    );
  };

  const activeNote = notes.find((note) => note.id === activeNoteId);

  return (
    <div className="note-box">
        <Editor note={activeNote} onChange={handleUpdateContent} />
      {isSidebarOpen && (
        <Sidebar
          notes={notes}
          onAddNote={handleAddNote}
          onSelectNote={handleSelectNote}
          activeNoteId={activeNoteId}
          onToggleSidebar={toggleSidebar} // 👈 связываем кнопку со стейтом
        />
      )}

        {!isSidebarOpen && (
          <button className="toggle-button-fixed" onClick={toggleSidebar}>
            ←
          </button>
        )}

    </div>
  );
}
