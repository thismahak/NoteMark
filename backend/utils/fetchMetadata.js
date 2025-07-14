// utils/fetchMetadata.js
const axios = require('axios');
const cheerio = require('cheerio');

const fetchTitleFromUrl = async (url) => {
  try {
    const response = await axios.get(url, {
      timeout: 5000,
      headers: {
        'User-Agent': 'Mozilla/5.0',
        Accept: 'text/html'
      }
    });

    const $ = cheerio.load(response.data);
    const title = $('title').text().trim();

    return title || '';
  } catch (err) {
    console.error(`❌ Error fetching title from ${url}:`, err.message);
    return '';
  }
};

module.exports = fetchTitleFromUrl;
