# CarLens - Plataforma Automotiva Inteligente

Uma plataforma moderna e completa para busca, comparação e descoberta de carros. 

## 🚀 Demonstração Live

**[Acesse CarLens](https://car-lens-seven.vercel.app/)**  

*Deploy otimizado no Vercel para máxima performance*

## 🤖 CarLens AI Consultant

**Consultora automotiva personalizada** que revoluciona sua experiência de compra!

- **Recomendações Personalizadas**: Sugestões baseadas em suas necessidades e orçamento
- **Análise de Mercado**: Comparação de preços e oportunidades em tempo real
- **Consultoria Técnica**: Dúvidas sobre mecânica, manutenção e especificações
- **Comparações Inteligentes**: Análise entre modelos diferentes
- **Disponibilidade 24/7**: Assistência instantânea com interface conversacional moderna
- **Responsividade Mobile**: Chat otimizado para todos os celulares

## ✨ Funcionalidades Principais

- **Busca Avançada**: Sistema de busca com filtros (marca, modelo, localização, preço)
- **Catálogo Completo**: Navegação por todos os veículos disponíveis
- **Comparador**: Compare até 2 veículos lado a lado com análise detalhada
- **IA Consultora**: Chat inteligente com botão flutuante e página dedicada
- **Performance**: Otimizado com Next.js, React e Vercel Edge Network

## 🚀 Deploy & Infraestrutura

### **Vercel**
**CarLens** está hospedado no **Vercel** para performance e confiabilidade:

✅ **Otimização Nativa Next.js 15**  
✅ **Auto-scaling Serverless** - Suporta picos de tráfego  
✅ **HTTPS Automático** - Segurança por padrão  
✅ **Deploy Contínuo** - Atualizações automáticas via Git  

### **Como Fazer Deploy**

#### 1. **Preparar Repositório**
```bash
# Clone o projeto
git clone https://github.com/seu-usuario/car-lens
cd car-lens

# Instale dependências
npm install

# Teste localmente (opcional)
npm run dev
```

#### 2. **Deploy no Vercel**
```bash
# Via Dashboard Web

1. Acesse vercel.com
2. Import Git Repository
3. Selecione car-lens
4. Deploy automático!
```

#### 3. **Configurar IA**
Para ativar a IA, configure no Vercel Dashboard:
```env
# Settings → Environment Variables
GEMINI_API_KEY=sua_chave_google_gemini
```

**Obter chave**: [Google AI Studio](https://makersuite.google.com/app/apikey)

### **Performance Vercel**
- **Build Time**: ~40s
- **Global CDN**: <100ms latency worldwide  
- **Uptime**: 99.99% SLA garantido
- **Bandwidth**: 100GB/mês no plano gratuito

## 🛠️ Stack Tecnológico

### **Frontend & Framework**
- **Next.js 15.4**
- **React 19.1**
- **TypeScript**
- **Tailwind CSS**

### **IA & Backend**
- **Google Gemini AI**
- **API Routes**
- **Server Actions** 

### **UX & Animações**
- **Framer Motion**
- **Lucide React**
- **Responsive Design**
- **Glassmorphism**

## 📁 Estrutura do Projeto

```
car-lens/
├── app/                    
│   ├── ai/                
│   ├── catalog/           
│   ├── compare/           
│   ├── api/ai/           
│   ├── actions.ts         
│   └── layout.tsx         
├── components/            
│   ├── AIConsultant.tsx  
│   ├── AIFloatingButton.tsx 
│   ├── AdvancedFilters.tsx 
│   └── CarCard.tsx  
│   └── Navbar.tsx  
├── data/cars.json        
├── lib/                  
│   ├── carService.ts     
│   └── utils.ts          
└── public/               
    ├── carlens_logo.png  
    └── img_cars/         
```

## 🎨 Recursos de Design

- **Branding CarLens**: Logo personalizada
- **Paleta Neon**: Cores vibrantes 
- **Glassmorphism**: Efeitos backdrop-blur e transparências
- **Gradientes Dinâmicos**: Fundos animados e transições fluidas
- **Mobile**: Interface otimizada para smartphones e tablets
- **Micro-interações**: Hover effects, loading states e animações contextuais
- **Sistema de Grid**: Layout responsivo com Tailwind CSS Grid
- **Typography**: Fontes Inter e Poppins para legibilidade perfeita

### Métodos de Acesso IA Consultora
1. **Botão Flutuante**: Clique no ícone CarLens no canto inferior direito
2. **Página Dedicada**: Visite `/ai` para experiência completa

### Exemplos de Conversação
- *"Qual o melhor carro até R$ 100mil para família?"*
- *"Preciso de um SUV econômico e confiável"*
- *"Como negociar o preço de um carro usado?"*
- *"Diferenças entre Honda Civic e Toyota Corolla"*
- *"Carros automáticos mais econômicos de 2024"*
- *"Dicas de financiamento e documentação"*

### Recursos Especiais
- **Chat Conversacional**: Interface moderna com typing indicators
- **Perguntas Rápidas**: Sugestões contextuais para começar
- **Mobile Otimizado**: Modal full-screen em dispositivos móveis

## 📈 Melhorias Futuras

### Futuro 🔮
- [ ] Adição de variedades de automóveis
- [ ] Sistema de agendamento de test drives
- [ ] Notificações push para ofertas
- [ ] Chat com vendedores reais
- [ ] App mobile nativo (React Native)
- [ ] Sistema de reviews e avaliações

## 💼 Plano de Negócios

&emsp; A visão para o CarLens é ir além de um simples buscador e se estabelecer como um ecossistema automotivo, focado em dados e na experiência do usuário. A estratégia de negócios se baseia em um modelo B2B2C (Business-to-Business-to-Consumer), onde a plataforma permanece gratuita para o consumidor final, enquanto a monetização ocorre através de parcerias com players do setor automotivo.

### Modelo de Negócios
O modelo de negócios é variado, projetado para criar valor tanto para os usuários quanto para os parceiros comerciais.

Principal(B2B): Geração de Leads qualificados para concessionárias.

- Modelo Freemium: Concessionárias podem listar um número limitado de veículos gratuitamente para popular a plataforma.

- Planos Premium(Assinatura Mensal): Oferecemos planos pagos que incluem benefícios, podendo ser listagens ilimitadas e com maior destaque.

- Acesso a um dashboard com análises de dados (veículos mais vistos, perfis de busca).

Secundário(B2B): Publicidade e Parcerias Estratégicas.

- Financeiras e Seguradoras: Espaços publicitários e integrações para oferecer simulações de financiamento e cotações de seguro diretamente na página do veículo, gerando receita por CPC.

Fabricantes: Campanhas de branding para lançamentos de novos modelos, com banners de anúncios.

### Estratégia de Aquisição de Usuários

A aquisição será dividida em popular o catálogo  e atrair compradores.

Para construir a oferta, realizaria parcerias iniciais, tendo uma abordagem direta a um grupo selecionado de concessionárias em uma cidade-alvo (ex: Guarulhos), oferecendo 6 meses de plano Premium gratuito. O objetivo é garantir um inventário inicial.

Já para gerar demanda, criaria conteúdo otimizado para buscadores, focado nas dores do comprador. Artigos, vídeos, com temas como "Melhores SUVs até R$ 120 mil", "Honda Civic vs. Toyota Corolla: Análise completa", "Como a IA pode te ajudar a escolher um carro". Além de atuar com trafego pago, fazendo campanhas segmentadas para usuários com alta intenção de compra, que buscam por modelos específicos.


### Estimativa de CAC (Custo de Aquisição de Cliente)

CAC do Usuário Final (B2C): De início, teria maior dependência do tráfego pago, estima-se um CAC entre R$ 8,00 e R$ 20,00 por usuário cadastrado.

CAC da Concessionária (B2B): Considerando o custo de um time de vendas inicial e marketing, o CAC por concessionária pagante é estimado entre R$ 400,00 e R$ 900,00.

### Proposta de LTV (Lifetime Value) e Maximização

Com um ticket médio estimado de R$ 350/mês e uma meta de retenção de 24 meses, o LTV por concessionária pode superar R$ 8.400.

Estratégias para Maximizar o LTV:

- Upsell: Criar tiers de planos com funcionalidades mais avançadas, como relatórios de inteligência de mercado.

Cross-sell: Oferecer pacotes de publicidade adicionais para parceiros financeiros e de seguros.

Sucesso do Cliente: Manter um time de suporte focado em ajudar as concessionárias a extrair o máximo valor da plataforma, garantindo a renovação da assinatura.

### Monetização Viável

- Assinaturas(SaaS) para Concessionárias

- Geração de Leads para parceiros financeiros, seguradoras e concessionárias.

- Publicidade segmentada, banners e conteúdo patrocinado de fabricantes e serviços automotivos.

### Estratégia de Retenção de Usuários

O ciclo de compra de um carro é demorado. Portanto, para manter o usuário engajado nesse intervalo, deve-se, transformar o AI Consultant em um "Assistente de Garagem", em que após a compra, o usuário poderia usar a IA para tirar dúvidas sobre manutenção, consumo de combustível, e até mesmo notificações "inteligentes", que enviam alertas de variação de preço para modelos que o usuário visitou.

Além disso, a implementação de newsletters, com dicas de conservação, notícias do setor e alertas sobre o "melhor momento para trocar de carro", com base na desvalorização do modelo atual do usuário. Por fim, a utilização de um sistema de avaliações, que visa incentivar os usuários a deixarem reviews sobre seus veículos e sobre as concessionárias, criando uma comunidade e um ciclo de conteúdo gerado pelo próprio usuário que atrai novos visitantes.