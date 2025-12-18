
import { GoogleGenAI, Type } from "@google/genai";
import { DecodingResult } from "../types";

export async function decodeWordWithGemini(word: string, bookName: string): Promise<DecodingResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Decode the Chinese character "${word}" specifically in the context of the Bible book "${bookName}". 
  Provide its pinyin, common meaning, and then perform a deep "Biblical Decoding" by breaking down its radicals/components 
  and showing how they might relate to biblical stories, themes, or truths. For example, how '船' (boat) is composed of 
  '舟' (vessel), '八' (eight), and '口' (mouths/people), referencing Noah's Ark. 
  Be poetic, profound, and visually descriptive.`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          character: { type: Type.STRING },
          pinyin: { type: Type.STRING },
          meaning: { type: Type.STRING },
          biblicalConnection: { type: Type.STRING, description: "Detailed biblical decoding explanation" },
          components: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                part: { type: Type.STRING },
                meaning: { type: Type.STRING }
              },
              required: ["part", "meaning"]
            }
          }
        },
        required: ["character", "pinyin", "meaning", "biblicalConnection", "components"]
      }
    }
  });

  const text = response.text || "";
  try {
    return JSON.parse(text) as DecodingResult;
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    throw new Error("Decoding failed. Please try again.");
  }
}
