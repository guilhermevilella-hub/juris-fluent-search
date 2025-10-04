import { mockJurisprudencias, mockDocumentDetails, mockSynonyms, mockDocuments } from './mockData';

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

// Function to sanitize search terms and remove regex special characters
function sanitizeSearchTerm(term: string): string {
  // Remove or escape regex special characters that could cause issues
  return term.replace(/[*+?^${}()|[\]\\]/g, '\\$&').trim();
}

// Generate advanced boolean search query using AI
export async function generateAdvancedSearchQuery(userInput: string): Promise<string> {
  try {
    console.log('Generating advanced search query for:', userInput);
    
    const { supabase } = await import('@/integrations/supabase/client');
    
    const { data, error } = await supabase.functions.invoke('generate-search-query', {
      body: { userInput }
    });

    if (error) {
      console.error('Error calling generate-search-query function:', error);
      // Fallback to simple query
      return userInput;
    }

    const searchQuery = data?.searchQuery || userInput;
    console.log('Generated advanced query:', searchQuery);
    return searchQuery;
  } catch (error) {
    console.error('Error generating advanced search query:', error);
    // Fallback to simple query
    return userInput;
  }
}

// Legacy function for backwards compatibility (now just returns the input)
export async function generateSynonyms(query: string): Promise<string[]> {
  console.warn('generateSynonyms is deprecated, use generateAdvancedSearchQuery instead');
  return [];
}

export interface FilterOption {
  titulo: string;
  sigla?: string;
  valor: string;
  quantidade_correspondencias: number;
}

export interface DynamicFilter {
  titulo: string;
  filtro: string;
  selecao_unica: boolean;
  opcoes: FilterOption[];
}

export interface SearchResponse {
  results: any[];
  filters: DynamicFilter[];
  synonymsUsed?: string[];
}

export async function searchEscavador(query: string, filters: any, useAdvancedQuery: boolean = false): Promise<SearchResponse> {
  try {
    console.log('Searching with query:', query, 'and filters:', filters);
    console.log('Mode: useAdvancedQuery =', useAdvancedQuery);
    
    const { escavadorKey } = await getApiCredentials();

    // Build search query - if useAdvancedQuery is true, use the query as-is (already optimized by AI)
    let searchQuery = query;
    if (useAdvancedQuery) {
      console.log('Using AI-generated advanced query:', searchQuery);
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
      // If API returns 402 (no credit) or other errors, use mock data
      if (response.status === 402) {
        console.warn('API credit exhausted, using mock data');
        return {
          results: mockJurisprudencias.filter(item => 
            item.titulo.toLowerCase().includes(query.toLowerCase()) ||
            item.ementa.toLowerCase().includes(query.toLowerCase()) ||
            item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
          ),
          filters: [],
          synonymsUsed: undefined
        };
      }
      throw new Error(`Erro da API do Escavador: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.items && !data.filtros) {
      console.warn('No items returned from Escavador API, using mock data');
      return {
        results: mockJurisprudencias,
        filters: [],
        synonymsUsed: undefined
      };
    }

    // 5. Map the results to our format
    const mappedResults = (data.items || []).map((item: any) => ({
      id: item.id?.toString() || '',
      titulo: item.titulo || '',
      ementa: item.ementa || '',
      tribunal: item.tribunal || '',
      relator: item.relator || '',
      data_julgamento: item.data_julgamento || '',
      numero_processo: item.numero_processo || '',
      tags: item.tags || [],
      score: item.score || 0,
      tipo_documento: item.tipo_documento || 'decisoes'
    }));

    // 6. Extract dynamic filters from API response
    const dynamicFilters: DynamicFilter[] = data.filtros || [];

    console.log('Search completed, found', mappedResults.length, 'results and', dynamicFilters.length, 'filters');
    return {
      results: mappedResults,
      filters: dynamicFilters,
      synonymsUsed: undefined
    };
  } catch (error) {
    console.error("Erro na busca do Escavador:", error);
    // Fallback to mock data on any error
    console.warn('Using mock data due to API error');
    return {
      results: mockJurisprudencias.filter(item => 
        item.titulo.toLowerCase().includes(query.toLowerCase()) ||
        item.ementa.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      ),
      filters: [],
      synonymsUsed: undefined
    };
  }
}

// Helper function to get available document types from API
async function getAvailableDocumentTypes(escavadorKey: string): Promise<string[]> {
  try {
    // Try to get document types from the API metadata endpoint
    const metadataUrl = 'https://api.escavador.com/api/v1/jurisprudencias/metadata';
    const response = await fetch(metadataUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${escavadorKey}`,
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      const data = await response.json();
      if (data.document_types) {
        console.log('Available document types from API:', data.document_types);
        return data.document_types;
      }
    }
  } catch (error) {
    console.log('Could not fetch document types from API metadata:', error);
  }

  // Fallback to common document types
  return [
    'acordao', 'decisoes', 'decisao', 'sentenca', 'despacho', 
    'ementa', 'voto', 'relatorio', 'monocratica', 'colegiada'
  ];
}

export async function getDocument(tipo: string, id: string): Promise<any> {
  try {
    console.log('Fetching document:', tipo, id);
    
    const { escavadorKey } = await getApiCredentials();

    // Get available document types dynamically
    const availableTypes = await getAvailableDocumentTypes(escavadorKey);
    
    // Create dynamic list prioritizing the requested type
    const documentTypes = [
      tipo, 
      ...availableTypes.filter(t => t !== tipo)
    ];
    
    console.log('Trying document types in order:', documentTypes);
    
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
          return { ...data, document_type: docType }; // Include the successful type in response
        } else if (response.status === 402) {
          // If API returns 402 (no credit), use mock data
          console.warn('API credit exhausted, using mock data for document:', id);
          const mockDoc = mockDocuments[id] || mockDocumentDetails[id as keyof typeof mockDocumentDetails];
          if (mockDoc) {
            return mockDoc;
          }
        } else if (response.status === 404) {
          console.log(`Document not found with type ${docType}, trying next type`);
        } else {
          console.log(`Failed to fetch with type ${docType}: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.log(`Error fetching with type ${docType}:`, error);
      }
    }
    
    // If no document type worked, try mock data
    console.warn('Document not found via API, checking mock data for:', id);
    const mockDoc = mockDocuments[id] || mockDocumentDetails[id as keyof typeof mockDocumentDetails];
    if (mockDoc) {
      return mockDoc;
    }
    
    throw new Error('Documento não encontrado com nenhum dos tipos disponíveis');
  } catch (error) {
    console.error("Erro ao buscar documento:", error);
    // Fallback to mock data on any error
    const mockDoc = mockDocuments[id] || mockDocumentDetails[id as keyof typeof mockDocumentDetails];
    if (mockDoc) {
      console.warn('Using mock document due to API error:', id);
      return mockDoc;
    }
    throw error;
  }
}