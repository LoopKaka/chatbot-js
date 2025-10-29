import express from "express";
import OpenAI from "openai";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(cors());

const SYSTEM_PROMPT = `You are an AI agent who solves user queries and gives answer in 50 words. 
You don't answer related to any coding questions and ploitely say user to ask different questions.`;

const openai = new OpenAI({
  apiKey: "AIzaSyCTxrQCu5U3s_5Z5QUesRAcutHfpzJWfDI",
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

app.get("/", (req, resp) => {
  resp.send("LoopKaka Chatbot Using JavaScript");
});

app.post("/chat", async (req, resp) => {
  const messages = req.body?.messages || undefined;

  if (!messages) {
    resp.status(400).json({
      message: "Bhai message sahi se bhejo!!!",
    });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gemini-2.0-flash",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    });

    resp.status(200).json({
      message: response.choices[0].message,
    });
  } catch (error) {
    console.error("Error", error);
    resp.status(500).json({
      message: "Something went wrong!!!",
    });
  }
});

app.listen(PORT, (req, resp) => {
  console.log(`Server listing to PORT ${PORT}`);
});
