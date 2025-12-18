
import { GoogleGenAI, Type } from "@google/genai";
import { DecodingResult } from "../types";

/**
 * Fetches word data from a local JSON file first using numeric ID, 
 * falls back to Gemini API if the local file is missing.
 */
export async function fetchWordData(wordText: string, wordId: string, bookId: string, bookName: string): Promise<DecodingResult> {
  const localPath = `Data/${bookId}/${wordId}.json`;
  
  try {
    console.log(`🔍 Trying local ID fetch: ${localPath} (${wordText})`); 
    const response = await fetch(localPath);
    
    if (response.ok) {
      console.log(`✅ Success: Loaded ID ${wordId} for ${wordText}`);
      return await response.json();
    } else {
      console.warn(`⚠️ ID file ${wordId}.json not found for ${wordText}. Status: ${response.status}`);
    }
  } catch (e) {
    console.error(`❌ Local fetch error:`, e);
  }

  console.log(`🚀 API Fallback: Generating decode for "${wordText}" in ${bookName}`);
  return await decodeWordWithGemini(wordText, bookName);
}

async function decodeWordWithGemini(word: string, bookName: string): Promise<DecodingResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Decode the Chinese character "${word}" specifically in the context of the Bible book "${bookName}". 
  Provide its pinyin, common meaning, and then perform a deep "Biblical Decoding" by breaking down its radicals/components 
  and showing how they might relate to biblical stories, themes, or truths. 
  Be poetic, profound, and visually descriptive. Return as JSON.`;

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
          biblicalConnection: { type: Type.STRING },
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

  try {
    const text = response.text || "{}";
    return JSON.parse(text) as DecodingResult;
  } catch (e) {
    console.error("Failed to parse Gemini response:", e);
    throw new Error("Failed to decode word.");
  }
}
