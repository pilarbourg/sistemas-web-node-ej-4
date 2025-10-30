const axios = require("axios");
const cheerio = require("cheerio");

const scraperData = { latestData: [] };

async function scrapeWebsite() {
  try {
    const url = "https://www.bbc.com/innovation";
    const response = await axios.get(url);

    const $ = cheerio.load(response.data);

    scraperData.latestData = [];

    $('h2[data-testid="card-headline"]').each((i, elem) => {
      const title = $(elem).text().trim();
      const descriptionElem = $(elem).closest('a').find('p[data-testid="card-description"]');
      const description = descriptionElem.text().trim();

      scraperData.latestData.push({ title, description });
    });

    console.log("Scraped", scraperData.latestData.length, "items");
  } catch (err) {
    console.error("Error fetching the page:", err.message);
  }
}

scrapeWebsite();
setInterval(scrapeWebsite, 10 * 60 * 1000);

module.exports = { scraperData, scrapeWebsite };