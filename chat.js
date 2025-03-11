import axios from "axios";
import "dotenv/config";

const apiKey = process.env.GEMINI_API_KEY;
const apiUrl = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent";

async function chatWithGemini(prompt) {
    try {
        const response = await axios.post(
            `${apiUrl}?key=${apiKey}`,
            {
                contents: [{ role: "user", parts: [{ text: prompt }] }]
            }
        );

        return response.data.candidates[0]?.content?.parts[0]?.text || "Walang sagot.";
    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        return "May error sa pagkuha ng response.";
    }
}

export default chatWithGemini;
