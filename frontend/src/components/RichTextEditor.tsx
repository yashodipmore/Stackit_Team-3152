import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import '@uiw/react-md-editor/markdown-editor.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Write your content here...",
  height = 300
}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Common emojis for quick access
  const commonEmojis = ['😀', '😂', '😊', '😍', '🤔', '👍', '👎', '❤️', '🔥', '💡', '✅', '❌', '⚠️', '📝', '💻', '🚀'];

  const insertText = (text: string) => {
    const newValue = value + text;
    onChange(newValue);
  };

  const insertEmoji = (emoji: string) => {
    insertText(emoji);
    setShowEmojiPicker(false);
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    const text = prompt('Enter link text (optional):') || url;
    if (url) {
      insertText(`[${text}](${url})`);
    }
  };

  const insertImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // For demo purposes, we'll just insert a placeholder
        const fileName = file.name;
        insertText(`![Image: ${fileName}](image-url-here)`);
        alert('Image upload functionality would be implemented here. For now, a placeholder has been inserted.');
      }
    };
    input.click();
  };

  const formatText = (format: string) => {
    switch (format) {
      case 'bold':
        insertText('**bold text**');
        break;
      case 'italic':
        insertText('*italic text*');
        break;
      case 'strikethrough':
        insertText('~~strikethrough text~~');
        break;
      case 'ordered-list':
        insertText('\n1. List item\n2. List item\n3. List item\n');
        break;
      case 'unordered-list':
        insertText('\n- List item\n- List item\n- List item\n');
        break;
      case 'align-left':
        insertText('\n<div style="text-align: left">\nYour text here\n</div>\n');
        break;
      case 'align-center':
        insertText('\n<div style="text-align: center">\nYour text here\n</div>\n');
        break;
      case 'align-right':
        insertText('\n<div style="text-align: right">\nYour text here\n</div>\n');
        break;
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Custom Toolbar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px',
        padding: '8px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #e9ecef',
        borderRadius: '8px 8px 0 0'
      }}>
        {/* Text Formatting */}
        <button
          type="button"
          onClick={() => formatText('bold')}
          style={{
            padding: '6px 10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: 'white',
            cursor: 'pointer',
            fontSize: '12px',
            fontWeight: 'bold'
          }}
          title="Bold"
        >
          B
        </button>

        <button
          type="button"
          onClick={() => formatText('italic')}
          style={{
            padding: '6px 10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: 'white',
            cursor: 'pointer',
            fontSize: '12px',
            fontStyle: 'italic'
          }}
          title="Italic"
        >
          I
        </button>

        <button
          type="button"
          onClick={() => formatText('strikethrough')}
          style={{
            padding: '6px 10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: 'white',
            cursor: 'pointer',
            fontSize: '12px',
            textDecoration: 'line-through'
          }}
          title="Strikethrough"
        >
          S
        </button>

        <div style={{ width: '1px', height: '24px', backgroundColor: '#ddd', margin: '0 4px' }}></div>

        {/* Lists */}
        <button
          type="button"
          onClick={() => formatText('ordered-list')}
          style={{
            padding: '6px 10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: 'white',
            cursor: 'pointer',
            fontSize: '12px'
          }}
          title="Numbered List"
        >
          1.
        </button>

        <button
          type="button"
          onClick={() => formatText('unordered-list')}
          style={{
            padding: '6px 10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: 'white',
            cursor: 'pointer',
            fontSize: '12px'
          }}
          title="Bullet List"
        >
          •
        </button>

        <div style={{ width: '1px', height: '24px', backgroundColor: '#ddd', margin: '0 4px' }}></div>

        {/* Alignment */}
        <button
          type="button"
          onClick={() => formatText('align-left')}
          style={{
            padding: '6px 10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: 'white',
            cursor: 'pointer',
            fontSize: '12px'
          }}
          title="Align Left"
        >
          ⬅
        </button>

        <button
          type="button"
          onClick={() => formatText('align-center')}
          style={{
            padding: '6px 10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: 'white',
            cursor: 'pointer',
            fontSize: '12px'
          }}
          title="Align Center"
        >
          ↔
        </button>

        <button
          type="button"
          onClick={() => formatText('align-right')}
          style={{
            padding: '6px 10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: 'white',
            cursor: 'pointer',
            fontSize: '12px'
          }}
          title="Align Right"
        >
          ➡
        </button>

        <div style={{ width: '1px', height: '24px', backgroundColor: '#ddd', margin: '0 4px' }}></div>

        {/* Media */}
        <button
          type="button"
          onClick={insertLink}
          style={{
            padding: '6px 10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: 'white',
            cursor: 'pointer',
            fontSize: '12px'
          }}
          title="Insert Link"
        >
          🔗
        </button>

        <button
          type="button"
          onClick={insertImage}
          style={{
            padding: '6px 10px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            background: 'white',
            cursor: 'pointer',
            fontSize: '12px'
          }}
          title="Insert Image"
        >
          📷
        </button>

        {/* Emoji */}
        <div style={{ position: 'relative' }}>
          <button
            type="button"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            style={{
              padding: '6px 10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              background: showEmojiPicker ? '#f48024' : 'white',
              color: showEmojiPicker ? 'white' : 'black',
              cursor: 'pointer',
              fontSize: '12px'
            }}
            title="Insert Emoji"
          >
            😀
          </button>

          {showEmojiPicker && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '0',
              zIndex: 1000,
              backgroundColor: 'white',
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '4px',
              maxWidth: '200px'
            }}>
              {commonEmojis.map((emoji, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => insertEmoji(emoji)}
                  style={{
                    padding: '4px',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: '16px',
                    borderRadius: '4px'
                  }}
                  onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#f0f0f0'}
                  onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = 'transparent'}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MDEditor */}
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || '')}
        preview="edit"
        height={height}
        data-color-mode="light"
        hideToolbar
        style={{
          backgroundColor: 'white'
        }}
      />
    </div>
  );
};

export default RichTextEditor;
