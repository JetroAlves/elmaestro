
import { GoogleGenAI, Type } from "@google/genai";
import { PairingSuggestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getCheesePairing = async (userPreference: string): Promise<PairingSuggestion> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `Você é um sommelier de queijos especialista. Com base no desejo do cliente: "${userPreference}", sugira um queijo artesanal, um acompanhamento gastronômico e um vinho ideal.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          cheeseName: { type: Type.STRING },
          pairing: { type: Type.STRING },
          description: { type: Type.STRING },
          wineSuggestion: { type: Type.STRING }
        },
        required: ["cheeseName", "pairing", "description", "wineSuggestion"]
      }
    }
  });

  return JSON.parse(response.text);
};
