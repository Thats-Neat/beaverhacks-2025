import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyAhsyX9U23kdLy3YXr6AQU3-RjNirzrSWg",
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Say hi",
  });
  console.log(response.text);
}

main();
