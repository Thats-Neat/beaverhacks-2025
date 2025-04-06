import { GEMINI_API_KEY } from "./config.js"

const apiKey = GEMINI_API_KEY

const url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=" +
  apiKey;

const headers = {
  "Content-Type": "application/json",
};

export async function AICall(toAsk) {
  const body = {
    contents: [
      {
        parts: [
          {
            text: toAsk
          },
        ],
      },
    ],
  };
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  const json = await res.json();
  console.log(json);
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
  console.log(text);
}