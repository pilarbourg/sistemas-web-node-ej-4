const http = require("http");
const scraper = require("./scraper");

const port = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

  const data = scraper.scraperData.latestData;

  res.end(`
    <html>
      <head>
        <title>Scraped Data</title>
        <style>
          body {
            font-family: 'Segoe UI', Roboto, sans-serif;
            background-color: #fff;
            color: #02367B;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          h1 {
            text-align: center;
            margin-bottom: 2rem;
            background-color: #02367B;
            color: #ffffff;
            width: 100%;
            padding: 2rem;
          }

          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 1.5rem;
            max-width: 1200px;
            margin-bottom: 2rem;
          }

          .card {
            background-color: #fff;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }

          .card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          }

          .card h2 {
            margin: 0 0 0.5rem 0;
            font-size: 1.2rem;
          }

          .card p {
            margin: 0;
            font-size: 0.95rem;
            line-height: 1.4;
          }
        </style>
      </head>
      <body>
        <h1>Current BBC Headlines</h1>
        <div class="grid">
          ${data.map(item => `
            <div class="card">
              <h2>${item.title}</h2>
              <p>${item.description || ''}</p>
            </div>
          `).join('')}
        </div>
      </body>
    </html>
  `);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});