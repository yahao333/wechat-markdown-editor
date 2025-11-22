import React from 'react';

export interface EditorProps {
  value: string;
  onChange: (val: string) => void;
  inputRef: React.RefObject<HTMLTextAreaElement>;
}

// Define the structure of a Theme
export interface ThemeStyles {
  h1: React.CSSProperties;
  h2: React.CSSProperties;
  h3: React.CSSProperties;
  p: React.CSSProperties;
  blockquote: React.CSSProperties;
  li: React.CSSProperties;
  img: React.CSSProperties;
  codeInline: React.CSSProperties;
  pre: React.CSSProperties;
  link: React.CSSProperties;
  table: React.CSSProperties;
  th: React.CSSProperties;
  td: React.CSSProperties;
  // Optional prefix for H2 (e.g. an icon)
  h2Prefix?: string;
}

export type ThemeKey = 'default' | 'blue' | 'purple' | 'orange' | 'latte';

export interface PreviewProps {
  markdown: string;
  theme: ThemeStyles;
}

export enum ViewMode {
  EDITOR = 'EDITOR',
  PREVIEW = 'PREVIEW',
}

export interface ToolbarProps {
  onInsert: (syntax: string, defaultText?: string) => void;
  currentMode: ViewMode;
  onToggleMode: () => void;
  onExport: () => void;
  currentThemeKey: ThemeKey;
  onSetTheme: (key: ThemeKey) => void;
}