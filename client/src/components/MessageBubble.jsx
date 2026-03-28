import ReactMarkdown from 'react-markdown';

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function MessageBubble({ role, content, time }) {
  const isAssistant = role === 'assistant';

  return (
    <div className={`message message--${role}`}>
      {isAssistant && (
        <div className="message__avatar" aria-hidden="true">M</div>
      )}
      <div className="message__body">
        <div className="message__bubble">
          {isAssistant ? (
            <ReactMarkdown
              components={{
                a: ({ href, children }) => (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          ) : (
            content
          )}
        </div>
        <span className="message__time">{formatTime(time)}</span>
      </div>
    </div>
  );
}
