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
    const { tipo, id } = await req.json();
    
    console.log('Received parameters:', { tipo, id });
    
    if (!tipo || !id) {
      console.error('Missing parameters:', { tipo, id });
      return new Response(
        JSON.stringify({ error: 'tipo and id parameters are required' }),
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

    console.log('Fetching document with params:', { tipo, id });
    
    // Tentar diferentes tipos de documento se o primeiro falhar
    const documentTypes = [tipo, 'acordao', 'decisao', 'sentenca'];
    let lastError = null;
    let response = null;

    for (const docType of documentTypes) {
      const url = `https://api.escavador.com/api/v1/jurisprudencias/documento/${docType}/${id}`;
      console.log('Trying URL:', url);
      
      try {
        response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${escavadorApiKey}`,
            'X-Requested-With': 'XMLHttpRequest',
          },
        });
        
        if (response.ok) {
          console.log('Success with document type:', docType);
          break;
        } else {
          console.log(`Failed with ${docType}:`, response.status, response.statusText);
          if (response.status !== 404) {
            // Se não é 404, pode ser outro erro que devemos reportar
            lastError = { status: response.status, statusText: response.statusText, url };
            break;
          }
        }
      } catch (err) {
        console.error(`Error trying ${docType}:`, err);
        lastError = err;
      }
    }

    if (!response || !response.ok) {
      console.error('All document types failed. Last error:', lastError);
      const errorText = response ? await response.text() : 'No response received';
      console.error('Error response:', errorText);
      
      return new Response(
        JSON.stringify({ 
          error: `Document not found with ID: ${id}. Tried types: ${documentTypes.join(', ')}`,
          details: lastError || 'All document types returned 404',
          id,
          tipo,
          triedTypes: documentTypes
        }),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const data = await response.json();
    console.log('Document fetched successfully');

    return new Response(
      JSON.stringify(data),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in get-document function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});