// Get API credentials from Supabase securely
const getApiCredentials = async (): Promise<{escavadorKey: string, openaiKey?: string}> => {
  const { supabase } = await import('@/integrations/supabase/client');
  
  try {
    const { data, error } = await supabase.functions.invoke('get-api-credentials');
    
    if (error) {
      throw new Error('Erro ao obter credenciais da API');
    }
    
    return data;
  } catch (error) {
    console.error('Error getting API credentials:', error);
    throw error;
  }
};

async function generateSynonyms(query: string): Promise<string[]> {
  try {
    console.log('Generating synonyms for:', query);
    
    const { openaiKey } = await getApiCredentials();
    if (!openaiKey) {
      console.warn('OpenAI API key not found, skipping synonyms generation');
      return [];
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Você é um especialista em pesquisa jurídica. Gere até 5 sinônimos ou termos relacionados para expandir a busca jurídica. Responda apenas com uma lista de palavras separadas por vírgula, sem explicações.'
          },
          {
            role: 'user',
            content: `Gere sinônimos jurídicos para: ${query}`
          }
        ],
        max_tokens: 100,
        temperature: 0.3
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.statusText);
      return [];
    }

    const data = await response.json();
    const synonymsText = data.choices[0]?.message?.content || '';
    const synonyms = synonymsText.split(',').map((s: string) => s.trim()).filter((s: string) => s.length > 0);
    
    console.log('Generated synonyms:', synonyms);
    return synonyms;
  } catch (error) {
    console.error('Error generating synonyms:', error);
    return [];
  }
}

export async function searchEscavador(query: string, filters: any): Promise<any[]> {
  try {
    console.log('Searching with query:', query, 'and filters:', filters);
    
    const { escavadorKey } = await getApiCredentials();

    // 1. Generate synonyms with AI
    const synonyms = await generateSynonyms(query);
    console.log('Generated synonyms:', synonyms);

    // 2. Build search query with synonyms
    let searchQuery = query;
    if (synonyms.length > 0) {
      searchQuery = `${query} OR ${synonyms.join(' OR ')}`;
    }

    // 3. Build URL parameters
    const params = new URLSearchParams({
      q: searchQuery,
      size: '20'
    });

    if (filters.tribunal) params.append('tribunal', filters.tribunal);
    if (filters.tipo_documento) params.append('tipo_documento', filters.tipo_documento);
    if (filters.relator) params.append('relator', filters.relator);
    if (filters.de_data) params.append('de_data', filters.de_data);
    if (filters.ate_data) params.append('ate_data', filters.ate_data);
    if (filters.ordena_por) params.append('ordena_por', filters.ordena_por);

    const url = `https://api.escavador.com/api/v1/jurisprudencias/busca?${params.toString()}`;
    console.log('Escavador API URL:', url);

    // 4. Make the API call
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${escavadorKey}`,
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Erro da API do Escavador: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.items) {
      console.warn('No items returned from Escavador API');
      return [];
    }

    // 5. Map the results to our format
    const mappedResults = data.items.map((item: any) => ({
      id: item.id?.toString() || '',
      titulo: item.titulo || '',
      ementa: item.ementa || '',
      tribunal: item.tribunal || '',
      relator: item.relator || '',
      data_julgamento: item.data_julgamento || '',
      numero_processo: item.numero_processo || '',
      tags: item.tags || [],
      score: item.score || 0,
      tipo_documento: item.tipo_documento || 'acordao'
    }));

    console.log('Search completed, found', mappedResults.length, 'results');
    return mappedResults;
  } catch (error) {
    console.error("Erro na busca do Escavador:", error);
    throw error;
  }
}

export async function getDocument(tipo: string, id: string): Promise<any> {
  try {
    console.log('Fetching document:', tipo, id);
    
    const { escavadorKey } = await getApiCredentials();

    // List of document types to try - use 'decisoes' as default fallback
    const documentTypes = [tipo, 'decisoes', 'acordao', 'decisao', 'sentenca'];
    
    for (const docType of documentTypes) {
      try {
        console.log(`Trying to fetch document with type: ${docType}`);
        
        const url = `https://api.escavador.com/api/v1/jurisprudencias/documento/${docType}/${id}`;
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${escavadorKey}`,
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Document fetched successfully with type:', docType);
          return data;
        } else {
          console.log(`Failed to fetch with type ${docType}: ${response.status}`);
        }
      } catch (error) {
        console.log(`Error fetching with type ${docType}:`, error);
      }
    }
    
    throw new Error('Documento não encontrado com nenhum dos tipos disponíveis');
  } catch (error) {
    console.error("Erro ao buscar documento:", error);
    throw error;
  }
}