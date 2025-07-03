import "./EditorNotes.css";

export default function Editor({ note, onChange }) {
  if (!note) {
    return (
      <div className="editor-placeholder">
        Выбери заметку или создай новую
      </div>
    );
  }

  return (
    <div className="editor-container">
      <textarea
        className="editor-textarea"
        value={note.content}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
