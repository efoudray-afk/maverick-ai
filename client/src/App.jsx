import './styles/App.css';
import './styles/Chat.css';
import Header from './components/Header';
import ChatWindow from './components/ChatWindow';
import InputBar from './components/InputBar';
import { useChat } from './hooks/useChat';

export default function App() {
  const { messages, isLoading, sendMessage } = useChat();

  return (
    <div className="app">
      <Header />
      <ChatWindow messages={messages} isLoading={isLoading} />
      <InputBar onSend={sendMessage} isLoading={isLoading} />
    </div>
  );
}
