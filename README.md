# WeChat Markdown Editor (Mobile)

## 1. 产品说明文档

### 产品定位
一款专为微信公众号创作者设计的移动端 Markdown 编辑器。解决在手机上无法高效撰写排版精美公众号文章的痛点。核心理念是“内容即排版”，通过 Markdown 语法自动生成符合微信生态审美的 HTML。

### 功能列表
1.  **纯净 Markdown 编辑**：支持标准语法，无富文本干扰。
2.  **实时渲染预览**：左滑/点击切换预览，即时查看渲染效果。
3.  **微信样式适配**：内置仿微信公众号的 CSS 样式（行高、配色、间距）。
4.  **移动端适配**：针对手机屏幕优化的 Flex 布局，底部防遮挡工具栏。
5.  **一键导出**：生成带内联样式的 HTML，直接粘贴至公众号后台。

### 技术选型
*   **Core**: React 18 + TypeScript
*   **Build**: Vite
*   **UI Framework**: Tailwind CSS (Utility-first styling)
*   **Markdown Engine**: `react-markdown` + `rehype-highlight` (React 生态最佳实践)
*   **Icons**: `lucide-react`

### 移动端适配方案
*   **Layout**: 使用 Flexbox (`flex-col`) 实现全屏布局，中间区域滚动 (`flex-1 overflow-auto`)。
*   **Viewport**: 禁止缩放，工具栏固定底部 (`sticky` 或 `fixed`) 以适应软键盘弹出。
*   **Touch**: 增大点击热区 (padding > 8px)，按钮高度 ≥ 44px。

### Markdown 转 HTML 及公众号兼容策略
*   **渲染策略**: 使用 React 组件映射 Markdown 节点。
*   **内联样式 (Inline Styles)**: 为了确保粘贴到微信后台样式不丢失，Preview 组件不单纯依赖 CSS 类名，而是将关键样式（如颜色、边框、间距）作为 `style` 属性内联渲染。这是公众号排版成功的关键。

---

## 2. 目录结构

```
root/
 ├─ index.html          (Entry HTML)
 ├─ index.tsx           (React Entry)
 ├─ App.tsx             (Main Controller)
 ├─ types.ts            (Type Definitions)
 ├─ styles.ts           (WeChat Inline Styles definition)
 ├─ components/
 │   ├─ Editor.tsx      (Markdown Input Area)
 │   ├─ Preview.tsx     (HTML Render Area)
 │   ├─ Toolbar.tsx     (Mobile Toolbar)
 ├─ utils/
 │   ├─ markdownUtils.ts (Insertion & Export Logic)
```

## 3. 交互设计细节
*   **输入区**: 纯文本 Textarea，字体等宽，去除默认边框。
*   **工具栏**: 位于视口底部，包含 H2, Bold, Quote, Code, Image, Link 等常用快捷键。点击后自动在光标处插入 Markdown 语法。
*   **预览区**: 模拟手机端公众号阅读体验，白色背景，特定内边距。

## 4. 示例 Markdown

```markdown
# 这是一个主标题

## 这是一个二级标题

这是一段正文内容。WeChat Markdown Editor 专注于让写作更简单。
> 这是一个引用块，通常用于强调某段话。

- 列表项 1
- 列表项 2

```js
console.log('Hello World');
```

![示例图片](https://picsum.photos/800/400)

| Header 1 | Header 2 |
| :--- | :--- |
| Row 1, Cell 1 | Row 1, Cell 2 |
| Row 2, Cell 1 | Row 2, Cell 2 |
```

### 表格渲染 HTML 示例 (WeChat Style)

当上述表格 Markdown 被渲染并导出时，会生成以下包含内联样式的 HTML，可直接粘贴至公众号：

```html
<table style="width: 100%; border-collapse: collapse; margin: 20px 0px; font-size: 14px; line-height: 1.5;">
  <thead style="border: none;">
    <tr style="border-bottom: 1px solid rgb(238, 238, 238);">
      <th style="background-color: rgb(247, 247, 247); border: 1px solid rgb(224, 224, 224); padding: 10px; font-weight: bold; color: rgb(51, 51, 51); text-align: left;">Header 1</th>
      <th style="background-color: rgb(247, 247, 247); border: 1px solid rgb(224, 224, 224); padding: 10px; font-weight: bold; color: rgb(51, 51, 51); text-align: left;">Header 2</th>
    </tr>
  </thead>
  <tbody style="border: none;">
    <tr style="border-bottom: 1px solid rgb(238, 238, 238);">
      <td style="border: 1px solid rgb(224, 224, 224); padding: 10px; color: rgb(85, 85, 85);">Row 1, Cell 1</td>
      <td style="border: 1px solid rgb(224, 224, 224); padding: 10px; color: rgb(85, 85, 85);">Row 1, Cell 2</td>
    </tr>
    <tr style="border-bottom: 1px solid rgb(238, 238, 238);">
      <td style="border: 1px solid rgb(224, 224, 224); padding: 10px; color: rgb(85, 85, 85);">Row 2, Cell 1</td>
      <td style="border: 1px solid rgb(224, 224, 224); padding: 10px; color: rgb(85, 85, 85);">Row 2, Cell 2</td>
    </tr>
  </tbody>
</table>
```