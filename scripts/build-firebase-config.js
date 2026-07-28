// Gera js/firebase-config.js a partir de variáveis de ambiente (Secrets do GitHub).
//
// Rodado automaticamente pelo GitHub Actions no momento do deploy
// (.github/workflows/deploy.yml) — NÃO precisa rodar isso manualmente
// no dia a dia, só serve pra build de produção.
//
// Localmente, você continua usando js/firebase-config.js criado manualmente
// a partir de js/firebase-config.example.js (veja o README).

const fs = require("fs");
const path = require("path");

const requiredVars = [
  "FIREBASE_API_KEY",
  "FIREBASE_AUTH_DOMAIN",
  "FIREBASE_PROJECT_ID",
  "FIREBASE_STORAGE_BUCKET",
  "FIREBASE_MESSAGING_SENDER_ID",
  "FIREBASE_APP_ID",
];

const missing = requiredVars.filter((key) => !process.env[key]);
if (missing.length > 0) {
  console.error("❌ Variáveis de ambiente faltando:", missing.join(", "));
  console.error("   Configure-as em: Settings > Secrets and variables > Actions, no seu repositório GitHub.");
  process.exit(1);
}

const content = `// ⚠️ ARQUIVO GERADO AUTOMATICAMENTE pelo GitHub Actions no deploy.
// NÃO EDITE ESTE ARQUIVO DIRETAMENTE — ele é sobrescrito a cada deploy.
// As chaves vêm dos Secrets do repositório (Settings > Secrets and variables > Actions).
// Para desenvolvimento local, crie sua própria cópia a partir de
// js/firebase-config.example.js (esse arquivo local NÃO vai pro Git).

const firebaseConfig = {
  apiKey: "${process.env.FIREBASE_API_KEY}",
  authDomain: "${process.env.FIREBASE_AUTH_DOMAIN}",
  projectId: "${process.env.FIREBASE_PROJECT_ID}",
  storageBucket: "${process.env.FIREBASE_STORAGE_BUCKET}",
  messagingSenderId: "${process.env.FIREBASE_MESSAGING_SENDER_ID}",
  appId: "${process.env.FIREBASE_APP_ID}"
};

export { firebaseConfig };
`;

const outPath = path.join(__dirname, "..", "js", "firebase-config.js");
fs.writeFileSync(outPath, content);
console.log("✅ js/firebase-config.js gerado com sucesso a partir das variáveis de ambiente.");
