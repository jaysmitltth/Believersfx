// server.js
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = 3001;
const NEWS_API_KEY = NEXT_PUBLIC_NEWS_API_KEY; 
const cors = require('cors')

app.use(cors()); 
app.use(express.json());

app.get('/fetch-news', async (req, res) => {
  try {

    const currentDate = new Date().toISOString().split('T')[0];

    const response = await fetch(`https://newsapi.org/v2/everything?q=bitcoin|crypto|trading|ethereum|stock&from=2024-02-12&to=${currentDate}&language=en&sortBy=relevancy&page=2`, {
      headers: {
        'Authorization': `Bearer ${NEWS_API_KEY}`
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});