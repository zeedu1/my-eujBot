import readlineSync from "readline-sync";
import chatWithGemini from "./chat.js";

console.log("🤖 Gemini Chatbot: Type 'exit' to quit.");

async function main() {
    while (true) {
        const userInput = readlineSync.question("> ");
        if (userInput.toLowerCase() === "exit") break;

        const response = await chatWithGemini(userInput);
        console.log("🤖 Gemini:", response);
    }
}

main();
