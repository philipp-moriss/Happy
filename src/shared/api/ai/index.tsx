const API_KEY = "OpgQBFYEI81yYqPnLWkAzcc2UbdEUJv3";
const API_URL = "https://api.mistral.ai/v1/agents/completions";

export const queryMistralAI = async (prompt: string) => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        agent_id: 'ag:cff420e9:20250223:mynewpromt:8911eca7',
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content
  } catch (error) {
    console.error("Ошибка запроса:", error);
  }
};


const handleAiJson = (aiResponse: string) => {
    const jsonMatch = aiResponse.match(/```json\n([\s\S]*?)\n```/);
    let jsonString = jsonMatch ? jsonMatch[1] : aiResponse;
    if (!jsonMatch) {
      const fallbackMatch = aiResponse.match(/```\n([\s\S]*?)\n```/);
      jsonString = fallbackMatch ? fallbackMatch[1] : aiResponse;
    }
    const cleanedString = jsonString.trim();
    try {
      const jsonResponse = JSON.parse(cleanedString);
      return jsonResponse;
    } catch {
      throw new Error('Invalid JSON response from AI');
    }
  }
