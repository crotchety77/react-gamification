import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./EditorNotes.css";
import "./Markdown.css";



export default function Editor({ note, onChange }) {
  const [isPreview, setIsPreview] = useState(false);

  if (!note) {
    return (
      <div className="editor-placeholder">
        Выбери заметку или создай новую
      </div>
    );
  }

  return (
    <div className="editor-container">
      <button
        className="toggle-preview-button"
        onClick={() => setIsPreview((prev) => !prev)}
      >
        {isPreview ? "Редактировать" : "Предпросмотр"}
      </button>

      {isPreview ? (
        <div className="markdown-preview">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {note.content}
    </ReactMarkdown>
        </div>
      ) : (
        <textarea
          className="editor-textarea"
          value={note.content}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}
