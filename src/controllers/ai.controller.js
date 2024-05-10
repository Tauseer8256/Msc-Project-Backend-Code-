const { OpenAI } = require("openai");
const { OPENAI_API_KEY } = require('../utils/secrets');
const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

exports.openAi = async (req, res) => {
  try {
    console.log("asldnlsak ===", req.body.prompt);
    const completion = await openai.chat.completions.create({
    //   messages: [{ role: "system", content: "You are a helpful assistant." }],
      messages: [{ role: "system", content: req.body.prompt }],
      // model: "gpt-4-turbo",
      model: "gpt-4",
    });

    res.status(200).json(completion.choices[0]);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
};