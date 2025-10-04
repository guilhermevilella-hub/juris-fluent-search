import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userInput } = await req.json();
    
    if (!userInput) {
      return new Response(
        JSON.stringify({ error: 'userInput is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('LOVABLE_API_KEY not found');
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const systemPrompt = `Você é um especialista em pesquisa jurídica e sua única função é converter a descrição de um caso ou um termo de busca em uma query de busca booleana avançada e altamente eficiente. Seu objetivo é criar a string de busca mais precisa possível para ser usada em um motor de busca de jurisprudência.

Regras e Operadores Disponíveis:

- AND: Use para garantir que múltiplos termos essenciais estejam presentes.
- OR: Use para agrupar sinônimos ou conceitos alternativos.
- NOT: Use para excluir termos que possam gerar resultados irrelevantes.
- Parênteses (): Use para agrupar expressões e controlar a ordem de prioridade. A lógica dentro dos parênteses é resolvida primeiro.
- Aspas "": Use para buscar uma frase exata. Essencial para termos jurídicos compostos como "dano moral" ou "justa causa".
- Proximidade W/n: Use para encontrar termos que aparecem próximos um do outro (a 'n' palavras de distância). É mais preciso que AND. Use um número pequeno para n, como 5 ou 10. Exemplo: vício W/5 veículo.
- Coringa *: Use no final de um radical para buscar todas as suas variações (plural, conjugações, etc.). Exemplo: contrat* buscará por contrato, contratos, contratual, etc.

Instruções de Saída:

Retorne APENAS a string da query final.
Não inclua explicações, títulos, ou qualquer formatação como json ou markdown. A sua saída deve ser uma única linha de texto pronta para ser enviada a uma API.

Exemplos de Excelência:

Input: "demissão por justa causa por abandono de emprego, mas o funcionário estava de atestado"
Output: ("justa causa" AND demiss*) AND ("abandono de emprego") AND (atestado OR licença W/5 médica) NOT (improcedente)

Input: "vício oculto em carro comprado de concessionária, mas que não seja problema no câmbio"
Output: ("vício oculto" OR "vício redibitório") AND (veículo* OR automóvel*) AND concessionária NOT (câmbio OR transmissão)`;

    console.log('Generating search query for:', userInput);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userInput }
        ],
        temperature: 0.3,
        max_tokens: 500
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI API error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your Lovable workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ error: 'Failed to generate search query' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    const searchQuery = data.choices[0]?.message?.content?.trim() || '';

    console.log('Generated search query:', searchQuery);

    return new Response(
      JSON.stringify({ searchQuery }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in generate-search-query function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
