import React, { useState } from 'react';
import CodeEditor from './CodeEditor';
import '../styles/AnalysisForm.css';

function AnalysisForm({ onSubmit, loading = false }) {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim()) {
      onSubmit(code, language);
      setCode('');
    }
  };

  return (
    <form className="analysis-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="language">Programming Language</label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="language-select"
          disabled={loading}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="csharp">C#</option>
          <option value="go">Go</option>
          <option value="rust">Rust</option>
          <option value="typescript">TypeScript</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="code">Your Code</label>
        <CodeEditor
          code={code}
          onChange={setCode}
          placeholder="Paste your code here and we'll optimize it for carbon efficiency..."
        />
      </div>

      <button type="submit" className="submit-btn" disabled={loading || !code.trim()}>
        {loading ? 'Optimizing with Gemini...' : 'Optimize Code →'}
      </button>

      {loading && <div className="loading-message">🚀 Analyzing your code with Gemini AI...</div>}
    </form>
  );
}

export default AnalysisForm;
