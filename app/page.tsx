'use client'; 

import { motion } from 'framer-motion';
import { Bot, Zap, Target } from 'lucide-react';

export default function HomePage() {

  return (
    <main className="min-h-screen">
      {/* Hero Section com Efeitos Visuais */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        {/* Background com Efeitos Visuais */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-30"></div>
          
          {/* Elementos Flutuantes Animados */}
          <motion.div
            className="absolute top-20 left-10 w-4 h-4 bg-neon-blue rounded-full blur-sm"
            animate={{ 
              y: [0, -30, 0],
              x: [0, 20, 0],
              opacity: [0.3, 1, 0.3]
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-40 right-20 w-6 h-6 bg-neon-purple rounded-full blur-sm"
            animate={{ 
              y: [0, 40, 0],
              x: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-32 left-1/4 w-3 h-3 bg-neon-green rounded-full blur-sm"
            animate={{ 
              y: [0, -20, 0],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Gradiente Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-primary/20 to-dark-primary/60"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          {/* Título Principal com Animações */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black leading-none mb-6">
              <span className="block bg-gradient-to-r from-blue-400 via-purple-500 to-green-500 bg-clip-text text-transparent">
                CAR
              </span>
              <span className="block text-white mt-2">
                LENS
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <p className="text-xl md:text-2xl text-gray-300 font-light mb-4 max-w-3xl mx-auto leading-relaxed">
              Descubra seu próximo veículo com nossa 
              <span className="text-blue-400 font-semibold"> inteligência artificial</span> 
              <br />
              Encontre, compare e conquiste o carro dos seus sonhos!
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="mt-12"
          >
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-blue-500 rounded-full flex justify-center p-1">
            <motion.div 
              className="w-1.5 h-3 bg-blue-500 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <p className="text-xs text-gray-300 mt-3 font-medium">Role para buscar</p>
        </motion.div>
      </section>

      {/* Seção de Apresentação */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="bg-card-gradient backdrop-blur-xl rounded-2xl border border-dark-border/50 p-12 shadow-2xl">
              <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-text-primary mb-8">
                A revolução na 
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> busca de veículos</span>
              </h2>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed mb-8">
                CarLens utiliza inteligência artificial avançada para conectar você ao veículo perfeito. 
                Nossa plataforma analisa suas preferências, orçamento e necessidades para oferecer 
                recomendações personalizadas e precisas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <span className="inline-flex items-center px-6 py-3 bg-blue-500/20 text-blue-300 rounded-full text-sm font-semibold border border-blue-500/30">
                  <Bot className="w-4 h-4 mr-2" />
                  Powered by AI
                </span>
                <span className="inline-flex items-center px-6 py-3 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold border border-purple-500/30">
                  <Target className="w-4 h-4 mr-2" />
                  Resultados Precisos
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Seção de Features */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="font-orbitron text-4xl font-bold text-text-primary mb-6">
                Por que escolher o <span className="text-neon-blue">CarLens</span>?
              </h2>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                A plataforma mais avançada para encontrar seu próximo veículo com tecnologia de ponta
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Bot className="w-16 h-16" />,
                  title: 'IA Avançada',
                  description: 'Nossa inteligência artificial analisa milhares de veículos para encontrar a combinação perfeita para você',
                  color: 'neon-blue'
                },
                {
                  icon: <Zap className="w-16 h-16" />,
                  title: 'Busca Instantânea',
                  description: 'Resultados em tempo real com filtros inteligentes que se adaptam às suas preferências',
                  color: 'neon-purple'
                },
                {
                  icon: <Target className="w-16 h-16" />,
                  title: 'Precisão Total',
                  description: 'Encontre exatamente o que procura com nossa tecnologia de matching de alta precisão',
                  color: 'neon-green'
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="group relative bg-card-gradient backdrop-blur-xl rounded-2xl p-8 border border-dark-border/50 hover:border-neon-blue/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="mb-6 group-hover:scale-110 transition-transform duration-300 text-neon-blue">
                    {feature.icon}
                  </div>
                  <h3 className={`font-orbitron text-xl font-bold text-${feature.color} mb-4`}>
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Efeito de Glow no Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-${feature.color}/5 to-${feature.color}/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
    </main>
  );
}