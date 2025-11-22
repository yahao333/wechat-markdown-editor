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
   X,
   Check
} from 'lucide-react';
import { ToolbarProps, ViewMode, ThemeKey } from '../types';
import { themes } from '../styles';

const Toolbar: React.FC<ToolbarProps> = ({
   onInsert,
   currentMode,
   onToggleMode,
   onExport,
   currentTheme,
   onSetTheme
}) => {
   const [showThemeSelector, setShowThemeSelector] = useState(false);

   const btnClass = "p-2.5 rounded-lg text-gray-600 hover:bg-gray-100 active:bg-gray-200 transition-colors flex items-center justify-center shrink-0";
   const actionBtnClass = "p-2.5 rounded-lg bg-wechat-primary text-white shadow-sm active:opacity-90 flex items-center gap-2 text-sm font-medium px-4";

   // The container uses `safe-area-pb` defined in index.html
   const containerClass = "w-full bg-white border-t border-gray-200 px-3 pt-2 safe-area-pb shadow-[0_-2px_10px_rgba(0,0,0,0.02)]";

   if (currentMode === ViewMode.PREVIEW) {

      return (
         <div className={`${containerClass} flex items-center justify-between`}>
            <div className="flex gap-2 relative">
               <button
                  onClick={onToggleMode}
                  className="flex items-center gap-2 text-gray-600 font-medium p-2 active:opacity-70"
               >
                  <Edit3 size={20} />
                  <span>Edit</span>
               </button>

               <button
                  onClick={() => setShowThemeSelector(!showThemeSelector)}
                  className={`flex items-center gap-2 font-medium p-2 active:opacity-70 ${showThemeSelector ? 'text-wechat-primary bg-gray-50 rounded-lg' : 'text-gray-600'}`}
               >
                  <Palette size={20} />
                  <span>Theme</span>
               </button>

               {/* Theme Selector Popover */}
               {showThemeSelector && onSetTheme && (
                  <div className="absolute bottom-full left-0 mb-2 bg-white rounded-xl shadow-xl border border-gray-100 p-3 z-50 w-64 animate-in fade-in zoom-in-95 duration-200">
                     <div className="flex flex-col gap-2">
                        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1">Select Theme</div>
                        <div className="grid grid-cols-1 gap-1">
                           {(Object.keys(themes) as ThemeKey[]).map((themeKey) => (
                              <button
                                 key={themeKey}
                                 onClick={() => {
                                    onSetTheme(themeKey);
                                    setShowThemeSelector(false);
                                 }}
                                 className={`flex items-center justify-between w-full p-2 rounded-lg text-sm transition-colors ${currentTheme === themeKey ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                              >
                                 <div className="flex items-center gap-3">
                                    <div
                                       className="w-5 h-5 rounded-full border border-gray-200 shadow-sm ring-2 ring-white"
                                       style={{ backgroundColor: themes[themeKey].primaryColor }}
                                    />
                                    <span className="capitalize">{themeKey}</span>
                                 </div>
                                 {currentTheme === themeKey && <Check size={14} className="text-wechat-primary" />}
                              </button>
                           ))}
                        </div>
                     </div>
                  </div>
               )}
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