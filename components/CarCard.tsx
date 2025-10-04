'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, DollarSign, MapPin, Target, Heart, BarChart3 } from 'lucide-react';
import { SearchResult } from '@/lib/carService';

interface CarCardProps {
  result: SearchResult;
  showMatchType?: boolean;
}

const formatPrice = (price: number) => {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

const MatchTypeTag = ({ type }: { type: SearchResult['matchType'] }) => {
  const configs = {
    'ideal': {
      label: 'Combinação Perfeita',
      icon: <Sparkles className="w-4 h-4" />,
      gradient: 'from-neon-green to-emerald-400',
      glow: 'shadow-glow-green'
    },
    'preco_acima': {
      label: 'Acima do Orçamento',
      icon: <DollarSign className="w-4 h-4" />,
      gradient: 'from-neon-yellow to-amber-400',
      glow: 'shadow-glow-yellow'
    },
    'outra_localidade': {
      label: 'Outra Localidade',
      icon: <MapPin className="w-4 h-4" />,
      gradient: 'from-neon-blue to-blue-400',
      glow: 'shadow-glow-blue'
    },
    'sugestao': {
      label: 'Sugestão Especial',
      icon: <Target className="w-4 h-4" />,
      gradient: 'from-neon-purple to-purple-400',
      glow: 'shadow-glow-purple'
    }
  };

  const config = configs[type];
  if (!config) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className={`absolute top-4 right-4 bg-gradient-to-r ${config.gradient} text-white text-xs font-bold px-3 py-1.5 rounded-full ${config.glow} z-10 flex items-center space-x-1`}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </motion.div>
  );
};

// Função para mapear o nome e modelo do carro para a imagem correta
const getCarImage = (name: string, model: string) => {
  const carKey = `${name.toLowerCase()}_${model.toLowerCase()}`;
  
  const imageMap: { [key: string]: string } = {
    'byd_dolphin': '/img_cars/byd_dolphin.jpg',
    'toyota_corolla': '/img_cars/toyota_corolla.jpg',
    'volkswagen_t-cross': '/img_cars/volkswagen_tcross.jpg',
    'honda_civic': '/img_cars/honda_civic.jpg',
    'chevrolet_onix': '/img_cars/chevrolet_onix.jpg',
    'hyundai_hb20': '/img_cars/hyundai_hb20.jpg',
    'renault_kwid': '/img_cars/renault_kwid.jpg',
    'fiat_pulse': '/img_cars/fiat_pulse.jpg',
    'jeep_renegade': '/img_cars/jeep_renegade.jpg',
    'peugeot_208': '/img_cars/peugeot_208.jpg',
  };
  
  return imageMap[carKey] || '/img_cars/byd_dolphin.jpg';
};

// Função para obter o tipo de combustível baseado na marca/modelo
const getCarFuel = (car: SearchResult['car']) => {
  if (car.Fuel) return car.Fuel;
  
  // Dados baseados nas características reais dos carros
  const fuelMap: { [key: string]: string } = {
    'byd_dolphin': 'Elétrico',
    'toyota_corolla': 'Flex',
    'volkswagen_t-cross': 'Flex',
    'honda_civic': 'Flex',
    'chevrolet_onix': 'Flex',
    'hyundai_hb20': 'Flex',
    'renault_kwid': 'Flex',
    'fiat_pulse': 'Turbo Flex',
    'jeep_renegade': 'Diesel',
    'peugeot_208': 'Flex',
  };
  
  const carKey = `${car.Name.toLowerCase()}_${car.Model.toLowerCase()}`;
  return fuelMap[carKey] || 'Flex';
};

// Função para obter o tipo de transmissão
const getCarTransmission = (car: SearchResult['car']) => {
  if (car.Transmission) return car.Transmission;
  
  const transmissionMap: { [key: string]: string } = {
    'byd_dolphin': 'Automático',
    'toyota_corolla': 'CVT',
    'volkswagen_t-cross': 'Automático',
    'honda_civic': 'CVT',
    'chevrolet_onix': 'Manual',
    'hyundai_hb20': 'Manual',
    'renault_kwid': 'Manual',
    'fiat_pulse': 'Automático',
    'jeep_renegade': 'Automático',
    'peugeot_208': 'Automático',
  };
  
  const carKey = `${car.Name.toLowerCase()}_${car.Model.toLowerCase()}`;
  return transmissionMap[carKey] || 'Automático';
};

// Função para obter o ano do veículo
const getCarYear = (car: SearchResult['car']) => {
  if (car.Year) return car.Year;
  
  const yearMap: { [key: string]: string } = {
    'byd_dolphin': '2025',
    'toyota_corolla': '2022',
    'volkswagen_t-cross': '2023',
    'honda_civic': '2019',
    'chevrolet_onix': '2024',
    'hyundai_hb20': '2024',
    'renault_kwid': '2026',
    'fiat_pulse': '2025',
    'jeep_renegade': '2021',
    'peugeot_208': '2026',
  };
  
  const carKey = `${car.Name.toLowerCase()}_${car.Model.toLowerCase()}`;
  return yearMap[carKey] || '2023';
};

export default function CarCard({ result, showMatchType = true }: CarCardProps) {
  const { car, matchType } = result;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-card-gradient backdrop-blur-xl rounded-2xl border border-dark-border/50 overflow-hidden hover:border-neon-blue/50 transition-all duration-300 hover:shadow-car-card"
    >
      {/* Efeito de Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-transparent to-neon-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Container da Imagem com Overlay */}
      <div className="relative overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Image
            src={getCarImage(car.Name, car.Model)}
            alt={`${car.Name} ${car.Model}`}
            width={400}
            height={250}
            className="w-full h-56 object-cover"
          />
        </motion.div>
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-primary/80 via-transparent to-transparent"></div>
        
        {/* Ícones de Ação no Hover */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute top-4 left-4 flex space-x-2"
        >
          <button className="w-10 h-10 bg-dark-secondary/80 backdrop-blur-sm rounded-full flex items-center justify-center text-neon-blue hover:bg-neon-blue hover:text-white transition-all duration-300">
            <Heart className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 bg-dark-secondary/80 backdrop-blur-sm rounded-full flex items-center justify-center text-neon-purple hover:bg-neon-purple hover:text-white transition-all duration-300">
            <BarChart3 className="w-5 h-5" />
          </button>
        </motion.div>
      </div>

      {/* Conteúdo do Card */}
      <div className="relative p-6">
        {/* Título e Marca */}
        <div className="mb-4">
          <h3 className="font-orbitron text-xl font-bold text-text-primary group-hover:text-neon-blue transition-colors duration-300">
            <span className="font-poppins font-normal text-text-secondary">{car.Name}</span> {car.Model}
          </h3>
        </div>

        {/* Localização com Ícone */}
        <div className="flex items-center space-x-2 mb-4 text-text-secondary">
          <MapPin className="w-4 h-4 text-neon-green" />
          <span className="text-sm font-medium">{car.Location}</span>
        </div>

        {/* Especificações Rápidas */}
        <div className="flex justify-between items-center mb-4 text-xs">
          <div className="flex items-center space-x-1 bg-dark-secondary/50 px-3 py-1 rounded-full">
            <span className="text-text-secondary">{getCarFuel(car)}</span>
          </div>
          <div className="flex items-center space-x-1 bg-dark-secondary/50 px-3 py-1 rounded-full">
            <span className="text-text-secondary">{getCarTransmission(car)}</span>
          </div>
          <div className="flex items-center space-x-1 bg-dark-secondary/50 px-3 py-1 rounded-full">
            <span className="text-text-secondary">{getCarYear(car)}</span>
          </div>
        </div>

        {/* Preço com Destaque */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-text-secondary mb-1">Preço à vista</p>
            <p className="font-orbitron text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              {formatPrice(car.Price)}
            </p>
          </div>

        </div>

      </div>

      {/* Tag de Matching */}
      {showMatchType && <MatchTypeTag type={matchType} />}

    </motion.div>
  );
}