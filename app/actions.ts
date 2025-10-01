'use server'; 
import { searchCars, SearchParams } from "@/lib/carService";

// É uma função assíncrona que podemos chamar do nosso componente de cliente
export async function searchCarsAction(params: SearchParams) {
  const results = await searchCars(params);
  return results;
}