// import dotenv from "dotenv";
// dotenv.config(); // Load .env variables before accessing them

// const apiKey = process.env.GEMINI_API_KEY; // This should now have the correct key

// const url =
//   "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=" +
//   apiKey;

// const headers = {
//   "Content-Type": "application/json",
// };
// const chatContainer = document.querySelector(".chat-container");
// async function sendMessage(inputText) {
// const body = {
//   contents: [
//     {
//       parts: [{ text: inputText }],
//         },
//       ],
//     };
//     try {
//       const response = await fetch(url, {
//         method: 'POST',
//         headers,
//         body: JSON.stringify(body),
//       });
// document.addEventListener("DOMContentLoaded", () => {
//   const button = document.getElementById("send-button");
//   const inputElement = document.getElementById("input");

//   async function main() {
//     const res = await fetch(url, {
//       method: "POST",
//       headers,
//       body: JSON.stringify(body),
//     });
//     const json = await res.json();
//     const text =
//       json.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
//     console.log("AI RESPONCE", text);

//     if (responceElement) {
//       responceElement.value = text;
//     } else {
//       console.error("Response element not found");
//     }
//   }
//   button.addEventListener("click", () => {
//     const input = document.getElementById("input").value;
//     body.contents[0].parts[0].text = input;
//     main();
//   });
// });
// //main();

import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=${apiKey}`;
const headers = {
  "Content-Type": "application/json",
};
const chatContainer = document.querySelector(".chat-container");

document.addEventListener("DOMContentLoaded", () => {
  const sendButton = document.getElementById("send-button");
  const inputElement = document.getElementById("input");

  async function sendMessage(inputText) {
    const body = {
      contents: [
        {
          parts: [{ text: inputText }],
        },
      ],
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
      const data = await response.json();
      const aiResponse =
        data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
      displayMessage("user", inputText);
      displayMessage("canvas", aiResponse);
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      displayMessage("canvas", "Error getting response.");
    } finally {
      inputElement.textContent = ""; // Clear input
    }
  }

  function displayMessage(sender, message) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add(`${sender}-msg-div`);

    const messageContainer = document.createElement("div");
    messageContainer.classList.add(`${sender}-msg-container`);

    const messageText = document.createElement("div");
    messageText.classList.add(`${sender}-msg-text`);
    messageText.textContent = message;

    messageContainer.appendChild(messageText);
    messageDiv.appendChild(messageContainer);
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight; // Scroll to bottom
  }

  sendButton.addEventListener("click", () => {
    const input = inputElement.textContent.trim();
    if (input) {
      sendMessage(input);
    }
  });

  inputElement.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // Prevent newline in contenteditable
      sendButton.click();
    }
  });
});
