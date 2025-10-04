import fs from 'fs/promises';
import path from 'path';

// Define a estrutura de um objeto Carro, garantindo que todo o código que manipular um carro saiba quais propriedades esperar.
export interface Car {
  Name: string;
  Model: string;
  Image: string;
  Price: number;
  Location: string;
  Fuel?: string;
  Transmission?: string;
  Year?: string;
}

// Define os parâmetros que nossa função de busca pode receber.
export interface SearchParams {
  query?: string;
  location?: string;
  maxPrice?: number;
}

// Define o tipo de correspondência para cada resultado. Para que a interface possa reagir e exibir mensagens diferentes para cada caso.
export type MatchType = 'ideal' | 'preco_acima' | 'outra_localidade' | 'sugestao';

// Define a estrutura do resultado da busca, combinando o carro com o seu tipo de correspondência.
export interface SearchResult {
  car: Car;
  matchType: MatchType;
}

/**
 * Função principal para buscar carros com base em critérios.
 * Ela lê a base de dados e aplica uma lógica para classificar os resultados
 * de acordo com os casos de teste do desafio.
 * @param params - Os parâmetros de busca (query, location, maxPrice).
 * @returns Uma promessa que resolve para um array de SearchResult.
 */
// Dados dos carros inline para maior compatibilidade com Vercel
const carsData: Car[] = [
  {
    "Name": "BYD",
    "Model": "Dolphin",
    "Image": "byd_dolphin.jpg",
    "Price": 99990,
    "Location": "São Paulo"
  },
  {
    "Name": "Toyota",
    "Model": "Corolla",
    "Image": "toyota_corolla.jpg",
    "Price": 112000,
    "Location": "São Paulo"
  },
  {
    "Name": "Volkswagen",
    "Model": "T-Cross",
    "Image": "volkswagen_tcross.jpg",
    "Price": 118500,
    "Location": "Campinas"
  },
  {
    "Name": "Honda",
    "Model": "Civic",
    "Image": "honda_civic.jpg",
    "Price": 105000,
    "Location": "Rio de Janeiro"
  },
  {
    "Name": "Chevrolet",
    "Model": "Onix",
    "Image": "chevrolet_onix.jpg",
    "Price": 85000,
    "Location": "Belo Horizonte"
  },
  {
    "Name": "Hyundai",
    "Model": "HB20",
    "Image": "hyundai_hb20.jpg",
    "Price": 79000,
    "Location": "São Paulo"
  },
  {
    "Name": "Renault",
    "Model": "Kwid",
    "Image": "renault_kwid.jpg",
    "Price": 68990,
    "Location": "Curitiba"
  },
  {
    "Name": "Fiat",
    "Model": "Pulse",
    "Image": "fiat_pulse.jpg",
    "Price": 96000,
    "Location": "São Paulo"
  },
  {
    "Name": "Jeep",
    "Model": "Renegade",
    "Image": "jeep_renegade.jpg",
    "Price": 122000,
    "Location": "Porto Alegre"
  },
  {
    "Name": "Peugeot",
    "Model": "208",
    "Image": "peugeot_208.jpg",
    "Price": 87500,
    "Location": "São Paulo"
  }
];

export const searchCars = async (params: SearchParams): Promise<SearchResult[]> => {
  try {
    // Tenta carregar do arquivo primeiro, se falhar usa os dados inline
    let cars: Car[] = carsData;
    
    try {
      const filePath = path.join(process.cwd(), 'data', 'cars.json');
      const jsonData = await fs.readFile(filePath, 'utf-8');
      cars = JSON.parse(jsonData);
    } catch (fileError) {
      console.log('Usando dados inline:', fileError);
    }

  // Normaliza os inputs do usuário para uma busca mais flexível
  const query = params.query?.trim().toLowerCase();
  const location = params.location?.trim().toLowerCase();
  const maxPrice = params.maxPrice;

  // Se não houver nenhum critério de busca, retorna todos os carros como 'ideal'
  if (!query && !location && !maxPrice) {
    return cars.map(car => ({
      car,
      matchType: 'ideal' as MatchType
    }));
  }
  
  const results: SearchResult[] = [];
  const foundCars = new Set<string>(); // Para evitar duplicatas

  // Busca por correspondências diretas no nome ou modelo
  if (query) {
    const directMatches = cars.filter(car => 
      car.Name.toLowerCase().includes(query) || 
      car.Model.toLowerCase().includes(query)
    );

    for (const car of directMatches) {
      const carIdentifier = `${car.Name}-${car.Model}`;
      if (foundCars.has(carIdentifier)) continue;

      const locationMatch = !location || car.Location.toLowerCase().includes(location);
      const priceMatch = !maxPrice || car.Price <= maxPrice;

      if (locationMatch && priceMatch) {
        results.push({ car, matchType: 'ideal' });
      } else if (locationMatch && !priceMatch) {
        results.push({ car, matchType: 'preco_acima' });
      } else if (!locationMatch && priceMatch) {
        results.push({ car, matchType: 'outra_localidade' });
      }
      foundCars.add(carIdentifier);
    }
  }

  // Se não houver resultados diretos, busca por sugestões
  if (results.length === 0) {
    const suggestions = cars.filter(car => {
      const carIdentifier = `${car.Name}-${car.Model}`;
      if (foundCars.has(carIdentifier)) return false; // Já foi encontrado?

      const locationMatch = !location || car.Location.toLowerCase().includes(location);
      const priceMatch = maxPrice && (car.Price >= maxPrice * 0.8 && car.Price <= maxPrice * 1.2); // 20%

      return locationMatch || priceMatch;
    });

    for (const car of suggestions.slice(0, 3)) { // Limita a 3 sugestões
       results.push({ car, matchType: 'sugestao' });
       foundCars.add(`${car.Name}-${car.Model}`);
    }
  }

  return results;
  } catch (error) {
    console.error('Erro na função searchCars:', error);
    throw new Error(`Erro ao buscar carros: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
  }
};