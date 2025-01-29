require('dotenv').config();
const { body, validationResult } = require('express-validator');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const rateLimit = require('express-rate-limit');
const path = require('path');
const os = require('os');

const app = express();
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  // origin: '*',
  methods: 'GET,POST',
  allowedHeaders: 'Content-Type',
};
app.use(cors(corsOptions));

// Serve i file statici dal build del frontend
app.use(express.static(path.join(__dirname, 'public')));

app.get('/images/:filename', (req, res) => {
  const { filename } = req.params;
  const imagePath = path.join(__dirname, 'public', filename); // Percorso dell'immagine

  // Verifica se il file esiste
  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).send('File non trovato');
    }

    // Impostiamo il tipo di contenuto in base al tipo di immagine
    const ext = path.extname(filename).toLowerCase();
    if (ext === '.png') {
      res.setHeader('Content-Type', 'image/png');
    } else if (ext === '.jpg' || ext === '.jpeg') {
      res.setHeader('Content-Type', 'image/jpeg');
    } else if (ext === '.gif') {
      res.setHeader('Content-Type', 'image/gif');
    } else {
      return res.status(415).send('Tipo di file non supportato');
    }

    // Stream dell'immagine al client
    const imageStream = fs.createReadStream(imagePath);
    imageStream.pipe(res);

    imageStream.on('open', () => console.log('📡 Streaming in corso...'));

    // Gestione errori
    imageStream.on('error', (err) => {
      console.error('Errore durante lo streaming del file:', err);
      res.status(500).send("Errore durante il caricamento dell'immagine");
    });
  });
});

// Catch-all per SPA (Single Page Application)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 10,
  message: 'Hai raggiunto il limite giornaliero di messaggi!',
});

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.post(
  '/send-email',
  limiter,
  [
    body('name')
      .trim()
      .notEmpty()
      .withMessage('Il nome è obbligatorio!')
      .isLength({ min: 2, max: 50 })
      .withMessage('Il nome deve essere tra 2 e 50 caratteri!')
      .matches(/^[a-zA-Zà-žÀ-Ž\s'-]+$/)
      .withMessage('Il nome contiene caratteri non validi!'),

    body('email')
      .isEmail()
      .withMessage("L'email non è valida!")
      .normalizeEmail(),

    body('message')
      .notEmpty()
      .withMessage('Il messaggio è obbligatorio!')
      .isLength({ min: 10, max: 1000 })
      .withMessage('Il messaggio deve essere tra 10 e 1000 caratteri!'),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, message } = req.body;

    const data = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      template_params: {
        name: name,
        email: email,
        message: message,
      },
    };

    try {
      const response = await axios.post(
        'https://api.emailjs.com/api/v1.0/email/send',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      res.status(200).json({
        message: 'Email inviata con successo',
        response: response.data,
      });
    } catch (error) {
      console.error(
        "Errore nell'invio dell'email:",
        error.response?.data || error.message
      );
      res.status(500).json({ error: "Errore nell'invio dell'email" });
    }
  }
);

// setInterval(() => {
//   const memoryUsage = process.memoryUsage(); // Uso memoria del processo
//   const freeMem = os.freemem() / 1e6; // RAM libera in MB
//   const totalMem = os.totalmem() / 1e6; // RAM totale in MB

//   console.log('🔹 Memoria usata (MB):', (memoryUsage.rss / 1e6).toFixed(2));
//   console.log(
//     '🔹 Memoria libera (MB):',
//     freeMem.toFixed(2),
//     '/',
//     totalMem.toFixed(2)
//   );
//   console.log('🔹 Numero CPU:', os.cpus().length);
//   console.log('🔹 Uptime server (minuti):', (os.uptime() / 60).toFixed(2));
//   console.log('----------------------------');
// }, 5000); // Stampa ogni 5 secondi

app.listen(PORT, () => {
  console.log(`Server backend in esecuzione su http://localhost:${PORT}`);
});
