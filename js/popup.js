import { AICall } from "./ai.js";

document.addEventListener("DOMContentLoaded", function () {
    const sendBtn = document.getElementById("send-button");
    const textInput = document.getElementById("text-input");

    sendBtn.addEventListener("click", function() {
        const text = textInput.value;
        AICall(text);
    })
});
