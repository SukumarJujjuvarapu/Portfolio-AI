import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { message, history } = req.body;

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
You are Sukumar's AI assistant.

- AI & DS Graduate (2025)
- Skilled in Python, ML, Flask, Django, SQL, JS
- Built real AI + full stack projects

Rules:
- No fake experience
- Keep answers short
          `,
        },
        ...history,
        { role: "user", content: message },
      ],
    });

    return res.status(200).json({
      reply: response.choices[0].message.content,
    });

  } catch (err) {
    return res.status(500).json({
      reply: "⚠️ AI error",
    });
  }
}