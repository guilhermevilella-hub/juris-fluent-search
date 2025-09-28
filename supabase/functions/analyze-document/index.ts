import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import mammoth from "https://esm.sh/mammoth@1.6.0";
import * as pdfjsLib from "https://esm.sh/pdfjs-dist@3.11.174/legacy/build/pdf.mjs";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// PDF text extraction using pdfjs-dist with worker disabled + robust fallback
async function extractTextFromPDF(buffer: Uint8Array): Promise<string> {
  try {
    // Disable worker in server/edge environments
    // @ts-ignore
    if ((pdfjsLib as any).GlobalWorkerOptions) {
      // @ts-ignore
      (pdfjsLib as any).GlobalWorkerOptions.workerSrc = undefined;
    }

    const loadingTask = (pdfjsLib as any).getDocument({
      data: buffer,
      useWorkerFetch: false,
      isEvalSupported: false,
      disableRange: true,
      disableFontFace: true,
    });

    const doc = await loadingTask.promise;
    let text = '';

    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const content = await page.getTextContent();
      const pageText = (content.items as any[])
        .map((item: any) => (item?.str ?? ''))
        .join(' ');
      text += pageText + ' ';
      if (text.length > 8000) break; // keep size reasonable
    }

    const cleaned = text.replace(/\s+/g, ' ').trim();
    console.log(`pdfjs extracted ${cleaned.length} chars`);
    return cleaned.substring(0, 8000);
  } catch (err) {
    console.error('pdfjs extraction failed, falling back:', err);
    try {
      // Fallback: naive text decoding with simple cleaning
      const raw = new TextDecoder('utf-8', { fatal: false }).decode(buffer);
      const textMatches = raw.match(/\((.*?)\)/g);
      if (textMatches) {
        const joined = textMatches
          .map((m) => m.replace(/[()]/g, ''))
          .filter((t) => t.length > 2 && /[a-zA-ZÀ-ÿ]/.test(t))
          .join(' ');
        return joined.substring(0, 5000);
      }
      const readable = raw
        .replace(/[^\x20-\x7E\u00C0-\u017F]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      return readable.substring(0, 5000);
    } catch (fallbackErr) {
      console.error('Error extracting PDF text fallback:', fallbackErr);
      return '';
    }
  }
}

// Word (DOCX) text extraction using mammoth + fallback
async function extractTextFromWord(buffer: Uint8Array): Promise<string> {
  try {
    // mammoth expects an ArrayBuffer
    const { value } = await (mammoth as any).extractRawText({ arrayBuffer: buffer.buffer });
    const cleaned = (value ?? '').replace(/\s+/g, ' ').trim();
    console.log(`mammoth extracted ${cleaned.length} chars`);
    return cleaned.substring(0, 8000);
  } catch (error) {
    console.error('Mammoth extraction failed, falling back:', error);
    try {
      // Fallback to naive decoding (helps a bit for legacy .doc)
      const text = new TextDecoder('utf-8', { fatal: false }).decode(buffer);
      const readableText = text
        .replace(/[^\x20-\x7E\u00C0-\u017F]/g, ' ')
        .replace(/\s+/g, ' ')
        .replace(/[^\w\s\u00C0-\u017F.,;:!?()"-]/g, '')
        .trim();
      return readableText.substring(0, 5000);
    } catch (fallbackErr) {
      console.error('Word fallback failed:', fallbackErr);
      return '';
    }
  }
}

async function extractText(buffer: Uint8Array, fileType: string): Promise<string> {
  console.log(`Extracting text from ${fileType}`);
  
  let extractedText = '';
  
  if (fileType === 'application/pdf' || fileType.includes('pdf')) {
    extractedText = await extractTextFromPDF(buffer);
  } else if (fileType === 'application/msword' || 
             fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
             fileType.includes('word')) {
    extractedText = await extractTextFromWord(buffer);
  } else if (fileType.startsWith('text/')) {
    // Plain text files
    extractedText = new TextDecoder('utf-8').decode(buffer);
  }
  
  console.log(`Extracted ${extractedText.length} characters`);
  return extractedText;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const openaiKey = Deno.env.get('OPENAI_API_KEY');
    
    if (!openaiKey) {
      return new Response(
        JSON.stringify({ error: 'OpenAI API key not configured' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const mode = formData.get('mode') as string;
    
    if (!file) {
      return new Response(
        JSON.stringify({ error: 'No file provided' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log(`Processing file: ${file.name} (${file.type}) in mode: ${mode}`);

    // Extract text from the document
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = new Uint8Array(arrayBuffer);
    const extractedText = await extractText(fileBuffer, file.type);
    
    // Define different prompts based on mode
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

    // Prepare the content for OpenAI
    let contentToAnalyze = `Nome do arquivo: ${file.name}\nTipo: ${file.type}`;
    
    if (extractedText && extractedText.length > 10) {
      contentToAnalyze += `\n\nTexto extraído do documento:\n${extractedText}`;
      console.log(`Using extracted text (${extractedText.length} chars) for analysis`);
    } else {
      contentToAnalyze += '\n\nNão foi possível extrair texto do documento. Baseie a análise no nome e tipo do arquivo.';
      console.log('No text extracted, using filename analysis');
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
            content: `${analysisPrompt}\n\n${contentToAnalyze}`
          }
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
    let extractedTerms = data.choices[0].message.content.trim();
    
    // Sanitize extracted terms to remove regex special characters
    extractedTerms = extractedTerms.replace(/[*+?^${}()|[\]\\]/g, '');
    
    console.log(`Analysis complete. Extracted terms: ${extractedTerms}`);
    
    return new Response(
      JSON.stringify({ 
        extractedTerms,
        fileName: file.name,
        mode,
        hasExtractedText: extractedText.length > 10
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
    
  } catch (error) {
    console.error('Error in analyze-document function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});