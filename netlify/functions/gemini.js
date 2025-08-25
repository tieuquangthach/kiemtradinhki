// netlify/functions/gemini.js
import fetch from "node-fetch";

export async function handler(event, context) {
  try {
    const body = JSON.parse(event.body);

    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`, // ẩn key
      },
      body: JSON.stringify({
        contents: [
          { role: "user", parts: [{ text: body.prompt }] }
        ]
      }),
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}

