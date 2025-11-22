import { ThemeStyles, ThemeKey } from './types';

const baseStyles: Partial<ThemeStyles> = {
  p: {
    fontSize: '16px',
    lineHeight: '1.75',
    color: '#3e3e3e',
    margin: '0 0 16px 0',
    textAlign: 'justify',
    letterSpacing: '0.5px',
  },
  li: {
    fontSize: '16px',
    lineHeight: '1.75',
    color: '#3e3e3e',
    marginBottom: '8px',
  },
  img: {
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
    margin: '20px auto',
    borderRadius: '6px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
  },
  pre: {
    backgroundColor: '#282c34',
    color: '#abb2bf',
    padding: '15px',
    borderRadius: '5px',
    overflowX: 'auto',
    fontSize: '13px',
    lineHeight: '1.5',
    margin: '20px 0',
    fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
    border: '1px solid rgba(0,0,0,0.05)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    margin: '20px 0',
    fontSize: '14px',
    lineHeight: '1.5',
  },
  td: {
    border: '1px solid #e0e0e0',
    padding: '10px',
    color: '#555',
  },
};

const createTheme = (primaryColor: string, secondaryColor: string, bgColor: string): ThemeStyles => ({
  ...baseStyles as ThemeStyles,
  primaryColor,
  h1: {
    fontSize: '22px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '30px',
    marginBottom: '20px',
    color: '#333',
    lineHeight: '1.4',
  },
  h2: {
    fontSize: '18px',
    fontWeight: 'bold',
    paddingBottom: '5px',
    borderBottom: `2px solid ${primaryColor}`,
    marginTop: '30px',
    marginBottom: '15px',
    color: '#333',
    display: 'inline-block',
    lineHeight: '1.4',
  },
  h3: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '20px',
    marginBottom: '10px',
    color: '#333',
    paddingLeft: '8px',
    borderLeft: `4px solid ${primaryColor}`,
    lineHeight: '1.4',
  },
  blockquote: {
    borderLeft: `4px solid ${primaryColor}`,
    backgroundColor: bgColor,
    color: '#555',
    padding: '12px 12px 12px 16px',
    margin: '20px 0',
    fontSize: '15px',
    lineHeight: '1.6',
    borderRadius: '4px',
  },
  codeInline: {
    backgroundColor: '#f2f2f2',
    padding: '2px 5px',
    borderRadius: '3px',
    color: primaryColor,
    fontSize: '14px',
    fontFamily: 'Menlo, Monaco, Consolas, "Courier New", monospace',
    margin: '0 2px',
  },
  link: {
    color: primaryColor,
    textDecoration: 'none',
    borderBottom: `1px dashed ${primaryColor}`,
    paddingBottom: '1px',
  },
  th: {
    backgroundColor: bgColor,
    border: '1px solid #e0e0e0',
    padding: '10px',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
  },
});

// Custom "Latte" theme definition
const latteTheme: ThemeStyles = {
  ...baseStyles as ThemeStyles,
  h2Prefix: '🧋',
  primaryColor: '#b98556',
  h1: {
    fontSize: '22px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '30px',
    marginBottom: '20px',
    color: '#333',
    lineHeight: '1.4',
  },
  h2: {
    fontSize: '18px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '40px',
    marginBottom: '20px',
    color: '#b98556', // Latte Brown
    lineHeight: '1.4',
    display: 'block', // Center align needs block
  },
  h3: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '20px',
    marginBottom: '10px',
    color: '#b98556',
    paddingLeft: '8px',
    borderLeft: '4px solid #b98556',
    lineHeight: '1.4',
  },
  blockquote: {
    borderLeft: '4px solid #b98556',
    backgroundColor: '#fffbf0', // Cream
    color: '#5a4a42',
    padding: '16px',
    margin: '20px 0',
    fontSize: '15px',
    lineHeight: '1.6',
    borderRadius: '8px',
  },
  codeInline: {
    backgroundColor: '#fff5e6',
    padding: '2px 5px',
    borderRadius: '3px',
    color: '#b98556',
    fontSize: '14px',
    fontFamily: 'Menlo, Monaco, Consolas, monospace',
    margin: '0 2px',
  },
  link: {
    color: '#b98556',
    textDecoration: 'none',
    borderBottom: '1px solid #b98556',
    paddingBottom: '1px',
  },
  th: {
    backgroundColor: '#fffbf0',
    border: '1px solid #e0e0e0',
    padding: '10px',
    fontWeight: 'bold',
    color: '#5a4a42',
    textAlign: 'left',
  },
  li: {
    ...baseStyles.li!,
    listStyleType: 'disc',
  }
};

export const themes: Record<ThemeKey, ThemeStyles> = {
  default: createTheme('#07c160', '#f7f7f7', '#f7f7f7'), // WeChat Green
  blue: createTheme('#1890ff', '#e6f7ff', '#e6f7ff'),   // Tech Blue
  purple: createTheme('#722ed1', '#f9f0ff', '#f9f0ff'), // Elegant Purple
  orange: createTheme('#fa8c16', '#fff7e6', '#fff7e6'), // Warm Orange
  latte: latteTheme,                                    // Latte / Coffee
};