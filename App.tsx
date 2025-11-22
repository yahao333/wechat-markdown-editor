import React, { useState, useRef, useEffect } from 'react';
import Editor from './components/Editor';

import Preview from './components/Preview';
import Toolbar from './components/Toolbar';
import { ViewMode, ThemeKey } from './types';
import { themes } from './styles';
import { insertMarkdown, exportToWeChatHTML } from './utils/markdownUtils';

const DEFAULT_MD = `# Hello WeChat 🟢

Welcome to the **Markdown Editor**. This tool is designed to help you write articles for WeChat Official Accounts efficiently on mobile.

## Key Features

> "Simplicity is the ultimate sophistication."

- **Pure Markdown**: No rich text distractions.
- **Real-time Preview**: See how it looks instantly.
- **WeChat Styles**: Optimized colors and spacing.

## Code Example

\`\`\`javascript
const greet = (name) => {
  console.log(\`Hello, \${name}!\`);
};
greet('Developer');
\`\`\`

## Try it out
1. Edit this text.
2. Click **Preview**.
3. Click **Theme** to change colors.
4. Click **Copy** and paste into WeChat backend.

![Placeholder Image](https://picsum.photos/600/300)
`;

const App: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>(DEFAULT_MD);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.EDITOR);
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('default');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Toast state
  const [toast, setToast] = useState<{ msg: string, visible: boolean }>({ msg: '', visible: false });

  const showToast = (msg: string) => {
    setToast({ msg, visible: true });
    setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 2000);
  };

  const handleInsert = (syntax: string, defaultText?: string) => {
    if (inputRef.current) {
      const newText = insertMarkdown(inputRef.current, syntax, defaultText);
      setMarkdown(newText);
      // Need a slight delay to refocus correctly on mobile after state update
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  };

  const handleToggleMode = () => {
    setViewMode(prev => prev === ViewMode.EDITOR ? ViewMode.PREVIEW : ViewMode.EDITOR);
  };

  const handleExport = async () => {
    const success = await exportToWeChatHTML('wechat-preview-content');
    if (success) {
      showToast('✅ Copied to clipboard!');
    } else {
      showToast('❌ Copy failed');
    }
  };

  return (
    <div className="flex flex-col h-full bg-wechat-bg max-w-md mx-auto shadow-xl overflow-hidden">
      {/* Header */}
      <header className="h-12 bg-white border-b border-gray-200 flex items-center justify-center shrink-0 z-10">
        <h1 className="font-semibold text-gray-800">
          {viewMode === ViewMode.EDITOR ? 'Editing' : 'Preview'}
        </h1>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative">
        {viewMode === ViewMode.EDITOR ? (
          <Editor
            value={markdown}
            onChange={setMarkdown}
            inputRef={inputRef}
          />
        ) : (
          <Preview markdown={markdown} theme={themes[currentTheme]} />
        )}

        {/* Toast Notification */}
        <div
          className={`absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm transition-opacity duration-300 pointer-events-none ${toast.visible ? 'opacity-100' : 'opacity-0'}`}
        >
          {toast.msg}
        </div>
      </main>

      {/* Bottom Toolbar */}
      <footer className="shrink-0 z-20 relative">
        <Toolbar
          onInsert={handleInsert}
          currentMode={viewMode}
          onToggleMode={handleToggleMode}
          onExport={handleExport}
          currentTheme={currentTheme}
          onSetTheme={setCurrentTheme}
        />
      </footer>
    </div>
  );
};

export default App;