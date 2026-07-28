// ============================================================
// EXEMPLO de configuração do Firebase — Bagagem Dev
// ============================================================
//
// Este arquivo é só um MODELO e fica público no repositório.
// O arquivo de verdade (com suas chaves reais) é "firebase-config.js",
// que NÃO é commitado no Git (está no .gitignore) — funciona como
// um ".env" para projetos estáticos sem build tool.
//
// COMO USAR:
// 1. Copie este arquivo e renomeie a cópia para "firebase-config.js"
//    (mesma pasta js/)
// 2. Preencha os valores abaixo com as credenciais do SEU projeto Firebase
//    (veja o passo a passo completo no README.md, seção "Instalar Firebase")
// 3. Pronto — "firebase-config.js" nunca é enviado pro Git, então suas
//    chaves ficam só na sua máquina / no seu deploy.
//
// Nota técnica: as chaves do Firebase Web (apiKey, authDomain, etc) não são
// "secretas" no sentido tradicional — quem acessar o site consegue vê-las
// no código-fonte de qualquer forma. A segurança de verdade vem das REGRAS
// do Firestore (arquivo firestore.rules), que controlam quem pode ler/escrever
// cada coleção. Ainda assim, mantemos esse arquivo fora do Git como boa prática
// e pra evitar publicar o projectId/appId de forma descuidada.

const firebaseConfig = {
  apiKey: "COLE_AQUI",
  authDomain: "COLE_AQUI.firebaseapp.com",
  projectId: "COLE_AQUI",
  storageBucket: "COLE_AQUI.appspot.com",
  messagingSenderId: "COLE_AQUI",
  appId: "COLE_AQUI"
};

export { firebaseConfig };
