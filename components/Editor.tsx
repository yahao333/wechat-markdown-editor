import React from 'react';
import { EditorProps } from '../types';

const Editor: React.FC<EditorProps> = ({ value, onChange, inputRef }) => {
  return (
    <div className="w-full h-full bg-white">
      <textarea
        ref={inputRef}
        className="w-full h-full p-4 text-base leading-relaxed resize-none focus:outline-none font-mono text-gray-800"
        placeholder="# Start writing your WeChat article..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
};

export default Editor;
