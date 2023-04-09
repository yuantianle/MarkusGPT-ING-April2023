const OpenAI = require('openai');
const { Configuration, OpenAIApi } = OpenAI;

// A express server, which will handle api requests coming in and respond with a json object, it will use body parser as well as cross

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;
const env = require('dotenv');

env.config()

app.use(bodyParser.json());
app.use(cors());

// Set up the OpenAI API configuration with the provided API key
const configuration = new Configuration({
  organization: "org-brRisKFSocgsfYpZmAMWdhfB",
  apiKey: process.env.API_KEY,
  
});
const openai = new OpenAIApi(configuration);


//our first route
app.post('/', async (req, res) => {
    const { message } = req.body;

    try {
      const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages:  [{role: "user", content: `${message}`}],
          max_tokens: 50,
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
    } catch (err) {
      console.error(err.message);
      if (err.message && err.message.includes("401")) {
        res.status(401).json({ error: "Invalid API Key", invalidApiKey: true });
      } else {
        res.status(500).json({ error: "An error occurred while processing the request" });
      }
    }
});

//app.get('/', (_req, res) => {
//    res.send('Server is running');
//  });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
