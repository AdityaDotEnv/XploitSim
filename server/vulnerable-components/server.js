const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Demo API endpoint
app.get('/api/data', (req, res) => {
  res.json({
    message: "This server uses intentionally outdated components for the OWASP Vulnerable & Outdated Components demo."
  });
});

// Changed PORT to avoid conflict with Cryptographic Failures (5001)
const PORT = 5002;

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Vulnerable Components backend running at http://127.0.0.1:${PORT}`);
});
