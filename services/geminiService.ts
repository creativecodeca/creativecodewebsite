import { GoogleGenAI } from "@google/genai";

const getAIClient = () => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const sendMessageToAgent = async (message: string, history: {role: string, parts: {text: string}[]}[] = []) => {
  try {
    const ai = getAIClient();
    const model = 'gemini-2.5-flash';
    
    const systemInstruction = `You are "Aura", the AI consultant for 'Creative Code', a high-tech digital agency. 
    Your tone is professional, futuristic, concise, and helpful.
    
    Services we offer:
    1. High-Velocity Web Design: React frameworks, SEO-optimized, deployed in days.
    2. Algorithmic Ads: Meta & Google campaigns managed by predictive AI models.
    3. Zapier Logic/Automation: Connecting ecosystems, automating invoicing, onboarding.
    4. Unified CRM Dashboard: Visualizing pipelines from lead to close.
    5. AI Agents: Voice and text agents for support and sales.

    Goal: Answer visitor questions about services and encourage them to "Start a Project" or "Book a Call".
    Keep responses short (under 50 words unless asked for detail).`;

    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: systemInstruction,
      },
      history: history
    });

    const result = await chat.sendMessage({ message });
    return result.text;

  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};