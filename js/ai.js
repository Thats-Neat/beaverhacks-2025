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
      parts: [
        {
          text: "" /*elem.textContent || elem.InnerText*/,
        },
      ],
    },
  ],
};
document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("send-button");
  const inputElement = document.getElementById("input");

  async function main() {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    const json = await res.json();
    const text =
      json.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    console.log("AI RESPONCE", text);

    if (responceElement) {
      responceElement.value = text;
    } else {
      console.error("Response element not found");
    }
  }
  button.addEventListener("click", () => {
    const input = document.getElementById("input").value;
    body.contents[0].parts[0].text = input;
    main();
  });
});
//main();
