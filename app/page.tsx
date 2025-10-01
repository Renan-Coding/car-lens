'use client'; 

import { useState } from 'react';
import CarCard from '@/components/CarCard'; // Componente de card
import { searchCarsAction } from '@/app/actions'; 
import type { SearchResult, SearchParams } from '@/lib/carService';

export default function HomePage() {
  const [params, setParams] = useState<SearchParams>({
    query: 'BYD',
    location: 'São Paulo',
    maxPrice: 100000
  });
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault(); 
    setIsLoading(true);
    setHasSearched(true);
    
    // Agora chamamos nossa Server Action segura.
    const searchResult = await searchCarsAction(params);
    setResults(searchResult);
    
    setIsLoading(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setParams(prevParams => ({
      ...prevParams,
      [name]: name === 'maxPrice' ? Number(value) : value,
    }));
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-gray-800">CarLens</h1>
        <p className="text-lg text-gray-500 mt-2">Sua lente de pesquisa para encontrar o carro perfeito.</p>
      </header>

      {/* --- Formulário de Busca --- */}
      <form onSubmit={handleSearch} className="mb-12 p-6 bg-white rounded-lg shadow-md flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          name="query"
          value={params.query}
          onChange={handleInputChange}
          placeholder="Nome ou modelo (ex: BYD Dolphin)"
          className="flex-grow p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="location"
          value={params.location}
          onChange={handleInputChange}
          placeholder="Localização (ex: São Paulo)"
          className="flex-grow p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="number"
          name="maxPrice"
          value={params.maxPrice || ''}
          onChange={handleInputChange}
          placeholder="Preço máximo"
          className="flex-grow p-3 border rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" disabled={isLoading} className="w-full md:w-auto bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors">
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      {/* --- Seção de Resultados --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {results.map(result => (
          <CarCard key={`${result.car.Name}-${result.car.Model}`} result={result} />
        ))}
      </div>

      {/* --- Mensagens de Feedback --- */}
      {!isLoading && hasSearched && results.length === 0 && (
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold text-gray-700">Nenhum resultado encontrado</h2>
          <p className="text-gray-500 mt-2">Tente ajustar os filtros da sua busca.</p>
        </div>
      )}
    </main>
  );
}