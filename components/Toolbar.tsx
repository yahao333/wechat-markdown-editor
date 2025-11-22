import React, { useState } from 'react';
import { 
  Bold, 
  Heading2, 
  Quote, 
  Code, 
  Image, 
  Link, 
  List, 
  Table,
  Eye, 
  Edit3, 
  Copy,
  Palette,
  X
} from 'lucide-react';
import { ToolbarProps, ViewMode, ThemeKey } from '../types';

const Toolbar: React.FC<ToolbarProps> = ({ 
  onInsert, 
  currentMode, 
  onToggleMode, 
  onExport,
  currentThemeKey,
  onSetTheme
}) => {
  const [showThemes, setShowThemes] = useState(false);
  
  const btnClass = "p-2.5 rounded-lg text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors flex items-center justify-center shrink-0";
  const actionBtnClass = "p-2.5 rounded-lg bg-wechat-primary text-white shadow-sm active:opacity-90 flex items-center gap-2 text-sm font-medium px-4";
  
  // The container uses `safe-area-pb` defined in index.html
  const containerClass = "w-full bg-white border-t border-gray-200 px-3 pt-2 safe-area-pb shadow-[0_-2px_10px_rgba(0,0,0,0.02)]";

  if (currentMode === ViewMode.PREVIEW) {
    if (showThemes) {
      return (
        <div className={containerClass}>
           <div className="flex items-center justify-between h-11">
              <span className="text-sm font-medium text-gray-500 ml-2">Select Theme:</span>
              <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar px-1">
                 <button 
                    onClick={() => onSetTheme('default')} 
                    className={`w-8 h-8 rounded-full bg-[#07c160] border-2 ${currentThemeKey === 'default' ? 'border-gray-600 scale-110' : 'border-transparent'}`}
                    aria-label="Green Theme"
                 />
                 <button 
                    onClick={() => onSetTheme('blue')} 
                    className={`w-8 h-8 rounded-full bg-[#1890ff] border-2 ${currentThemeKey === 'blue' ? 'border-gray-600 scale-110' : 'border-transparent'}`}
                    aria-label="Blue Theme"
                 />
                 <button 
                    onClick={() => onSetTheme('orange')} 
                    className={`w-8 h-8 rounded-full bg-[#fa8c16] border-2 ${currentThemeKey === 'orange' ? 'border-gray-600 scale-110' : 'border-transparent'}`}
                    aria-label="Orange Theme"
                 />
                 <button 
                    onClick={() => onSetTheme('purple')} 
                    className={`w-8 h-8 rounded-full bg-[#722ed1] border-2 ${currentThemeKey === 'purple' ? 'border-gray-600 scale-110' : 'border-transparent'}`}
                    aria-label="Purple Theme"
                 />
                 <button 
                    onClick={() => onSetTheme('latte')} 
                    className={`w-8 h-8 rounded-full bg-[#b98556] border-2 ${currentThemeKey === 'latte' ? 'border-gray-600 scale-110' : 'border-transparent'}`}
                    aria-label="Latte Theme"
                 />
              </div>
              <button onClick={() => setShowThemes(false)} className="p-2 text-gray-500 shrink-0">
                 <X size={20} />
              </button>
           </div>
        </div>
      );
    }

    return (
        <div className={`${containerClass} flex items-center justify-between`}>
             <div className="flex gap-2">
                <button 
                    onClick={onToggleMode} 
                    className="flex items-center gap-2 text-gray-600 font-medium p-2 active:opacity-70"
                >
                    <Edit3 size={20} />
                    <span>Edit</span>
                </button>
                <button 
                    onClick={() => setShowThemes(true)}
                    className="flex items-center gap-2 text-gray-600 font-medium p-2 active:opacity-70"
                >
                   <Palette size={20} />
                   <span>Theme</span>
                </button>
             </div>

             <button 
                onClick={onExport} 
                className={actionBtnClass}
             >
                <Copy size={18} />
                <span>Copy</span>
             </button>
        </div>
    )
  }

  // Editor Mode Toolbar
  return (
    <div className={`${containerClass} flex items-center justify-between`}>
      <div className="flex items-center gap-1 overflow-x-auto hide-scrollbar pr-2 flex-1">
        <button onClick={() => onInsert('## ')} className={btnClass} aria-label="Heading">
            <Heading2 size={22} strokeWidth={2.5} />
        </button>
        <button onClick={() => onInsert('**')} className={btnClass} aria-label="Bold">
            <Bold size={22} strokeWidth={2.5} />
        </button>
        <button onClick={() => onInsert('> ')} className={btnClass} aria-label="Quote">
            <Quote size={22} strokeWidth={2.5} />
        </button>
        <button onClick={() => onInsert('- ')} className={btnClass} aria-label="List">
            <List size={22} strokeWidth={2.5} />
        </button>
        <button onClick={() => onInsert('```')} className={btnClass} aria-label="Code Block">
            <Code size={22} strokeWidth={2.5} />
        </button>
        <button onClick={() => onInsert('table')} className={btnClass} aria-label="Table">
            <Table size={22} strokeWidth={2.5} />
        </button>
        <button onClick={() => onInsert('img')} className={btnClass} aria-label="Image">
            <Image size={22} strokeWidth={2.5} />
        </button>
        <button onClick={() => onInsert('link')} className={btnClass} aria-label="Link">
            <Link size={22} strokeWidth={2.5} />
        </button>
      </div>

      <div className="w-px h-6 bg-gray-300 mx-2 shrink-0"></div>

      <button 
        onClick={onToggleMode} 
        className="p-2 text-wechat-primary font-medium flex items-center gap-1 shrink-0 active:opacity-70"
      >
        <Eye size={22} />
        <span className="text-sm font-semibold">Preview</span>
      </button>
    </div>
  );
};

export default Toolbar;