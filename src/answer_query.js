import { Chroma } from 'langchain/vectorstores/chroma';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { ChatPromptTemplate } from 'langchain/prompts';
import { loadEnvConfig } from '@next/env';

loadEnvConfig(process.cwd());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const CHROMA_PATH = './chroma_db';

export async function answer_query(query) {
  const embeddings = new OpenAIEmbeddings({ openAIApiKey: OPENAI_API_KEY });
  const db_chroma = await Chroma.fromExistingCollection(embeddings, { collectionName: 'resume_collection', url: CHROMA_PATH });

  const docs_chroma = await db_chroma.similaritySearch(query, 5);

  const context_text = docs_chroma.map(doc => doc.pageContent).join('\n\n');

  const PROMPT_TEMPLATE = `
    Answer the question based only on the following context:
    {context}
    Answer the question based on the above context: {question}.
    Provide a detailed answer.
    Don't justify your answers.
    Don't give information not mentioned in the CONTEXT INFORMATION.
    Do not say "according to the context" or "mentioned in the context" or similar.
  `;

  const prompt_template = ChatPromptTemplate.fromTemplate(PROMPT_TEMPLATE);
  const prompt = await prompt_template.format({ context: context_text, question: query });

  const model = new ChatOpenAI({ openAIApiKey: OPENAI_API_KEY });
  const response = await model.call(prompt);

  return response.content;
}