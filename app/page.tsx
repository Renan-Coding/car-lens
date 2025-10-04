'use client'; 

import { useState } from 'react';
import { motion } from 'framer-motion';
import CarCard from '@/components/CarCard';
import { searchCarsAction } from '@/app/actions'; 
import type { SearchResult, SearchParams } from '@/lib/carService';

export default function HomePage() {
  const [params, setParams] = useState<SearchParams>({
    query: '',
    location: '',
    maxPrice: undefined
  });
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault(); 
    setIsLoading(true);
    setHasSearched(true);
    const searchResult = await searchCarsAction(params);
    setResults(searchResult);
    setIsLoading(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setParams(prevParams => ({
      ...prevParams,
      [name]: name === 'maxPrice' ? (value ? Number(value) : undefined) : value,
    }));
  };

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

      {/* Seção de Busca Avançada */}
      <section className="relative py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-orbitron text-4xl md:text-5xl font-bold text-text-primary mb-6">
              Encontre seu 
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> Veículo Ideal</span>
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Use nossa busca inteligente com filtros avançados para descobrir exatamente o que você procura
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <form onSubmit={handleSearch} className="bg-card-gradient backdrop-blur-xl rounded-2xl border border-dark-border/50 p-8 shadow-2xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Campo Marca/Modelo */}
                <div className="relative group">
                  <label className="text-sm font-semibold text-neon-blue mb-3 flex items-center">
                    🚗 Marca ou Modelo
                  </label>
                  <input
                    type="text"
                    name="query"
                    value={params.query}
                    onChange={handleInputChange}
                    placeholder="Ex: Toyota Corolla"
                    className="w-full p-4 bg-dark-secondary/50 border-2 border-dark-border rounded-xl focus:border-neon-blue focus:outline-none transition-all duration-300 text-text-primary placeholder-text-secondary/60 group-hover:border-neon-blue/50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 to-neon-purple/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Campo Localização */}
                <div className="relative group">
                  <label className="text-sm font-semibold text-neon-green mb-3 flex items-center">
                    📍 Localização
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={params.location}
                    onChange={handleInputChange}
                    placeholder="Ex: São Paulo"
                    className="w-full p-4 bg-dark-secondary/50 border-2 border-dark-border rounded-xl focus:border-neon-green focus:outline-none transition-all duration-300 text-text-primary placeholder-text-secondary/60 group-hover:border-neon-green/50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-green/5 to-neon-blue/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>

                {/* Campo Preço */}
                <div className="relative group">
                  <label className="text-sm font-semibold text-neon-purple mb-3 flex items-center">
                    💰 Preço Máximo
                  </label>
                  <input
                    type="number"
                    name="maxPrice"
                    value={params.maxPrice || ''}
                    onChange={handleInputChange}
                    placeholder="Ex: 150000"
                    className="w-full p-4 bg-dark-secondary/50 border-2 border-dark-border rounded-xl focus:border-neon-purple focus:outline-none transition-all duration-300 text-text-primary placeholder-text-secondary/60 group-hover:border-neon-purple/50"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/5 to-neon-green/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Botão de Busca */}
              <div className="text-center">
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="relative bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 px-12 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl "
                >
                  <span className="relative z-10 flex items-center justify-center space-x-3">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Buscando...</span>
                      </>
                    ) : (
                      <>
                        <span>Encontrar Carros</span>
                      </>
                    )}
                  </span>
                </button>
              </div>

            </form>
          </motion.div>
        </div>
      </section>

      {/* Seção de Resultados */}
      {hasSearched && (
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h3 className="font-orbitron text-3xl md:text-4xl font-bold text-text-primary mb-4">
                {results.length > 0 ? (
                  <>Encontramos <span className="text-neon-green">{results.length}</span> veículos para você</>
                ) : (
                  <>Nenhum resultado <span className="text-neon-red">encontrado</span></>
                )}
              </h3>
              {results.length > 0 && (
                <p className="text-text-secondary">
                  Explore as opções abaixo e encontre seu veículo ideal
                </p>
              )}
            </motion.div>

            {results.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {results.map((result, index) => (
                  <motion.div
                    key={`${result.car.Name}-${result.car.Model}`}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <CarCard result={result} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center py-20"
              >
                <div className="text-8xl mb-6">🔍</div>
                <h3 className="font-orbitron text-2xl font-bold text-text-primary mb-4">
                  Ops! Não encontramos resultados
                </h3>
                <p className="text-text-secondary mb-8 max-w-md mx-auto">
                  Tente ajustar seus filtros de busca ou procure por outros modelos de veículos
                </p>
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* Seção de Features quando não há busca */}
      {!hasSearched && (
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
                  icon: '🤖',
                  title: 'IA Avançada',
                  description: 'Nossa inteligência artificial analisa milhares de veículos para encontrar a combinação perfeita para você',
                  color: 'neon-blue'
                },
                {
                  icon: '⚡',
                  title: 'Busca Instantânea',
                  description: 'Resultados em tempo real com filtros inteligentes que se adaptam às suas preferências',
                  color: 'neon-purple'
                },
                {
                  icon: '🎯',
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
                  <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">
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
      )}
    </main>
  );
}