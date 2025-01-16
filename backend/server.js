require("dotenv").config();
const { body, validationResult } = require("express-validator");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const rateLimit = require("express-rate-limit");

const app = express();

// Serve i file statici dal build del frontend
app.use(express.static(path.join(__dirname, "public")));

// Catch-all per SPA (Single Page Application)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST",
  allowedHeaders: "Content-Type",
};

app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  max: 3,
  message: "Hai raggiunto il limite giornaliero di messaggi!",
});

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.post(
  "/send-email",
  limiter,
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Il nome è obbligatorio!")
      .isLength({ min: 2, max: 50 })
      .withMessage("Il nome deve essere tra 2 e 50 caratteri!")
      .matches(/^[a-zA-Zà-žÀ-Ž\s'-]+$/)
      .withMessage("Il nome contiene caratteri non validi!"),

    body("email")
      .isEmail()
      .withMessage("L'email non è valida!")
      .normalizeEmail(),

    body("message")
      .notEmpty()
      .withMessage("Il messaggio è obbligatorio!")
      .isLength({ min: 10, max: 1000 })
      .withMessage("Il messaggio deve essere tra 10 e 1000 caratteri!"),
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
        "https://api.emailjs.com/api/v1.0/email/send",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      res.status(200).json({
        message: "Email inviata con successo",
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

app.listen(PORT, () => {
  console.log(`Server backend in esecuzione su http://localhost:${PORT}`);
});
