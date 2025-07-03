import "./SidebarNotes.css"

export default function Sidebar({
  notes,
  onAddNote,
  onSelectNote,
  activeNoteId,
  onToggleSidebar, // 👈 новый проп
}) {
  const getTitle = (note) => {
    const match = note.content.match(/^# (.+)/);
    return match ? match[1] : "Без названия";
  };

  return (
    <div className="sidebar">
      <button className="toggle-button-fixed" onClick={onToggleSidebar}>
        →
        </button>


      <button onClick={onAddNote} className="add-note-button">
        Добавить заметку
      </button>

      <div className="note-list">
        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => onSelectNote(note.id)}
            className={`note-item ${note.id === activeNoteId ? "active" : ""}`}
          >
            {getTitle(note)}
          </div>
        ))}
      </div>
    </div>
  );
}

