'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isTyping?: boolean;
}

interface AIConsultantProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIConsultant({ isOpen, onClose }: AIConsultantProps) {
  const [messages, setMessages] = useState<Message[]>(() => {
    // Só mostra mensagem inicial no desktop
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      return [{
        id: '1',
        text: 'Olá! 👋 Sou sua consultora automotiva IA! Como posso ajudá-lo hoje? Posso recomendar carros, comparar modelos, tirar dúvidas técnicas ou dar dicas de compra!',
        isUser: false,
        timestamp: new Date()
      }];
    }
    return [];
  });
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return; // Adicionei return explícito

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Adicionar indicador de digitação
    const typingMessage: Message = {
      id: 'typing',
      text: '',
      isUser: false,
      timestamp: new Date(),
      isTyping: true
    };

    setMessages(prev => [...prev, typingMessage]);

    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await response.json();

      // Remover indicador de digitação e adicionar resposta
      setMessages(prev => {
        const withoutTyping = prev.filter(msg => msg.id !== 'typing');
        return [...withoutTyping, {
          id: Date.now().toString(),
          text: data.response || 'Desculpe, houve um erro. Tente novamente.',
          isUser: false,
          timestamp: new Date()
        }];
      });
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      setMessages(prev => {
        const withoutTyping = prev.filter(msg => msg.id !== 'typing');
        return [...withoutTyping, {
          id: Date.now().toString(),
          text: 'Desculpe, houve um erro de conexão. Tente novamente.',
          isUser: false,
          timestamp: new Date()
        }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickQuestions = [
    '🚗 Qual o melhor carro até R$ 100mil?',
    '⚡ Carros mais econômicos de 2024',
    '🔧 SUVs mais confiáveis',
    '💰 Como negociar o preço?',
    '🛡️ Seguro para carros novos'
  ];

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="fixed md:bottom-4 md:right-4 md:w-96 md:h-[600px] max-md:inset-4 max-md:w-auto max-md:h-auto bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-blue-500/20 flex flex-col z-50 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                <img 
                  src="/carlens_logo.png" 
                  alt="CarLens Logo" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h3 className="font-bold text-white text-sm sm:text-base">CarLens AI</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-xs sm:text-sm text-blue-100">Online</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-2xl p-3 ${
                  message.isUser
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-gray-700 text-gray-100'
                }`}>
                  {message.isTyping ? (
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  ) : (
                    <>
                      <div className="text-sm whitespace-pre-wrap">{message.text}</div>
                      <div className={`text-xs mt-2 ${
                        message.isUser ? 'text-blue-100' : 'text-gray-400'
                      }`}>
                        {formatTime(message.timestamp)}
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-400 mb-2">💡 Perguntas populares:</p>
              <div className="flex flex-wrap gap-1">
                {quickQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputMessage(question.replace(/^[^\s]+\s/, ''))}
                    className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-2 py-1 rounded-full transition-colors"
                  >
                    {question.split(' ')[0]} {question.split(' ').slice(1, 4).join(' ')}...
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-gray-800 border-t border-gray-700">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua pergunta..."
                disabled={isLoading}
                className="flex-1 bg-gray-700 text-white placeholder-gray-400 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !inputMessage.trim()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <span>🚀</span>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}