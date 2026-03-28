import { useState, useRef } from 'react';

export default function InputBar({ onSend, isLoading }) {
  const [value, setValue] = useState('');
  const textareaRef = useRef(null);

  function handleInput(e) {
    setValue(e.target.value);
    // Auto-resize
    const ta = e.target;
    ta.style.height = 'auto';
    ta.style.height = `${ta.scrollHeight}px`;
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  function submit() {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setValue('');
    // Reset height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  }

  return (
    <form
      className="input-bar"
      onSubmit={(e) => { e.preventDefault(); submit(); }}
      aria-label="Message input"
    >
      <textarea
        ref={textareaRef}
        className="input-bar__textarea"
        value={value}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
        placeholder="Ask me about Maverick Companies..."
        disabled={isLoading}
        rows={1}
        aria-label="Type your message"
      />
      <button
        type="submit"
        className="input-bar__send"
        disabled={isLoading || !value.trim()}
        aria-label="Send message"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </form>
  );
}
