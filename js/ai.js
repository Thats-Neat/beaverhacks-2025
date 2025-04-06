import { GoogleGenerativeAI } from "@google/generative-ai";
const apiKey = "AIzaSyD1v4g0X2r7bq3x5c8Y6m9j0z1k5f3g4wE";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

let messages = {
  history: [], // Store the chat history
};

async function sendMessage() {
  console.log(messages);
  const userMessage = document.querySelector("body .inputarea").value;
  if (userMessage.length) {
    alert(userMessage);
    document.querySelector("chat-container-wrapper .user-msg-text").value = "";
    document
      .querySelector("chat-container-wrapper .user-msg-div")
      .insertAdjacentHTML(
        "beforeend",
        `
        <div class="user">
        <p>${userMessage}</p>
        </div>`
      );
    const chat = model.startChat(messages);
    let result = await chat.sendMessage(userMessage);
    document
      .querySelector("chat-container-wrapper .user-msg-text")
      .insertAdjacentHTML(
        "beforeend",
        `
        <div class="model">
        <p>${result.responce.text()}}</p>
        </div>`
      );
    messages.history.push({
      role: "user",
      parts: [{ text: "Hello" }],
    });
    messages.history.push({
      role: "model",
      parts: [{ text: result.responce.text() }],
    });
  }
}

document
  .querySelector(".top-bar .setting-button")
  .addEventListener("click", () => sendMessage());

// const url =
//   "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent?key=" +
//   apiKey;

// const headers = {
//   "Content-Type": "application/json",
// };

// export async function AICall(toAsk) {
//   const body = {
//     contents: [
//       {
//         parts: [
//           {
//             text: toAsk
//           },
//         ],
//       },
//     ],
//   };
//   const res = await fetch(url, {
//     method: "POST",
//     headers,
//     body: JSON.stringify(body),
//   });
//   const json = await res.json();
//   console.log(json);
//   const text = json.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
//   console.log(text);
// }
