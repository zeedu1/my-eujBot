import express from "express";
import axios from "axios";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const apiKey = process.env.GEMINI_API_KEY;
const apiUrl = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent";

// Middleware
app.use(cors());
app.use(express.json());

// Set index.html as the default page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public",index.html"));
});

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// API Route for Chatbot
app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    try {
        const response = await axios.post(
            `${apiUrl}?key=${apiKey}`,
            {
                contents: [{ role: "user", parts: [{ text: userMessage }] }]
            }
        );

        const botReply = response.data.candidates[0]?.content?.parts[0]?.text || "Walang sagot.";
        res.json({ reply: botReply });

    } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        res.status(500).json({ reply: "Error processing request." });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
