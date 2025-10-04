'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdvancedFiltersProps {
  onFiltersChange: (filters: FilterState) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export interface FilterState {
  priceRange: { min: number; max: number };
  year: { min: number; max: number };
  mileage: { min: number; max: number };
  fuelType: string[];
  transmission: string[];
  bodyType: string[];
  brand: string[];
  location: string[];
  features: string[];
}

const initialFilters: FilterState = {
  priceRange: { min: 30000, max: 300000 },
  year: { min: 2018, max: 2024 },
  mileage: { min: 0, max: 100000 },
  fuelType: [],
  transmission: [],
  bodyType: [],
  brand: [],
  location: [],
  features: []
};

export default function AdvancedFilters({ onFiltersChange, isOpen, onToggle }: AdvancedFiltersProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [activeTab, setActiveTab] = useState('price');

  const handleFilterChange = (category: keyof FilterState, value: unknown) => {
    const updatedFilters = { ...filters, [category]: value };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleArrayFilter = (category: keyof FilterState, item: string) => {
    const currentArray = filters[category] as string[];
    const updatedArray = currentArray.includes(item)
      ? currentArray.filter(i => i !== item)
      : [...currentArray, item];
    
    handleFilterChange(category, updatedArray);
  };

  const clearAllFilters = () => {
    setFilters(initialFilters);
    onFiltersChange(initialFilters);
  };

  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  };

  const RangeSlider = ({ 
    label, 
    min, 
    max, 
    value, 
    onChange, 
    step = 1000,
    formatValue = (v: number) => v.toString()
  }: {
    label: string;
    min: number;
    max: number;
    value: { min: number; max: number };
    onChange: (value: { min: number; max: number }) => void;
    step?: number;
    formatValue?: (value: number) => string;
  }) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-sm font-semibold text-neon-blue">{label}</label>
        <div className="text-xs text-text-secondary">
          {formatValue(value.min)} - {formatValue(value.max)}
        </div>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value.min}
          onChange={(e) => onChange({ ...value, min: parseInt(e.target.value) })}
          className="absolute w-full h-2 bg-dark-secondary rounded-lg appearance-none cursor-pointer slider-thumb"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value.max}
          onChange={(e) => onChange({ ...value, max: parseInt(e.target.value) })}
          className="absolute w-full h-2 bg-dark-secondary rounded-lg appearance-none cursor-pointer slider-thumb"
        />
      </div>
    </div>
  );

  const CheckboxGroup = ({ 
    title, 
    options, 
    selected, 
    onChange 
  }: {
    title: string;
    options: string[];
    selected: string[];
    onChange: (item: string) => void;
  }) => (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-neon-purple">{title}</h4>
      <div className="grid grid-cols-2 gap-2">
        {options.map((option) => (
          <label
            key={option}
            className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
              selected.includes(option)
                ? 'bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 border border-neon-purple'
                : 'bg-dark-secondary/50 border border-dark-border hover:border-neon-purple/50'
            }`}
          >
            <input
              type="checkbox"
              checked={selected.includes(option)}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
              selected.includes(option)
                ? 'border-neon-purple bg-neon-purple'
                : 'border-dark-border'
            }`}>
              {selected.includes(option) && (
                <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
            <span className="text-sm text-text-secondary">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );

  const tabs = [
    { id: 'price', label: '💰 Preço & Ano', icon: '💰' },
    { id: 'specs', label: '⚙️ Especificações', icon: '⚙️' },
    { id: 'location', label: '📍 Localização', icon: '📍' },
    { id: 'features', label: '✨ Recursos', icon: '✨' }
  ];

  return (
    <div className="relative">
      {/* Botão Toggle */}
      <button
        onClick={onToggle}
        className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
          isOpen
            ? 'bg-gradient-to-r from-neon-purple to-neon-blue text-white shadow-glow-purple'
            : 'bg-dark-secondary border border-dark-border text-text-secondary hover:border-neon-purple hover:text-neon-purple'
        }`}
      >
        <span>🔧</span>
        <span>Filtros Avançados</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ⌄
        </motion.span>
      </button>

      {/* Painel de Filtros */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full mt-4 left-0 right-0 bg-card-gradient backdrop-blur-xl rounded-2xl border border-dark-border/50 shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-dark-border/30">
              <div className="flex justify-between items-center">
                <h3 className="font-orbitron text-xl font-bold text-text-primary">
                  Filtros Avançados
                </h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={clearAllFilters}
                    className="text-sm text-neon-red hover:text-red-400 transition-colors duration-300"
                  >
                    🗑️ Limpar Tudo
                  </button>
                  <button
                    onClick={onToggle}
                    className="text-text-secondary hover:text-neon-purple transition-colors duration-300"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="p-6 border-b border-dark-border/30">
              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-neon-blue to-neon-purple text-white'
                        : 'bg-dark-secondary/50 text-text-secondary hover:text-neon-blue border border-dark-border hover:border-neon-blue'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span className="text-sm">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Conteúdo dos Filtros */}
            <div className="p-6 max-h-96 overflow-y-auto custom-scrollbar">
              <AnimatePresence mode="wait">
                {activeTab === 'price' && (
                  <motion.div
                    key="price"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <RangeSlider
                      label="💰 Faixa de Preço"
                      min={20000}
                      max={500000}
                      step={5000}
                      value={filters.priceRange}
                      onChange={(value) => handleFilterChange('priceRange', value)}
                      formatValue={formatPrice}
                    />
                    
                    <RangeSlider
                      label="📅 Ano do Veículo"
                      min={2010}
                      max={2024}
                      step={1}
                      value={filters.year}
                      onChange={(value) => handleFilterChange('year', value)}
                    />

                    <RangeSlider
                      label="🛣️ Quilometragem"
                      min={0}
                      max={200000}
                      step={5000}
                      value={filters.mileage}
                      onChange={(value) => handleFilterChange('mileage', value)}
                      formatValue={(v) => `${v.toLocaleString()} km`}
                    />
                  </motion.div>
                )}

                {activeTab === 'specs' && (
                  <motion.div
                    key="specs"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <CheckboxGroup
                      title="⛽ Tipo de Combustível"
                      options={['Flex', 'Gasolina', 'Diesel', 'Elétrico', 'Híbrido']}
                      selected={filters.fuelType}
                      onChange={(item) => handleArrayFilter('fuelType', item)}
                    />

                    <CheckboxGroup
                      title="⚙️ Transmissão"
                      options={['Manual', 'Automático', 'CVT', 'Semi-automático']}
                      selected={filters.transmission}
                      onChange={(item) => handleArrayFilter('transmission', item)}
                    />

                    <CheckboxGroup
                      title="🚗 Tipo de Carroceria"
                      options={['Sedan', 'Hatch', 'SUV', 'Pickup', 'Conversível', 'Wagon']}
                      selected={filters.bodyType}
                      onChange={(item) => handleArrayFilter('bodyType', item)}
                    />
                  </motion.div>
                )}

                {activeTab === 'location' && (
                  <motion.div
                    key="location"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <CheckboxGroup
                      title="📍 Localização"
                      options={['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Brasília', 'Campinas', 'Porto Alegre', 'Curitiba', 'Salvador']}
                      selected={filters.location}
                      onChange={(item) => handleArrayFilter('location', item)}
                    />

                    <CheckboxGroup
                      title="🏭 Marca"
                      options={['Toyota', 'Honda', 'Volkswagen', 'Chevrolet', 'Hyundai', 'BYD', 'Renault', 'Fiat', 'Jeep', 'Peugeot']}
                      selected={filters.brand}
                      onChange={(item) => handleArrayFilter('brand', item)}
                    />
                  </motion.div>
                )}

                {activeTab === 'features' && (
                  <motion.div
                    key="features"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    <CheckboxGroup
                      title="✨ Recursos e Equipamentos"
                      options={[
                        'Ar Condicionado',
                        'Direção Hidráulica', 
                        'Vidro Elétrico',
                        'Trava Elétrica',
                        'Alarme',
                        'Air Bag',
                        'ABS',
                        'Som Premium',
                        'Câmera de Ré',
                        'Sensores de Estacionamento',
                        'Teto Solar',
                        'Bancos de Couro'
                      ]}
                      selected={filters.features}
                      onChange={(item) => handleArrayFilter('features', item)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-dark-border/30 bg-dark-secondary/30">
              <div className="flex justify-between items-center">
                <div className="text-sm text-text-secondary">
                  {Object.values(filters).flat().filter(Boolean).length} filtros ativos
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={onToggle}
                    className="px-6 py-2 bg-dark-secondary text-text-secondary rounded-lg border border-dark-border hover:border-neon-blue hover:text-neon-blue transition-all duration-300"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={onToggle}
                    className="px-6 py-2 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-lg font-semibold hover:shadow-glow-blue transition-all duration-300"
                  >
                    Aplicar Filtros
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}