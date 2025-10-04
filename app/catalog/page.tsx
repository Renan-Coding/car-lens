'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CarCard from '@/components/CarCard';
import { searchCarsAction } from '@/app/actions';
import type { SearchResult } from '@/lib/carService';

export default function CatalogPage() {
  const [cars, setCars] = useState<SearchResult[]>([]);
  const [filteredCars, setFilteredCars] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState('price-asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [maxPrice, setMaxPrice] = useState<number | undefined>(undefined);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadCars();
  }, []);

  useEffect(() => {
    sortCars();
  }, [cars, sortBy]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadCars = async () => {
    setIsLoading(true);
    try {
      const results = await searchCarsAction({ query: '', location: '', maxPrice: undefined });
      setCars(results);
    } catch (error) {
      console.error('Erro ao carregar carros:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const results = await searchCarsAction({ 
        query: searchQuery, 
        location: searchLocation, 
        maxPrice: maxPrice 
      });
      setCars(results);
    } catch (error) {
      console.error('Erro ao buscar carros:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sortCars = () => {
    let sorted = [...cars];

    // Ordenação
    sorted.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.car.Price - b.car.Price;
        case 'price-desc':
          return b.car.Price - a.car.Price;
        case 'brand':
          return a.car.Name.localeCompare(b.car.Name);
        default:
          return 0;
      }
    });

    setFilteredCars(sorted);
  };

  const getSortLabel = () => {
    switch (sortBy) {
      case 'price-asc':
        return 'Menor Preço';
      case 'price-desc':
        return 'Maior Preço';
      default:
        return 'Ordenar';
    }
  };

  const sortOptions = [
    { value: 'price-asc', label: 'Menor Preço' },
    { value: 'price-desc', label: 'Maior Preço' },
    ];

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
            Catálogo <span className="bg-gradient-to-r from-blue-500 to-purple-400 bg-clip-text text-transparent">Premium</span>
          </h1>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Explore nossa seleção completa de veículos premium com tecnologia de busca avançada
          </p>
        </motion.div>

        {/* Barra de Busca */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-card-gradient backdrop-blur-xl rounded-2xl border border-dark-border/50 p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Busca */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-neon-blue mb-2">Buscar veículo</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-3 bg-dark-secondary border border-dark-border rounded-lg text-text-primary focus:border-neon-blue transition-colors"
                placeholder="Ex: Toyota Corolla"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>

            {/* Localização */}
            <div>
              <label className="block text-sm font-semibold text-neon-green mb-2">Localização</label>
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full p-3 bg-dark-secondary border border-dark-border rounded-lg text-text-primary focus:border-neon-green transition-colors"
                placeholder="Ex: São Paulo"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>

            {/* Preço Máximo */}
            <div>
              <label className="block text-sm font-semibold text-neon-purple mb-2">Preço Máximo</label>
              <input
                type="number"
                value={maxPrice ?? ''}
                onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : undefined)}
                className="w-full p-3 bg-dark-secondary border border-dark-border rounded-lg text-text-primary focus:border-neon-purple transition-colors"
                placeholder="Ex: 150000"
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>

            {/* Botão de Busca */}
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full px-6 py-3 bg-blue text-white rounded-lg font-semibold hover:shadow-glow-blue transition-all duration-300"
              >
                🔍 Buscar
              </button>
            </div>
          </div>
        </motion.div>

        {/* Resultados e Ordenação */}
        <div className="flex justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-text-secondary">
              {isLoading ? 'Carregando...' : `${filteredCars.length} veículos encontrados`}
            </p>
          </motion.div>

          <div className="flex items-center space-x-4">
            <label className="text-sm font-semibold text-neon-blue">Ordenar por:</label>
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="px-4 py-2 bg-dark-secondary border border-dark-border rounded-lg text-text-primary hover:border-neon-blue transition-colors flex items-center space-x-2 min-w-[160px] justify-between"
              >
                <span>{getSortLabel()}</span>
                <span className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
              </button>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full mt-2 w-full bg-dark-secondary border border-dark-border rounded-lg overflow-hidden shadow-xl z-50"
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full px-4 py-3 text-left transition-colors ${
                          sortBy === option.value
                            ? 'bg-neon-blue/20 text-neon-blue'
                            : 'text-text-primary hover:bg-dark-primary/50 hover:text-neon-blue'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Grid de Carros */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-card-gradient rounded-2xl p-6 animate-pulse">
                <div className="bg-dark-secondary h-48 rounded-lg mb-4"></div>
                <div className="bg-dark-secondary h-6 rounded mb-2"></div>
                <div className="bg-dark-secondary h-4 rounded w-2/3 mb-4"></div>
                <div className="bg-dark-secondary h-8 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredCars.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredCars.map((car, index) => (
              <motion.div
                key={`${car.car.Name}-${car.car.Model}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <CarCard result={car} showMatchType={false} />
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
              Nenhum veículo encontrado
            </h3>
            <p className="text-text-secondary mb-8">
              Tente ajustar os filtros para encontrar mais opções
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSearchLocation('');
                setMaxPrice(undefined);
                loadCars();
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-glow-blue transition-all duration-300"
            >
              🔄 Limpar Busca
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}