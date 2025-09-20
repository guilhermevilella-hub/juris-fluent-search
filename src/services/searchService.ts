import OpenAI from "openai";

// Initialize OpenAI client with API key from localStorage (for development)
// In production, this should come from a secure backend
const openai = new OpenAI({
  apiKey: localStorage.getItem('openai_api_key') || '',
  dangerouslyAllowBrowser: true,
});

async function generateSynonyms(query: string): Promise<string[]> {
  const apiKey = localStorage.getItem('openai_api_key');
  
  if (!apiKey) {
    console.warn("OpenAI API key not configured.");
    return [];
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Você é um assistente de pesquisa jurídica. Dada uma consulta, gere até 3 sinônimos ou termos relacionados que podem ser úteis para expandir a busca. Responda apenas com os sinônimos separados por vírgula, sem pontuação final.",
        },
        { role: "user", content: query },
      ],
      model: "gpt-4o-mini",
      temperature: 0.2,
      max_tokens: 50,
    });

    const synonymsString = completion.choices[0]?.message?.content || "";
    if (synonymsString) {
      return synonymsString.split(',').map(term => term.trim()).filter(term => term !== query);
    }
    return [];

  } catch (error) {
    console.error("Erro ao gerar sinônimos com a API da OpenAI:", error);
    return [];
  }
}

export async function searchEscavador(query: string, filters: any): Promise<any[]> {
  const apiKey = localStorage.getItem('escavador_api_key');

  if (!apiKey) {
    console.warn("Chave da API do Escavador não configurada.");
    throw new Error("Chave da API do Escavador não configurada.");
  }

  // 1. Gerar sinônimos com a IA da OpenAI
  const synonyms = await generateSynonyms(query);

  // 2. Combinar a query original com os sinônimos para a busca
  const expandedQuery = [query, ...synonyms].join(' ');

  // 3. Montar a URL e os parâmetros da requisição para a API do Escavador
  const params = new URLSearchParams({
    q: expandedQuery,
    ...filters,
  });

  const url = `/api/v1/jurisprudencias/busca?${params.toString()}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    if (!response.ok) {
      throw new Error(`Erro na API do Escavador: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Mapeie a resposta da API para o formato esperado
    return data.items.map((item: any) => ({
      id: item.id,
      titulo: item.titulo,
      ementa: item.ementa,
      tribunal: item.tribunal,
      orgao_julgador: item.orgao_julgador,
      relator: item.relator,
      data_julgamento: item.data_julgamento,
      numero_processo: item.numero_processo,
      tags: item.tags || [],
      score: item.score || 0,
    }));
  } catch (error) {
    console.error("Erro na busca do Escavador:", error);
    throw error;
  }
}