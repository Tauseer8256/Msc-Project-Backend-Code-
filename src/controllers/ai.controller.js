const { OpenAI } = require("openai");
const { OPENAI_API_KEY } = require('../utils/secrets');
const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
});

exports.openAi = async (req, res) => {
  try {
    console.log("asldnlsak ===", req.body.prompt);
    console.log("asldnlsak ===", req.params);

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
    // console.log("asldnlsak ===1", lang );
    // let temp = {
    //   "index": 0,
    //   "message": {
    //     "role": "assistant",
    //     "content": "Royal Nawab is located at Hoover Building 7, Western Ave, London, Perivale, Greenford UB6 8DB, UK. Response 1 "
    //   },
    //   "logprobs": null,
    //   "finish_reason": "stop",
    //   "language": lang,
    //   "success": true
    // }
    // res.status(200).json(temp);

    const prompt = req.body.prompt + ` please provide answer related to london only and response should be in ${language} language`;
    console.log("prompt ===", prompt);
    const completion = await openai.chat.completions.create({
    //   messages: [{ role: "system", content: "You are a helpful assistant." }],
      messages: [{ role: "system", content: prompt }],
      // model: "gpt-4-turbo",
      model: "gpt-3.5-turbo",
    });

    res.status(200).json(completion.choices[0]);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
};