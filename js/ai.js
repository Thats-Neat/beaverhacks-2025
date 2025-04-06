import dotenv from "dotenv";
dotenv.config(); // Load .env variables before accessing them

const apiKey = process.env.GEMINI_API_KEY; // This should now have the correct key

const url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=" +
  apiKey;

const headers = {
  "Content-Type": "application/json",
};

const body = {
  contents: [
    {
      parts: [{ text: "Tell me a joke about programmers." }],
    },
  ],
};

async function main() {
  const res = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  const json = await res.json();
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
  console.log(" ", text);
}

main();
