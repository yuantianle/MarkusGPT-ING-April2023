const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

// A express server, which will handle api requests coming in and respond with a json object, it will use body parser as well as cross

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const configuration = new Configuration({
  organization: "org-brRisKFSocgsfYpZmAMWdhfB",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

//our first route
app.post('/', async (req, res) => {
    const { message } = req.body;
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages:  [{"role": "user", "content": '${message}'}],
        max_tokens: 5,
        temperature: 0.9,
    });
    console.log(response.data);
    if (response.data) {
      if (response.data.choices) {
        res.json({message: response.data.choices[0].message.content});
      }
    }
    else {
      res.json({error: "Something went wrong"});
    }
});

//app.get('/', (_req, res) => {
//    res.send('Server is running');
//  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
