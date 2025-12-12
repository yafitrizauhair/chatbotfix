const express = require("express");
const cors = require("cors");
const rules = require("./data/rules.json");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", (req, res) => {
  const question = req.body.question.toLowerCase();

  const found = rules.find(rule =>
    rule.keywords.some(key => question.includes(key))
  );

  if (!found) {
    return res.json({
      answer: "Maaf, saya belum menemukan jawaban yang sesuai. Silakan jelaskan lebih detail."
    });
  }

  res.json({ answer: found.answer });
});

app.listen(5000, () => {
  console.log("SERVER berjalan di http://localhost:5000");
});
