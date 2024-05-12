const { OpenAI } = require("openai"); // [1]
const { OPENAI_API_KEY } = require('../utils/secrets');
const openai = new OpenAI({ // This code initializes an instance of the OpenAI API client using an API key.
    apiKey: OPENAI_API_KEY,
});

exports.openAi = async (req, res) => {
  try {
    const lang = req.params.language.toLowerCase();
    langArr = {
      "en": "English",
      "gb": "English",
      "ur": "Urdu",
      "hi": "Hindi",
      "bn": "Bangla",
      "cn": "Chinese"
    }
    const language = langArr[lang];
    const prompt = req.body.prompt + ` please provide answer related to london only and response should be in ${language} language`;
    console.log("prompt ===", prompt, OPENAI_API_KEY);
    const completion = await openai.chat.completions.create({
    //   messages: [{ role: "system", content: "You are a helpful assistant." }],
      messages: [{ role: "system", content: prompt }],
      model: "gpt-4-turbo",
      // model: "gpt-3.5-turbo",
    });

    res.status(200).json(completion.choices[0]);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
};

// [1] "openai." npm, 2024. [Online]. Available: https://www.npmjs.com/package/openai. [Accessed: April 21, 2024]..