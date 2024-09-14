import React, { useState, useRef, useEffect, useContext } from 'react';
import Header from './Header';
import { ArrowUp } from 'lucide-react';
import headshot from './images/Headshot.png';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeContext } from './ThemeContext';

const ThinkingAnimation = () => {
  const bounceKeyframes = `
    @keyframes bounce-enhanced {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(2px); }
    }
  `;

  const dotStyle = (delay) => ({
    width: '8px',
    height: '8px',
    backgroundColor: '#4B5563', // gray-600
    borderRadius: '50%',
    animation: 'bounce-enhanced 0.75s infinite',
    animationDelay: delay,
  });

  return (
    <div className="relative">
      <style>{bounceKeyframes}</style>
      <div className="flex items-center space-x-1 bg-white dark:bg-gray-700 rounded-full p-2 shadow-md">
        <div style={dotStyle('0s')}></div>
        <div style={dotStyle('0.2s')}></div>
        <div style={dotStyle('0.4s')}></div>
      </div>
      <div className="absolute -bottom-1.5 left-3 w-3 h-3 bg-white dark:bg-gray-700 transform rotate-45 shadow-md"></div>
    </div>
  );
};

const ChatBubble = ({ type, content, isThinking }) => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div className={`flex ${type === 'question' ? 'justify-end' : 'justify-start items-start'} mb-4`}>
      {type === 'answer' && (
        <div className="relative">
          <img src={headshot} alt="Will Foster" className="w-12 h-12 rounded-full mr-2 mt-1" />
          {isThinking && (
            <div className="absolute -top-10 -right-2">
              <ThinkingAnimation />
            </div>
          )}
        </div>
      )}
      <div
        className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl p-3 rounded-2xl ${
          type === 'question' 
            ? 'bg-blue-100 dark:bg-blue-900' 
            : 'bg-purple-100 dark:bg-purple-900'
        }`}
      >
        <p className={`text-sm ${isDarkTheme ? 'text-white' : 'text-black'}`}>{content}</p>
      </div>
    </div>
  );
};

const QA = () => {
  const [question, setQuestion] = useState('');
  const [conversation, setConversation] = useState([]);
  const [streamingAnswer, setStreamingAnswer] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const bottomRef = useRef(null);
  const { isDarkTheme } = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
  
    setConversation(prev => [...prev, { type: 'question', content: question }]);
    setQuestion('');
    setStreamingAnswer('');
    setIsThinking(true);
  
    try {
      const response = await fetch('https://port-pipeline.azurewebsites.net/api/http_trigger?', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query: question,
          history: conversation.map(item => `${item.type}: ${item.content}`).join('\n')
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const jsonResponse = await response.json();
      if (jsonResponse && jsonResponse.response) {
        const fullAnswer = jsonResponse.response;
        for (let i = 0; i < fullAnswer.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 30)); // Adjust the delay as needed
          setStreamingAnswer(prev => prev + fullAnswer[i]);
        }
        setConversation(prev => [...prev, { type: 'answer', content: fullAnswer }]);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error details:', error);
      setConversation(prev => [...prev, { type: 'answer', content: `Sorry, there was an error processing your request. Error details: ${error.message}` }]);
    } finally {
      setStreamingAnswer('');
      setIsThinking(false);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation, streamingAnswer]);

  return (
    <div className={`min-h-screen ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-200 via-white to-purple-200 text-black'}`}>
      <Header />
      <main className="pt-24 px-4 pb-24">
        <div className="max-w-4xl mx-auto">
          {conversation.map((item, index) => (
            <ChatBubble key={index} type={item.type} content={item.content} />
          ))}
          {(isThinking || streamingAnswer) && (
            <ChatBubble 
              type="answer" 
              content={streamingAnswer || ' '} 
              isThinking={isThinking}
            />
          )}
          <div ref={bottomRef} />
        </div>
      </main>
      <form onSubmit={handleSubmit} className={`fixed bottom-0 left-0 right-0 ${isDarkTheme ? 'bg-gray-800' : 'bg-white'} bg-opacity-60 backdrop-blur-sm p-4`}>
        <div className="max-w-4xl mx-auto relative">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask me anything..."
            className={`w-full p-3 pr-12 rounded-full border ${isDarkTheme ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'} focus:outline-none focus:ring-2 focus:ring-blue-400`}
          />
          <button
            type="submit"
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 ${isDarkTheme ? 'text-white hover:text-gray-300' : 'text-black hover:text-gray-700'} transition-colors`}
          >
            <ArrowUp size={24} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default QA;