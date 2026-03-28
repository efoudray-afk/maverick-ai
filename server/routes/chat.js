const express = require('express');
const router = express.Router();
const groq = require('../lib/anthropic');
const systemPrompt = require('../prompts/systemPrompt');

const MAX_HISTORY = 20;

router.post('/', async (req, res) => {
  const { messages } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages must be a non-empty array' });
  }

  const trimmedMessages = messages.slice(-MAX_HISTORY);

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 300,
      messages: [
        { role: 'system', content: systemPrompt },
        ...trimmedMessages,
      ],
    });

    const reply = completion.choices[0].message.content;
    res.json({ reply });
  } catch (err) {
    console.error('Groq API error:', err.message);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

module.exports = router;
