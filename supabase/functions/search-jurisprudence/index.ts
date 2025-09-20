import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, filters = {}, synonyms = [] } = await req.json();
    
    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query parameter is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const escavadorApiKey = Deno.env.get('ESCAVADOR_API_KEY');
    if (!escavadorApiKey) {
      console.error('ESCAVADOR_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'API configuration error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Combine query with synonyms for expanded search
    let searchQuery = query;
    if (synonyms.length > 0) {
      // Use logical operators to expand search with synonyms
      searchQuery = `${query} OR ${synonyms.join(' OR ')}`;
    }
    
    // Build URL parameters
    const params = new URLSearchParams({
      q: searchQuery,
      page: (filters.page || 1).toString(),
    });

    // Add optional filters as URL parameters
    if (filters.tribunal) {
      params.append('tribunal', filters.tribunal);
    }
    
    if (filters.tipo_documento) {
      params.append('tipo_documento', filters.tipo_documento);
    }
    
    if (filters.relator) {
      params.append('relator', filters.relator);
    }
    
    if (filters.de_data) {
      params.append('de_data', filters.de_data);
    }
    
    if (filters.ate_data) {
      params.append('ate_data', filters.ate_data);
    }
    
    if (filters.ordena_por) {
      params.append('ordena_por', filters.ordena_por);
    }

    // Enable logical operators if using synonyms
    if (synonyms.length > 0) {
      params.append('utilizar_operadores_logicos', '1');
    }

    console.log('Searching with query:', searchQuery);
    console.log('URL params:', params.toString());

    // Call Escavador API with correct endpoint and method
    const apiUrl = `https://api.escavador.com/api/v1/jurisprudencias/busca?${params.toString()}`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${escavadorApiKey}`,
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    if (!response.ok) {
      console.error('Escavador API error:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error response:', errorText);
      
      return new Response(
        JSON.stringify({ 
          error: `Escavador API error: ${response.statusText}`,
          details: errorText 
        }),
        { 
          status: response.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const data = await response.json();
    console.log('Escavador API response received');
    console.log('Response structure:', Object.keys(data));

    // Map response to expected format
    // The API response structure may vary, so we'll handle different possible formats
    let results = [];
    let total = 0;

    if (data.results) {
      results = data.results;
      total = data.total || data.results.length;
    } else if (data.items) {
      results = data.items;
      total = data.total || data.items.length;
    } else if (Array.isArray(data)) {
      results = data;
      total = data.length;
    }

    const mappedResults = results.map((item: any) => ({
      id: item.id || item.uuid,
      titulo: item.titulo || item.title,
      ementa: item.ementa || item.summary,
      tribunal: item.tribunal || item.court,
      orgao_julgador: item.orgao_julgador || item.chamber,
      relator: item.relator || item.rapporteur,
      data_julgamento: item.data_julgamento || item.judgment_date,
      numero_processo: item.numero_processo || item.process_number,
      tags: item.tags || [],
      score: item.score || item.relevance || 0,
    }));

    return new Response(
      JSON.stringify({ items: mappedResults, total }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in search-jurisprudence function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});