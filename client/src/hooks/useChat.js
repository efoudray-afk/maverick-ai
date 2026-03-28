import { useState } from 'react';
import { sendChatMessage } from '../utils/api';

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: "Hello! I'm Maverick, your guide to Maverick Companies. I can answer questions about our real estate divisions, portfolio companies, and help you get in touch with William Foudray to schedule a consultation. How can I help you today?",
};

export function useChat() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);

  async function sendMessage(text) {
    const userMessage = { role: 'user', content: text };
    const updatedMessages = [...messages, userMessage];

    // Optimistic update — show user message immediately
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const { reply } = await sendChatMessage(
        // Only send non-initial messages to API (skip the seeded greeting)
        updatedMessages.filter((m) => !(m === INITIAL_MESSAGE))
      );
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "I'm having trouble connecting right now. Please try again, or reach out directly at [wfoudray@maverickcos.com](mailto:wfoudray@maverickcos.com) or [(612) 715-8790](tel:+16127158790).",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return { messages, isLoading, sendMessage };
}
