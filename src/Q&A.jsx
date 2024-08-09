import React, { useState, useRef, useEffect } from 'react';
import Header from './Header';
import { ArrowUp } from 'lucide-react';
import headshot from './images/Headshot.png';
import 'react-toastify/dist/ReactToastify.css';

const ThinkingAnimation = () => (
  <div className="flex justify-center items-center space-x-2 my-4">
    <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
    <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
  </div>
);

const ChatBubble = ({ type, content }) => (
  <div className={`flex ${type === 'question' ? 'justify-end' : 'justify-start items-start'} mb-4`}>
    {type === 'answer' && (
      <img src={headshot} alt="Will Foster" className="w-12 h-12 rounded-full mr-2 mt-1" />
    )}
    <div
      className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl p-3 rounded-2xl ${
        type === 'question' ? 'bg-blue-100' : 'bg-purple-100'
      }`}
    >
      <p className="text-sm text-black">{content}</p>
    </div>
  </div>
);

const QA = () => {
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const bottomRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setConversation([...conversation, { type: 'question', content: question }]);
    setQuestion('');
    setIsThinking(true);

    try {
      const response = await fetch('https://fosterpipeline.azurewebsites.net/pipeline', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: question }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setConversation(prev => [...prev, { type: 'answer', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setConversation(prev => [...prev, { type: 'answer', content: 'Sorry, there was an error processing your request.' }]);
    } finally {
      setIsThinking(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-white to-purple-200 text-black">
      <Header />
      <main className="pt-24 px-4 pb-24">
        <div className="max-w-4xl mx-auto">
          {conversation.map((item, index) => (
            <ChatBubble key={index} type={item.type} content={item.content} />
          ))}
          {isThinking && <ThinkingAnimation />}
          <div ref={bottomRef} />
        </div>
      </main>
      <form onSubmit={handleSubmit} className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-60 backdrop-blur-sm p-4">
        <div className="max-w-4xl mx-auto relative">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask me anything..."
            className="w-full p-3 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-black hover:text-gray-700 transition-colors"
          >
            <ArrowUp size={24} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default QA;