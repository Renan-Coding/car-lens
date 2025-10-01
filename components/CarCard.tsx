import Image from 'next/image';
import { SearchResult } from '@/lib/carService';

// As props que nosso componente irá receber.
interface CarCardProps {
  result: SearchResult;
}

// Helper para formatar o preço para R$
const formatPrice = (price: number) => {
  return price.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

// Componente para exibir a "tag" de status da busca
const MatchTypeTag = ({ type }: { type: SearchResult['matchType'] }) => {
  const baseClasses = 'absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full text-white';
  
  switch (type) {
    case 'ideal':
      return <div className={`${baseClasses} bg-green-500`}>Combinação Ideal</div>;
    case 'preco_acima':
      return <div className={`${baseClasses} bg-amber-500`}>Acima do seu orçamento</div>;
    case 'outra_localidade':
      return <div className={`${baseClasses} bg-blue-500`}>Encontrado em outra cidade</div>;
    case 'sugestao':
        return <div className={`${baseClasses} bg-purple-500`}>Sugestão para você</div>;
    default:
      return null;
  }
};

export default function CarCard({ result }: CarCardProps) {
  const { car, matchType } = result;

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

  return (
    <div className="relative border rounded-lg overflow-hidden shadow-lg bg-white transform hover:scale-105 transition-transform duration-300">
      <Image
        src={getCarImage(car.Name, car.Model)}
        alt={`${car.Name} ${car.Model}`}
        width={400}
        height={250}
        className="w-full h-48 object-cover"
      />
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{car.Name} {car.Model}</h3>
        <p className="text-gray-600 mt-1">{car.Location}</p>
        <p className="text-2xl font-light text-gray-900 mt-4">{formatPrice(car.Price)}</p>
      </div>

      <MatchTypeTag type={matchType} />
    </div>
  );
}