'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Car {
  name: string;
  model: string;
  price: number;
  image: string;
  specs: {
    engine: string;
    fuel: string;
    transmission: string;
    year: number;
    mileage: number;
    power: string;
    acceleration: string;
    topSpeed: string;
  };
  features: string[];
  pros: string[];
  cons: string[];
}

const sampleCars: Car[] = [
  {
    name: 'Toyota',
    model: 'Corolla',
    price: 112000,
    image: '/img_cars/toyota_corolla.jpg',
    specs: {
      engine: '2.0L 4-cilindros',
      fuel: 'Flex',
      transmission: 'CVT Automático',
      year: 2024,
      mileage: 0,
      power: '177 cv',
      acceleration: '9.2s (0-100km/h)',
      topSpeed: '200 km/h'
    },
    features: ['Central Multimídia', 'Ar Condicionado Digital', 'Câmera de Ré', 'Sensores de Estacionamento'],
    pros: ['Economia de combustível', 'Confiabilidade', 'Revenda garantida'],
    cons: ['Preço elevado', 'Porta-malas pequeno']
  },
  {
    name: 'Honda',
    model: 'Civic',
    price: 105000,
    image: '/img_cars/honda_civic.jpg',
    specs: {
      engine: '1.5L Turbo',
      fuel: 'Flex',
      transmission: 'CVT Automático',
      year: 2024,
      mileage: 0,
      power: '173 cv',
      acceleration: '8.9s (0-100km/h)',
      topSpeed: '195 km/h'
    },
    features: ['Honda Sensing', 'Teto Solar', 'Bancos de Couro', 'Sistema de Som Premium'],
    pros: ['Performance esportiva', 'Tecnologia avançada', 'Design moderno'],
    cons: ['Consumo na cidade', 'Manutenção cara']
  },
  {
    name: 'BYD',
    model: 'Dolphin',
    price: 99990,
    image: '/img_cars/byd_dolphin.jpg',
    specs: {
      engine: 'Elétrico',
      fuel: 'Elétrico',
      transmission: 'Automático',
      year: 2024,
      mileage: 0,
      power: '95 cv',
      acceleration: '10.9s (0-100km/h)',
      topSpeed: '150 km/h'
    },
    features: ['Sistema Multimídia', 'Carregamento Rápido', 'Painel Digital', 'Assistente de Voz'],
    pros: ['Zero emissões', 'Custo operacional baixo', 'Tecnologia moderna'],
    cons: ['Autonomia limitada', 'Infraestrutura de recarga']
  },
  {
    name: 'Volkswagen',
    model: 'T-Cross',
    price: 118500,
    image: '/img_cars/volkswagen_tcross.jpg',
    specs: {
      engine: '1.0L TSI Turbo',
      fuel: 'Flex',
      transmission: 'Automático',
      year: 2024,
      mileage: 0,
      power: '128 cv',
      acceleration: '10.7s (0-100km/h)',
      topSpeed: '185 km/h'
    },
    features: ['VW Play', 'Controle de Cruzeiro', 'Ar Digital', 'Sensor de Estacionamento'],
    pros: ['SUV compacto', 'Boa posição de dirigir', 'Tecnologia VW'],
    cons: ['Preço alto', 'Motor 1.0 na versão base']
  },
  {
    name: 'Chevrolet',
    model: 'Onix',
    price: 85000,
    image: '/img_cars/chevrolet_onix.jpg',
    specs: {
      engine: '1.0L Turbo',
      fuel: 'Flex',
      transmission: 'Automático',
      year: 2024,
      mileage: 0,
      power: '116 cv',
      acceleration: '10.5s (0-100km/h)',
      topSpeed: '180 km/h'
    },
    features: ['MyLink', 'Ar Condicionado', 'Direção Elétrica', 'Computador de Bordo'],
    pros: ['Preço acessível', 'Econômico', 'Espaço interno'],
    cons: ['Acabamento básico', 'Poucos equipamentos na versão base']
  },
  {
    name: 'Hyundai',
    model: 'HB20',
    price: 79000,
    image: '/img_cars/hyundai_hb20.jpg',
    specs: {
      engine: '1.0L Turbo',
      fuel: 'Flex',
      transmission: 'Manual',
      year: 2024,
      mileage: 0,
      power: '120 cv',
      acceleration: '10.2s (0-100km/h)',
      topSpeed: '182 km/h'
    },
    features: ['Central Multimídia Bluelink', 'Ar Condicionado', 'Vidros Elétricos', 'Rodas de Liga'],
    pros: ['Custo-benefício', 'Garantia de 5 anos', 'Conectividade'],
    cons: ['Design conservador', 'Espaço do porta-malas']
  },
  {
    name: 'Renault',
    model: 'Kwid',
    price: 68990,
    image: '/img_cars/renault_kwid.jpg',
    specs: {
      engine: '1.0L 3-cilindros',
      fuel: 'Flex',
      transmission: 'Manual',
      year: 2024,
      mileage: 0,
      power: '70 cv',
      acceleration: '13.5s (0-100km/h)',
      topSpeed: '165 km/h'
    },
    features: ['Central Media Evolution', 'Direção Elétrica', 'Computador de Bordo', 'Ar Condicionado'],
    pros: ['Mais barato', 'Econômico', 'Design aventureiro'],
    cons: ['Motor fraco', 'Poucos equipamentos de segurança']
  },
  {
    name: 'Fiat',
    model: 'Pulse',
    price: 96000,
    image: '/img_cars/fiat_pulse.jpg',
    specs: {
      engine: '1.0L Turbo',
      fuel: 'Flex',
      transmission: 'CVT',
      year: 2024,
      mileage: 0,
      power: '130 cv',
      acceleration: '9.8s (0-100km/h)',
      topSpeed: '190 km/h'
    },
    features: ['Uconnect', 'Ar Digital', 'Câmera de Ré', 'Controle de Estabilidade'],
    pros: ['SUV compacto', 'Bom desempenho', 'Visual moderno'],
    cons: ['Acabamento pode melhorar', 'Consumo no modo Sport']
  },
  {
    name: 'Jeep',
    model: 'Renegade',
    price: 122000,
    image: '/img_cars/jeep_renegade.jpg',
    specs: {
      engine: '1.3L Turbo',
      fuel: 'Flex',
      transmission: 'Automático',
      year: 2024,
      mileage: 0,
      power: '185 cv',
      acceleration: '8.7s (0-100km/h)',
      topSpeed: '200 km/h'
    },
    features: ['Uconnect', 'Teto Solar', 'Bancos em Couro', 'Sistema 4x4 (versões)'],
    pros: ['Visual marcante', 'Potência', 'Capacidade off-road'],
    cons: ['Preço elevado', 'Consumo alto']
  },
  {
    name: 'Peugeot',
    model: '208',
    price: 87500,
    image: '/img_cars/peugeot_208.jpg',
    specs: {
      engine: '1.0L 3-cilindros',
      fuel: 'Flex',
      transmission: 'Manual',
      year: 2024,
      mileage: 0,
      power: '75 cv',
      acceleration: '12.8s (0-100km/h)',
      topSpeed: '170 km/h'
    },
    features: ['Central Multimídia', 'I-Cockpit', 'Ar Condicionado', 'Controle de Velocidade'],
    pros: ['Design diferenciado', 'I-Cockpit único', 'Bom acabamento'],
    cons: ['Motor básico', 'Peças caras']
  }
];

export default function ComparePage() {
  const [selectedCars, setSelectedCars] = useState<Car[]>([]);
  const [comparisonMode, setComparisonMode] = useState('specs'); // specs, features, pros-cons
  const [isDropdown1Open, setIsDropdown1Open] = useState(false);
  const [isDropdown2Open, setIsDropdown2Open] = useState(false);
  const dropdown1Ref = useRef<HTMLDivElement>(null);
  const dropdown2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdown1Ref.current && !dropdown1Ref.current.contains(event.target as Node)) {
        setIsDropdown1Open(false);
      }
      if (dropdown2Ref.current && !dropdown2Ref.current.contains(event.target as Node)) {
        setIsDropdown2Open(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  // Análise dinâmica dos carros selecionados
  const comparison = useMemo(() => {
    if (selectedCars.length < 2) return null;
    
    const [car1, car2] = selectedCars;
    
    // Melhor preço
    const cheaper = car1.price < car2.price ? car1 : car2;
    
    // Melhor performance (baseado na potência)
    const power1 = parseInt(car1.specs.power);
    const power2 = parseInt(car2.specs.power);
    const morePowerful = power1 > power2 ? car1 : car2;
    
    // Mais econômico (menor preço ou elétrico)
    const moreEconomical = car1.specs.fuel === 'Elétrico' ? car1 : 
                           car2.specs.fuel === 'Elétrico' ? car2 : cheaper;
    
    return {
      cheaper,
      morePowerful,
      moreEconomical
    };
  }, [selectedCars]);

  const ComparisonCard = ({ car, index }: { car: Car; index: number }) => (
    <motion.div
      key={`${car.name}-${car.model}-${index}`}
      initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="bg-card-gradient backdrop-blur-xl rounded-2xl border border-dark-border/50 overflow-hidden"
    >
      {/* Header do Card */}
      <div className="relative">
        <Image
          src={car.image}
          alt={`${car.name} ${car.model}`}
          width={400}
          height={250}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-primary/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <h3 className="font-orbitron text-2xl font-bold text-text-primary">
            {car.name} <span className="text-neon-blue">{car.model}</span>
          </h3>
          <p className="font-orbitron text-xl font-bold text-neon-green">
            {formatPrice(car.price)}
          </p>
        </div>
      </div>

      {/* Conteúdo do Card */}
      <div className="p-6">
        <AnimatePresence mode="wait">
          {comparisonMode === 'specs' && (
            <motion.div
              key="specs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="font-orbitron text-lg font-bold text-neon-blue mb-4">Especificações</h4>
              <div className="space-y-3">
                {Object.entries(car.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-text-secondary capitalize text-sm">
                      {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                    </span>
                    <span className="text-text-primary font-semibold text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {comparisonMode === 'features' && (
            <motion.div
              key="features"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h4 className="font-orbitron text-lg font-bold text-neon-purple mb-4">Equipamentos</h4>
              <div className="space-y-2">
                {car.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <span className="text-neon-green">✅</span>
                    <span className="text-text-secondary text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {comparisonMode === 'pros-cons' && (
            <motion.div
              key="pros-cons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-4">
                <div>
                  <h4 className="font-orbitron text-sm font-bold text-neon-green mb-2 flex items-center">
                    ✅ Pontos Positivos
                  </h4>
                  <div className="space-y-1">
                    {car.pros.map((pro, idx) => (
                      <div key={idx} className="text-text-secondary text-xs flex items-center space-x-2">
                        <span className="text-neon-green">•</span>
                        <span>{pro}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-orbitron text-sm font-bold text-neon-red mb-2 flex items-center">
                    ⚠️ Pontos de Atenção
                  </h4>
                  <div className="space-y-1">
                    {car.cons.map((con, idx) => (
                      <div key={idx} className="text-text-secondary text-xs flex items-center space-x-2">
                        <span className="text-neon-red">•</span>
                        <span>{con}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-hero-gradient">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="font-orbitron text-5xl md:text-6xl font-black text-text-primary mb-6">
            <span className="bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-text text-transparent">Comparador</span>
            <span className="block text-3xl md:text-4xl mt-2 text-text-secondary font-light">
              Inteligente de Veículos
            </span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Compare especificações, recursos e vantagens lado a lado para tomar a melhor decisão
          </p>
        </motion.div>

        {/* Seleção de Carros */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-card-gradient backdrop-blur-xl rounded-2xl border border-dark-border/50 p-6 mb-8 relative z-50"
        >
          <h3 className="font-orbitron text-lg font-bold text-text-primary mb-4">
            Selecione os veículos para comparar
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Seletor Carro 1 */}
            <div className="relative z-50">
              <label className="block text-sm font-semibold text-neon-blue mb-2">
                Veículo 1
              </label>
              <div className="relative" ref={dropdown1Ref}>
                <button
                  onClick={() => {
                    setIsDropdown1Open(!isDropdown1Open);
                    setIsDropdown2Open(false);
                  }}
                  className="w-full px-4 py-3 bg-dark-secondary border border-dark-border rounded-lg text-text-primary hover:border-neon-blue transition-colors flex items-center justify-between relative z-50"
                >
                  <span className="truncate">
                    {selectedCars[0] 
                      ? `${selectedCars[0].name} ${selectedCars[0].model} - ${formatPrice(selectedCars[0].price)}`
                      : 'Selecione o primeiro veículo'
                    }
                  </span>
                  <span className={`transition-transform ml-2 flex-shrink-0 ${isDropdown1Open ? 'rotate-180' : ''}`}>▼</span>
                </button>
                
                <AnimatePresence>
                  {isDropdown1Open && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-2 w-full bg-dark-secondary border border-dark-border rounded-lg overflow-hidden shadow-2xl max-h-60 overflow-y-auto z-50"
                    >
                      {sampleCars.filter(car => 
                        !(selectedCars[1] && selectedCars[1].name === car.name && selectedCars[1].model === car.model)
                      ).map((car) => (
                        <button
                          key={`car1-${car.name}-${car.model}`}
                          onClick={() => {
                            setSelectedCars([car, selectedCars[1] || null].filter(Boolean) as Car[]);
                            setIsDropdown1Open(false);
                          }}
                          className={`w-full px-4 py-3 text-left transition-colors text-sm ${
                            selectedCars[0] && selectedCars[0].name === car.name && selectedCars[0].model === car.model
                              ? 'bg-neon-blue/20 text-neon-blue font-semibold'
                              : 'text-text-primary hover:bg-dark-primary/50 hover:text-neon-blue'
                          }`}
                        >
                          {car.name} {car.model} - {formatPrice(car.price)}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Seletor Carro 2 */}
            <div className="relative z-40">
              <label className="block text-sm font-semibold text-neon-purple mb-2">
                Veículo 2
              </label>
              <div className="relative" ref={dropdown2Ref}>
                <button
                  onClick={() => {
                    setIsDropdown2Open(!isDropdown2Open);
                    setIsDropdown1Open(false);
                  }}
                  className="w-full px-4 py-3 bg-dark-secondary border border-dark-border rounded-lg text-text-primary hover:border-neon-purple transition-colors flex items-center justify-between relative z-40"
                >
                  <span className="truncate">
                    {selectedCars[1] 
                      ? `${selectedCars[1].name} ${selectedCars[1].model} - ${formatPrice(selectedCars[1].price)}`
                      : 'Selecione o segundo veículo'
                    }
                  </span>
                  <span className={`transition-transform ml-2 flex-shrink-0 ${isDropdown2Open ? 'rotate-180' : ''}`}>▼</span>
                </button>
                
                <AnimatePresence>
                  {isDropdown2Open && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-2 w-full bg-dark-secondary border border-dark-border rounded-lg overflow-hidden shadow-2xl max-h-60 overflow-y-auto z-40"
                    >
                      {sampleCars.filter(car => 
                        !(selectedCars[0] && selectedCars[0].name === car.name && selectedCars[0].model === car.model)
                      ).map((car) => (
                        <button
                          key={`car2-${car.name}-${car.model}`}
                          onClick={() => {
                            const newCars = [selectedCars[0] || null, car].filter(Boolean) as Car[];
                            setSelectedCars(newCars);
                            setIsDropdown2Open(false);
                          }}
                          className={`w-full px-4 py-3 text-left transition-colors text-sm ${
                            selectedCars[1] && selectedCars[1].name === car.name && selectedCars[1].model === car.model
                              ? 'bg-neon-purple/20 text-neon-purple font-semibold'
                              : 'text-text-primary hover:bg-dark-primary/50 hover:text-neon-purple'
                          }`}
                        >
                          {car.name} {car.model} - {formatPrice(car.price)}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Espaçamento para garantir que dropdowns não sobreponham */}
        <div className="h-16 md:h-8"></div>

        {/* Estado Vazio ou Área de Comparação */}
        {selectedCars.length < 2 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: (isDropdown1Open || isDropdown2Open) ? 200 : 0
            }}
            transition={{ duration: 0.3 }}
            className="text-center py-20"
          >
            <div className="text-8xl mb-6">🚗</div>
            <h3 className="font-orbitron text-3xl font-bold text-text-primary mb-4">
              Pronto para Comparar?
            </h3>
            <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
              Selecione dois veículos acima para ver uma comparação detalhada lado a lado
            </p>
            <div className="flex justify-center items-center space-x-4 text-text-secondary">
              <div className="flex items-center space-x-2">
                <span className="w-8 h-8 bg-neon-blue/20 text-neon-blue rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <span>Escolha o primeiro veículo</span>
              </div>
              <span className="text-2xl">→</span>
              <div className="flex items-center space-x-2">
                <span className="w-8 h-8 bg-neon-purple/20 text-neon-purple rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <span>Escolha o segundo veículo</span>
              </div>
              <span className="text-2xl">→</span>
              <div className="flex items-center space-x-2">
                <span className="w-8 h-8 bg-neon-green/20 text-neon-green rounded-full flex items-center justify-center text-sm font-bold">✓</span>
                <span>Compare as especificações</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            className="flex flex-col lg:flex-row gap-8 mb-8 relative mt-8"
            animate={{ 
              y: (isDropdown1Open || isDropdown2Open) ? 200 : 0
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Controles de Visualização (Lateral) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:w-64 flex-shrink-0"
            >
              <div className="bg-card-gradient backdrop-blur-xl rounded-2xl border border-dark-border/50 p-6 sticky top-4 z-10">
                <h3 className="font-orbitron text-sm font-bold text-text-secondary mb-4 uppercase tracking-wider">
                  Modo de Visualização
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setComparisonMode('specs')}
                    className={`w-full px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                      comparisonMode === 'specs'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-glow-blue'
                        : 'bg-dark-secondary text-text-secondary hover:text-blue-500 hover:bg-dark-secondary/80'
                    }`}
                  >
                    🔧 Especificações
                  </button>
                  <button
                    onClick={() => setComparisonMode('features')}
                    className={`w-full px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                      comparisonMode === 'features'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-glow-blue'
                        : 'bg-dark-secondary text-text-secondary hover:text-blue-500 hover:bg-dark-secondary/80'
                    }`}
                  >
                    ⚙️ Equipamentos
                  </button>
                  <button
                    onClick={() => setComparisonMode('pros-cons')}
                    className={`w-full px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                      comparisonMode === 'pros-cons'
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-glow-blue'
                        : 'bg-dark-secondary text-text-secondary hover:text-blue-500 hover:bg-dark-secondary/80'
                    }`}
                  >
                    ⚖️ Prós e Contras
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Cards de Comparação */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {selectedCars.map((car, index) => (
                <ComparisonCard key={`comparison-${index}-${car.name}-${car.model}`} car={car} index={index} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Resultado da Comparação - Só aparece quando há 2 carros */}
        {selectedCars.length === 2 && comparison && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ 
              opacity: 1, 
              y: (isDropdown1Open || isDropdown2Open) ? 200 : 0 
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-card-gradient backdrop-blur-xl rounded-2xl border border-dark-border/50 p-8 text-center"
          >
            <h2 className="font-orbitron text-2xl font-bold text-text-primary mb-6">
              🏆 Resultado da Comparação
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-dark-secondary/50 rounded-xl p-6">
                <div className="text-3xl mb-2">💰</div>
                <h3 className="font-orbitron font-bold text-neon-green mb-2">Melhor Preço</h3>
                <p className="text-text-secondary text-sm">
                  {comparison.cheaper.name} {comparison.cheaper.model} - {formatPrice(comparison.cheaper.price)}
                </p>
              </div>
              
              <div className="bg-dark-secondary/50 rounded-xl p-6">
                <div className="text-3xl mb-2">⚡</div>
                <h3 className="font-orbitron font-bold text-neon-blue mb-2">Mais Potente</h3>
                <p className="text-text-secondary text-sm">
                  {comparison.morePowerful.name} {comparison.morePowerful.model} - {comparison.morePowerful.specs.power}
                </p>
              </div>
              
              <div className="bg-dark-secondary/50 rounded-xl p-6">
                <div className="text-3xl mb-2">🌱</div>
                <h3 className="font-orbitron font-bold text-neon-purple mb-2">Mais Econômico</h3>
                <p className="text-text-secondary text-sm">
                  {comparison.moreEconomical.name} {comparison.moreEconomical.model}
                  {comparison.moreEconomical.specs.fuel === 'Elétrico' ? ' - Zero emissões' : ''}
                </p>
              </div>
            </div>

          </motion.div>
        )}
      </div>
    </div>
  );
}