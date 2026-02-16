import React from 'react';
import '../styles/CodeEditor.css';

function CodeEditor({ code, onChange, placeholder = 'paste your code here...', readOnly = false }) {
  return (
    <div className="code-editor">
      <textarea
        className="code-textarea"
        value={code}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        spellCheck="false"
      />
    </div>
  );
}

export default CodeEditor;
