'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import AIConsultant from '@/components/AIConsultant';

export default function AIPage() {
  const [showDemo, setShowDemo] = useState(false);

  const features = [
    {
      icon: '🚗',
      title: 'Recomendações Personalizadas',
      description: 'Nossa IA analisa suas preferências e orçamento para sugerir os carros perfeitos para você.'
    },
    {
      icon: '💰',
      title: 'Análise de Preços',
      description: 'Compare preços em tempo real e descubra as melhores oportunidades do mercado automotivo.'
    },
    {
      icon: '🔧',
      title: 'Consultoria Técnica',
      description: 'Tire dúvidas sobre mecânica, manutenção, consumo e especificações técnicas dos veículos.'
    },
    {
      icon: '📊',
      title: 'Comparações Inteligentes',
      description: 'Compare modelos lado a lado com análise detalhada de prós e contras de cada veículo.'
    },
    {
      icon: '🛡️',
      title: 'Dicas de Segurança',
      description: 'Informações sobre seguros, documentação e cuidados na compra de veículos usados.'
    },
    {
      icon: '⚡',
      title: 'Respostas Instantâneas',
      description: 'Assistência 24/7 com respostas rápidas e precisas para todas suas dúvidas automotivas.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 pt-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-2">
            <Image
              src="/carlens_logo.png"
              alt="CarLens Logo"
              width={132}
              height={132}
              className="mx-auto"
            />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
            CarLens AI
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Sua consultora automotiva pessoal! </p>
          
          <motion.button
            onClick={() => setShowDemo(true)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 shadow-2xl hover:shadow-blue-500/25"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Experimente Agora !
          </motion.button>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-600/30 mb-1"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Como funciona?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Nossa IA foi treinada com dados do mercado automotivo e está sempre atualizada
              com as últimas tendências, preços e lançamentos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6"
            >
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-lg font-bold text-white mb-2">1. Converse</h3>
              <p className="text-gray-300">Descreva o que você procura em um carro</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6"
            >
              <div className="text-5xl mb-4">🧠</div>
              <h3 className="text-lg font-bold text-white mb-2">2. IA Analisa</h3>
              <p className="text-gray-300">Nossa IA processa suas necessidades</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="p-6"
            >
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-lg font-bold text-white mb-2">3. Recomendação</h3>
              <p className="text-gray-300">Receba sugestões personalizadas</p>
            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* Demo Chat */}
      {showDemo && (
        <AIConsultant isOpen={showDemo} onClose={() => setShowDemo(false)} />
      )}
    </div>
  );
}