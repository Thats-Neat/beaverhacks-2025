import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

const url =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=" +
  apiKey;

const headers = {
  "Content-Type": "application/json",
};

const body = {
  contents: [
    {
      parts: [
        {
          text: "What is your name?"
        },
      ],
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
  console.log(json);
  const text = json.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
  console.log("AI RESPONCE: ", text);
}

main();