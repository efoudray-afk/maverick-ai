export default function TypingIndicator() {
  return (
    <div className="typing-indicator" aria-label="Maverick is typing">
      <div className="typing-indicator__avatar">M</div>
      <div className="typing-indicator__bubble">
        <span className="typing-indicator__dot" />
        <span className="typing-indicator__dot" />
        <span className="typing-indicator__dot" />
      </div>
    </div>
  );
}
