import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { SystemMessage, HumanMessage, AIMessage } from "@langchain/core/messages";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const app = express();
const PORT = process.env.CHATBOT_PORT || 5700;

app.use(cors());
app.use(bodyParser.json());

const model = new ChatGoogleGenerativeAI({
  modelName: "gemini-2.5-flash",
  maxOutputTokens: 2048,
  apiKey: process.env.GOOGLE_API_KEY,
});

const SYSTEM_PROMPT = `You are XploitSim AI, a highly knowledgeable cybersecurity assistant. 
Your goal is to help users understand web security, exploits, and OWASP vulnerabilities.
Always provide accurate, educational, and ethical information.
If asked about performing illegal activities, explain why they are dangerous and focus on how to defend against such attacks.
Keep your responses concise and engaging. Use markdown for better readability.`;

app.post('/ask', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const messages = [
      new SystemMessage(SYSTEM_PROMPT),
      ...(history || []).map((msg: any) => 
        msg.role === 'user' ? new HumanMessage(msg.text) : new AIMessage(msg.text)
      ),
      new HumanMessage(message)
    ];

    const response = await model.invoke(messages);
    
    res.json({ text: response.content });
  } catch (error: any) {
    console.error('ChatBot Error:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({ status: 'ChatBot service is running' });
});

app.listen(PORT, () => {
  console.log(`🤖 ChatBot microservice running at http://localhost:${PORT}`);
});
