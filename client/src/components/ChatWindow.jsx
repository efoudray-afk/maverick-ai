import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

export default function ChatWindow({ messages, isLoading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <main className="chat-window" aria-live="polite" aria-label="Chat messages">
      {messages.map((msg, i) => (
        <MessageBubble
          key={i}
          role={msg.role}
          content={msg.content}
          time={msg.time ?? new Date()}
        />
      ))}
      {isLoading && <TypingIndicator />}
      <div ref={bottomRef} />
    </main>
  );
}
