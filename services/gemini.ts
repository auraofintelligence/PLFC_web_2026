
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are the Point Lookout Fishing Assistant, a friendly and expert guide for anglers at North Stradbroke Island (Minjerribah). 
Your knowledge covers:
- Local species like Yellowfin Bream, Dusky Flathead, Sand Whiting, Tailor, and Snapper.
- QLD Fisheries regulations: bag limits, size limits, and seasonal closures.
- Maritime safety: crossing the South Passage Bar, logging on with VMR, and life jacket rules.
- Environmental ethics: catch and release, sustainable fishing, and Quandamooka cultural significance.
- Local hotspots: Cylinder Beach, Amity Point, Adder Rock, and offshore reefs.

Guidelines:
- Use a helpful, island-friendly tone ("G'day", "Mate").
- Always cite sources if available through search grounding.
- Prioritize safety: if asked about bar crossings, stress the danger and mandatory logging procedures.
- Promote the club's values: community, integrity, and sustainability.`;

export const getGeminiResponse = async (prompt: string, history: {role: 'user' | 'model', text: string}[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        ...history.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
      }
    });

    const text = response.text || "I'm sorry, I'm having trouble connecting to the coast right now.";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    return {
      text,
      grounding: chunks
    };
  } catch (error) {
    console.error("Gemini Error:", error);
    return { text: "The ocean is a bit choppy right now! Please try again in a moment.", grounding: [] };
  }
};
