'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AIConsultant from './AIConsultant';

export default function AIFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl flex items-center justify-center z-40 hover:scale-110 transition-transform duration-200"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        whileHover={{ 
          boxShadow: "0 0 30px rgba(59, 130, 246, 0.6)",
        }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="w-32 h-32 flex items-center justify-center">
          <img 
            src="/carlens_logo.png" 
            alt="CarLens Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Pulse Animation */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-blue-400"
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Notification Badge */}
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          AI
        </motion.div>
      </motion.button>

      {/* Tooltip - Oculto no mobile */}
      {!isOpen && (
        <motion.div
          className="hidden md:block fixed bottom-6 right-24 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg pointer-events-none"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2, duration: 0.3 }}
        >
          <div className="text-sm font-medium">💬 Precisa de ajuda?</div>
          <div className="text-xs text-gray-300">Fale com nossa IA especialista!</div>
          
          {/* Arrow */}
          <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
        </motion.div>
      )}

      <AIConsultant isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}