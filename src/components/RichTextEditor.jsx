import React, { useRef } from 'react';
import '../RichTextEditor.css';

export default function RichTextEditor() {
  const editorRef = useRef(null);

  const handleCommand = (command, value = null) => {
    document.execCommand(command, false, value);
  };

  return (
    <div className="rich-text-editor">
      {/* Toolbar */}
      <div className="toolbar">
        <button onClick={() => handleCommand('bold')}><b>Bold</b></button>
        <button onClick={() => handleCommand('italic')}><i>Italic</i></button>
        <button onClick={() => handleCommand('underline')}><u>Underline</u></button>
        <button onClick={() => handleCommand('justifyCenter')}>Center</button>
        <button onClick={() => handleCommand('insertHTML', '<br>')}>Line Break</button>
      </div>

      {/* Editable Area */}
      <div
        className="editor"
        contentEditable={true}
        ref={editorRef}
        suppressContentEditableWarning={true}
      >
        Start typing here...
      </div>
    </div>
  );
}