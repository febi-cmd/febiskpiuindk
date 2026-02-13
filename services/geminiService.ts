
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function professionalizeAchievement(title: string, rawDescription: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Transform this student achievement into a professional SKPI entry (Indonesian & English).
      Title: ${title}
      Description: ${rawDescription}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            titleIndo: { type: Type.STRING },
            titleEng: { type: Type.STRING },
            descIndo: { type: Type.STRING },
            descEng: { type: Type.STRING }
          },
          required: ["titleIndo", "titleEng", "descIndo", "descEng"]
        }
      }
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("AI help failed", error);
    return null;
  }
}
