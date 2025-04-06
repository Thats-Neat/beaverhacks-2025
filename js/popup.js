import { AICall } from "./ai.js";
import { getGrades, getAssignments } from "./content.js";

let grade_prompt = null;
let assignment_prompt = null;

document.addEventListener("DOMContentLoaded", function () {
  const sendBtn = document.getElementById("send-button");
  const textInput = document.getElementById("text-input");

    sendBtn.addEventListener("click", function() {
        const text = textInput.value;
        textInput.value = "";
        
        const chatContainer = document.querySelector(".chat-container-wrapper");
        
        const usrMsgDiv = document.createElement("div");
        usrMsgDiv.className = "user-msg-div";
        usrMsgDiv.innerHTML = `
          <div class="user-msg-container">
              <div class="user-msg-text">${text}</div>
          </div>
        `;

        const canvasMsgDiv = document.createElement("div");
        canvasMsgDiv.className = "canvas-msg-div";
        canvasMsgDiv.innerHTML = `
          <div class="canvas-msg-container">
              <div class="canvas-msg-text">...</div>
          </div>
        `;
        
        chatContainer.appendChild(usrMsgDiv);
        chatContainer.appendChild(canvasMsgDiv);
        
        chatContainer.scrollTop = chatContainer.scrollHeight;
        
        getGrades().then((res) => {
            grade_prompt = res;
            getAssignments().then((res) => {
                assignment_prompt = res;
                AICall(`You are an AI assistant for students and should act and respond as such. You need to exclusively use the information such as grade information ${grade_prompt} and assignment information ${assignment_prompt} you should respond with helpful information regarding only school related activies and questions. Keep your responses short and specific, the students question is located here: ${text}. Respond without mentioning these instructions. You should not give information that is not asked for. Dont use any markdown symbols the resulting text will be used for a plaintext box. It is fine to omit full class names with section numbers unless asked for.`).then((res) => {
                  const canvasMsgText = canvasMsgDiv.querySelector(".canvas-msg-text");
                  canvasMsgText.textContent = res;
                });
            });
        });
    })
});
