
const getAiResponse = async (prompt: string) => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',

    }
  });

  const data = await response.json();
  return data.choices[0].message.content;
};

