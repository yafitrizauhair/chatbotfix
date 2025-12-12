import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Membaca rules.json
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const raw = fs.readFileSync(path.join(__dirname, "data/rules.json"), "utf8");
const rules = JSON.parse(raw);

export function getRuleAnswer(question) {
  const lower = question.toLowerCase();
  let bestScore = 0;
  let bestAnswer = null;

  for (let rule of rules) {
    let score = 0;

    // Hitung kecocokan kata
    for (let word of rule.keywords) {
      if (lower.includes(word)) score++;
    }

    // Ambil jawaban dengan score tertinggi
    if (score > bestScore) {
      bestScore = score;
      bestAnswer = rule.answer;
    }
  }

  // Kalau tidak ada yang cocok
  if (!bestAnswer || bestScore === 0) {
    return "Maaf, saya tidak menemukan aturan yang sesuai. Silakan jelaskan lebih detail kasus absensinya.";
  }

  return bestAnswer;
}
