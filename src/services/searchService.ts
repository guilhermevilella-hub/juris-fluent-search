import { supabase } from "@/integrations/supabase/client";

async function generateSynonyms(query: string): Promise<string[]> {
  try {
    console.log('Generating synonyms for:', query);
    
    const { data, error } = await supabase.functions.invoke('generate-synonyms', {
      body: { query }
    });

    if (error) {
      console.error('Error generating synonyms:', error);
      return [];
    }

    return data?.synonyms || [];
  } catch (error) {
    console.error('Error calling generate-synonyms function:', error);
    return [];
  }
}

export async function searchEscavador(query: string, filters: any): Promise<any[]> {
  try {
    console.log('Searching with query:', query, 'and filters:', filters);
    
    // 1. Generate synonyms with AI
    const synonyms = await generateSynonyms(query);
    console.log('Generated synonyms:', synonyms);

    // 2. Call the search edge function
    const { data, error } = await supabase.functions.invoke('search-jurisprudence', {
      body: { 
        query,
        filters,
        synonyms
      }
    });

    if (error) {
      console.error('Error calling search function:', error);
      throw new Error(`Erro na busca: ${error.message}`);
    }

    if (!data || !data.items) {
      console.warn('No data returned from search function');
      return [];
    }

    console.log('Search completed, found', data.items.length, 'results');
    return data.items;
  } catch (error) {
    console.error("Erro na busca do Escavador:", error);
    throw error;
  }
}

export async function getDocument(tipo: string, id: string): Promise<any> {
  try {
    console.log('Fetching document:', tipo, id);
    
    const { data, error } = await supabase.functions.invoke('get-document', {
      body: { tipo, id }
    });

    if (error) {
      console.error('Error calling get-document function:', error);
      throw new Error(`Erro ao buscar documento: ${error.message}`);
    }

    console.log('Document fetched successfully');
    return data;
  } catch (error) {
    console.error("Erro ao buscar documento:", error);
    throw error;
  }
}