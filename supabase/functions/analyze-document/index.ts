import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import mammoth from "https://esm.sh/mammoth@1.6.0";
import * as pdfjsLib from "https://esm.sh/pdfjs-dist@3.11.174/legacy/build/pdf.mjs";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

async function extractTextFromPDF(buffer: Uint8Array): Promise<string> {
  try {
    const loadingTask = pdfjsLib.getDocument({ data: buffer });
    const doc = await loadingTask.promise;
    let text = '';
    const maxPages = Math.min(doc.numPages, 10); // Limita o processamento a 10 páginas para evitar timeouts
    for (let i = 1; i <= maxPages; i++) {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      const pageText = content.items.map((item: any) => (item?.str ?? '')).join(' ');
      text += pageText + ' ';
      if (text.length > 8000) break;
    }
    const cleaned = text.replace(/\s+/g, ' ').trim();
    console.log(`pdfjs extracted ${cleaned.length} chars`);
    return cleaned.substring(0, 8000);
  } catch (err) {
    console.error('pdfjs extraction failed:', err);
    return '';
  }
}

async function extractTextFromWord(buffer: Uint8Array): Promise<string> {
  try {
    const arrayBuffer = new ArrayBuffer(buffer.byteLength);
    new Uint8Array(arrayBuffer).set(buffer);
    const { value } = await mammoth.extractRawText({ arrayBuffer });
    const cleaned = (value ?? '').replace(/\s+/g, ' ').trim();
    console.log(`mammoth extracted ${cleaned.length} chars`);
    return cleaned.substring(0, 8000);
  } catch (error) {
    console.error('Mammoth extraction failed:', error);
    return '';
  }
}

async function extractText(buffer: Uint8Array, fileType: string): Promise<string> {
  console.log(`Extracting text from ${fileType}`);
  if (fileType.includes('pdf')) {
    return extractTextFromPDF(buffer);
  }
  if (fileType.includes('word')) {
    return extractTextFromWord(buffer);
  }
  return '';
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openaiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiKey) {
      return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const mode = formData.get('mode') as string;

    if (!file || typeof file === 'string' || !mode || typeof mode !== 'string') {
      return new Response(JSON.stringify({ error: 'No file provided or invalid data' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Verifica se o tipo de arquivo é suportado
    if (!file.type.includes('pdf') && !file.type.includes('word')) {
        return new Response(JSON.stringify({ error: 'Unsupported file type. Please upload a PDF, DOC, or DOCX file.' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

    console.log(`Processing file: ${file.name} (${file.type}) in mode: ${mode}`);

    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = new Uint8Array(arrayBuffer);
    const extractedText = await extractText(fileBuffer, file.type);

    if (!extractedText || extractedText.length < 50) {
        console.warn('Extracted text is too short or empty. Returning a fallback search query.');
        return new Response(
          JSON.stringify({ extractedTerms: file.name.replace(/\.[^/.]+$/, "") }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }

    let systemPrompt = '';
    let analysisPrompt = '';
    switch (mode) {
      case 'peticao':
        systemPrompt = 'Você é um especialista em análise de petições iniciais e contestações. Sua tarefa é extrair os principais argumentos jurídicos e teses apresentadas.';
        analysisPrompt = `Analise este documento jurídico e extraia:
1. Principais teses e argumentos apresentados
2. Termos jurídicos relevantes para pesquisa de jurisprudências
3. Contexto geral do caso
4. Palavras-chave específicas do direito

Retorne uma lista de termos de pesquisa separados por vírgula, focando nos aspectos mais importantes para encontrar jurisprudências relacionadas.
Formato: "termo1, termo2, termo3, etc"

Exemplo: "responsabilidade civil, dano moral, nexo de causalidade, acidente de trabalho"`;
        break;
      case 'sentenca':
        systemPrompt = 'Você é um especialista em análise de sentenças e acórdãos. Sua tarefa é identificar as teses adotadas pelo julgador para encontrar precedentes contrários.';
        analysisPrompt = `Analise esta sentença/acórdão e identifique:
1. Principais fundamentos e teses adotadas pelo julgador
2. Argumentos centrais da decisão
3. Doutrinas e precedentes citados
4. Pontos controvertidos que podem ter entendimentos divergentes

Retorne termos de pesquisa que ajudem a encontrar jurisprudências que questionem ou contradizem as teses adotadas.
Formato: "termo1, termo2, termo3, etc"

Exemplo: "prescrição quinquenal, não incidência, relação de emprego, vínculo trabalhista"`;
        break;
      case 'raiox':
        systemPrompt = 'Você é um especialista em análise estratégica de petições adversárias. Sua tarefa é identificar as teses do adversário para preparar a defesa.';
        analysisPrompt = `Analise esta petição adversária e identifique:
1. Todas as teses e argumentos apresentados pela parte contrária
2. Fundamentos jurídicos utilizados
3. Precedentes e doutrinas citados
4. Pontos de vulnerabilidade dos argumentos

Retorne termos de pesquisa para encontrar jurisprudências que possam contradizer ou enfraquecer os argumentos adversários.
Formato: "termo1, termo2, termo3, etc"

Exemplo: "culpa exclusiva da vítima, excludente de responsabilidade, ausência de nexo causal"`;
        break;
      default:
        systemPrompt = 'Você é um especialista em análise de documentos jurídicos.';
        analysisPrompt = 'Analise este documento e extraia os principais termos jurídicos para pesquisa.';
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
            content: `${systemPrompt} IMPORTANTE: Não use asteriscos, colchetes ou outros caracteres especiais nos termos. Use apenas letras, números, espaços e vírgulas.`
          },
          {
            role: 'user',
            content: `${analysisPrompt}\n\nTexto do documento:\n${extractedText}`
          },
        ],
        max_tokens: 500,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, response.statusText);
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    let extractedTerms = data.choices[0]?.message?.content?.trim() || '';

    // Sanitize extracted terms to remove regex special characters
    extractedTerms = extractedTerms.replace(/[*+?^${}()|[\]\\]/g, '');

    console.log(`Analysis complete. Extracted terms: ${extractedTerms}`);

    return new Response(
      JSON.stringify({
        extractedTerms,
        fileName: file.name,
        mode,
        hasExtractedText: extractedText.length > 10,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Error in analyze-document function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});