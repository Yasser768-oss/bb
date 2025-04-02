const express = require('express');
const { OpenAI } = require('openai');
const axios = require('axios'); // لاستخدام Google API
const app = express();
const port = 3000;

// مفتاح API من OpenAI (قم بإدخال مفتاحك هنا)
const openai = new OpenAI({
    apiKey: 'YOUR_OPENAI_API_KEY', // ضع API Key هنا
});

// مفتاح API من Google Custom Search
const googleApiKey = 'YOUR_GOOGLE_API_KEY';
const searchEngineId = 'YOUR_SEARCH_ENGINE_ID';

app.use(express.static('public'));
app.use(express.json());

app.post('/ask', async (req, res) => {
    const { question } = req.body;

    try {
        // إذا كانت الأسئلة تتعلق بالرياضيات، أضف تعامل خاص
        if (question.toLowerCase().includes('رياضيات') || question.toLowerCase().includes('جمع') || question.toLowerCase().includes('طرح')) {
            const response = await openai.chat.completions.create({
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: 'أنت مساعد رياضيات للأطفال وتشرح العمليات الرياضية ببساطة.' },
                    { role: 'user', content: question },
                ],
            });

            res.json({ answer: response.choices[0].message.content });
        } else {
            // البحث في Google إذا كانت الأسئلة تتعلق بمعلومات أخرى
            const googleResponse = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
                params: {
                    key: googleApiKey,
                    cx: searchEngineId,
                    q: question
                }
            });

            if (googleResponse.data.items && googleResponse.data.items.length > 0) {
                res.json({ answer: googleResponse.data.items[0].snippet });
            } else {
                res.json({ answer: 'عذرًا، لم أتمكن من إيجاد إجابة لهذه السؤال.' });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('حدث خطأ في الاتصال بـ OpenAI API أو Google API.');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
