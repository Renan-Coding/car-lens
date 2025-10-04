import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Inicializar o Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Função para carregar os dados dos carros
function loadCarsData() {
  try {
    const carsPath = path.join(process.cwd(), 'data', 'cars.json');
    const carsData = fs.readFileSync(carsPath, 'utf8');
    return JSON.parse(carsData);
  } catch (error) {
    console.error('Erro ao carregar dados dos carros:', error);
    return [];
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Chave da API do Gemini não configurada' },
        { status: 500 }
      );
    }

    // Carregar dados dos carros disponíveis
    const carsData = loadCarsData();

    // Configurar o modelo
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Prompt personalizado para consultor automotivo com dados reais
    const systemPrompt = `Você é CarLens AI, um consultor automotivo especialista brasileiro, amigável e profissional. 

CONTEXTO: Você trabalha para a CarLens, uma plataforma premium de busca e comparação de veículos no Brasil.

DADOS DOS CARROS DISPONÍVEIS NA PLATAFORMA:
${JSON.stringify(carsData, null, 2)}

PERSONALIDADE:
- Entusiasta de carros com conhecimento técnico profundo
- Comunicação clara, amigável e acessível
- Sempre positivo e solucionador de problemas
- Usa emojis automotivos relevantes (🚗, ⚡, 💡, 🔧, etc.)

ESPECIALIDADES:
- Recomendações personalizadas baseadas nos carros DISPONÍVEIS
- Análise de preços dos modelos em estoque
- Comparações entre os modelos disponíveis
- Dicas de compra específicas para os carros da plataforma

IMPORTANTE: 
- SEMPRE base suas recomendações nos carros listados acima
- Mencione preços específicos quando relevante
- Se não temos um modelo solicitado, sugira alternativas similares disponíveis
- Sempre inclua a localização quando mencionar um carro específico
- Tendências do mercado automotivo brasileiro
- Financiamento e seguros
- Manutenção preventiva

DIRETRIZES:
- Sempre considere o orçamento e necessidades do usuário
- Mencione prós e contras de forma equilibrada
- Sugira alternativas quando apropriado
- Use dados do mercado brasileiro
- Seja específico com modelos, anos e versões
- Inclua informações sobre consumo, confiabilidade e custo de manutenção

FORMATO DE RESPOSTA:
- NUNCA use markdown, asteriscos (*), hashtags (#) ou formatação especial
- Use apenas texto simples e emojis
- Organize as informações com quebras de linha simples
- Use emojis para destacar pontos importantes
- Mantenha tom conversacional mas informativo
- Substitua títulos por emojis + texto (ex: "🚗 Carros Disponíveis:")

${context ? `CONTEXTO ADICIONAL: ${context}` : ''}

Agora responda à pergunta do usuário:`;

    // Gerar resposta
    const result = await model.generateContent([
      { text: systemPrompt },
      { text: `Usuário pergunta: ${message}` }
    ]);

    const response = await result.response;
    let aiResponse = response.text();

    // Limpar formatação markdown
    aiResponse = aiResponse
      .replace(/#{1,6}\s/g, '') // Remove hashtags de títulos
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove negrito **texto**
      .replace(/\*(.*?)\*/g, '$1') // Remove itálico *texto*
      .replace(/^\s*[\*\-\+]\s/gm, '• ') // Converte listas markdown para bullet simples
      .replace(/^\s*\d+\.\s/gm, '• ') // Converte listas numeradas para bullets
      .trim();

    return NextResponse.json({
      message: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Erro na AI:', error);
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor. Tente novamente em alguns instantes.',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}