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
    const { query } = await req.json();
    
    if (!query) {
      return new Response(
        JSON.stringify({ error: 'Query parameter is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      console.warn('OPENAI_API_KEY not configured, returning empty synonyms');
      return new Response(
        JSON.stringify({ synonyms: [] }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Generating synonyms for query:', query);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'Você é um assistente de pesquisa jurídica. Dada uma consulta, gere até 3 sinônimos ou termos relacionados que podem ser úteis para expandir a busca. Responda apenas com os sinônimos separados por vírgula, sem pontuação final.',
          },
          { role: 'user', content: query },
        ],
        temperature: 0.2,
        max_tokens: 50,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('Error response:', errorText);
      
      // Return empty synonyms on error instead of failing
      return new Response(
        JSON.stringify({ synonyms: [] }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const data = await response.json();
    const synonymsString = data.choices[0]?.message?.content || '';
    
    let synonyms: string[] = [];
    if (synonymsString) {
      synonyms = synonymsString
        .split(',')
        .map((term: string) => term.trim())
        .filter((term: string) => term !== query && term.length > 0);
    }

    console.log('Generated synonyms:', synonyms);

    return new Response(
      JSON.stringify({ synonyms }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in generate-synonyms function:', error);
    // Return empty synonyms on error instead of failing
    return new Response(
      JSON.stringify({ synonyms: [] }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});