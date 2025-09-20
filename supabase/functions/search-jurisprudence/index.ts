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
    const expandedQuery = [query, ...synonyms].join(' ');
    
    // Build search parameters
    const params = new URLSearchParams({
      q: expandedQuery,
      ...filters,
    });

    console.log('Searching with query:', expandedQuery);
    console.log('Search parameters:', params.toString());

    // Call Escavador API
    const response = await fetch(`https://api.escavador.com/api/v1/jurisprudencias/busca?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${escavadorApiKey}`,
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
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
    console.log('Escavador API response received, items count:', data.items?.length || 0);

    // Map response to expected format
    const mappedResults = data.items?.map((item: any) => ({
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
    })) || [];

    return new Response(
      JSON.stringify({ items: mappedResults, total: data.total || mappedResults.length }),
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