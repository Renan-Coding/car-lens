'use server'; 
import { searchCars, SearchParams } from "@/lib/carService";

// É uma função assíncrona que podemos chamar do nosso componente de cliente
export async function searchCarsAction(params: SearchParams) {
  try {
    const results = await searchCars(params);
    return results;
  } catch (error) {
    console.error('Erro na searchCarsAction:', error);
    throw error;
  }
}