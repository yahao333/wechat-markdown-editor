/**
 * Inserts Markdown syntax into the textarea at the cursor position.
 */
export const insertMarkdown = (
  textarea: HTMLTextAreaElement,
  syntax: string,
  defaultText: string = ''
): string => {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const text = textarea.value;
  
  const selectedText = text.substring(start, end) || defaultText;
  
  // Handle Block types vs Inline types roughly
  const isBlock = syntax.startsWith('\n');
  
  let insertion = '';
  let newCursorPos = 0;

  if (syntax === 'img') {
    insertion = `![Description](https://picsum.photos/600/300)`;
    newCursorPos = start + insertion.length;
  } else if (syntax === 'link') {
    insertion = `[${selectedText}](url)`;
    newCursorPos = start + insertion.length - 1; // Set cursor before closing parenthesis
  } else if (syntax === 'table') {
    insertion = `\n| Header 1 | Header 2 |\n| :--- | :--- |\n| Cell 1 | Cell 2 |\n`;
    newCursorPos = start + insertion.length;
  } else if (syntax.includes('```')) {
    insertion = `\n\`\`\`javascript\n${selectedText}\n\`\`\`\n`;
    newCursorPos = start + insertion.length - 4; // rough positioning
  } else {
    // Standard wrapping like **text** or # Title
    // Check if syntax is a prefix (like # ) or wrapper (like **)
    if (syntax.endsWith(' ')) {
        // Prefix type (Headers, List)
        insertion = `${syntax}${selectedText}`;
        newCursorPos = start + insertion.length;
    } else {
        // Wrapper type (Bold, Italic)
        insertion = `${syntax}${selectedText}${syntax}`;
        newCursorPos = start + syntax.length + selectedText.length + syntax.length;
    }
  }

  const newText = text.substring(0, start) + insertion + text.substring(end);
  
  // We return the new text and let the parent component update state and restore cursor focus
  return newText;
};

/**
 * HTML Export Function for WeChat.
 * 
 * Strategy: Select the Preview DOM Node and use the Clipboard API.
 * This ensures all computed styles (inline styles + css classes) are copied.
 */
export const exportToWeChatHTML = async (elementId: string): Promise<boolean> => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.error('Preview element not found');
    return false;
  }

  try {
    // Use the modern Clipboard API with a Blob
    // This preserves the HTML structure and Inline Styles
    const htmlContent = element.innerHTML;
    
    // Wrap in a div that ensures basic font reset for WeChat
    const wrapper = `
      <div style="font-family: -apple-system-font, BlinkMacSystemFont, 'Helvetica Neue', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei UI', 'Microsoft YaHei', Arial, sans-serif; font-size: 16px; color: #333;">
        ${htmlContent}
      </div>
    `;

    const blob = new Blob([wrapper], { type: 'text/html' });
    const textBlob = new Blob([element.innerText], { type: 'text/plain' });
    
    const data = [new ClipboardItem({ 
        'text/html': blob,
        'text/plain': textBlob
    })];

    await navigator.clipboard.write(data);
    return true;
  } catch (err) {
    console.error('Failed to copy: ', err);
    // Fallback for older browsers (execCommand)
    try {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(element);
        selection?.removeAllRanges();
        selection?.addRange(range);
        document.execCommand('copy');
        selection?.removeAllRanges();
        return true;
    } catch (fallbackErr) {
        return false;
    }
  }
};