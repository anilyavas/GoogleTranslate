import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import OpenAI from 'npm:openai';

const openai = new OpenAI();

Deno.serve(async (req) => {
  const { input, from, to } = await req.json();

  const systemMessage = {
    role: 'system',
    content: `You are a translator. Your translate from ${from} to ${to}. Output only the translated text`,
  };

  const completion = await openai.chat.completions.create({
    messages: [systemMessage, { role: 'user', content: input }],
    model: 'gpt-4o',
  });

  return new Response(JSON.stringify(completion), {
    headers: { 'Content-Type': 'application/json' },
  });
});
