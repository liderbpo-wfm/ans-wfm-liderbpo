# ANS WFM 10.4.2 — Login definitivo + escala dinâmica

Pacote completo para GitHub Pages.

## O que foi corrigido
- A base `ACESSOS ANS.xlsx` foi incorporada em `acessos_ans.js` com 118 credenciais.
- O login e a escala usam a mesma lista `usuarios`.
- Ao abrir o sistema, qualquer escala já salva no `localStorage` é reparada com as credenciais corretas da base de acessos.
- Ao importar uma nova escala, usuário e senha são vinculados novamente pelo nome do colaborador.
- Horários numéricos do Excel são convertidos para `HH:MM`.
- Botão de olho no campo de senha.
- Admin continua `admin.ans` / `ANS#2026`.

## Teste conhecido
- Aloysio: `aloysio.almeida` / `ANS#3888`.

## Instalação
1. Faça backup do repositório atual.
2. Apague os arquivos atuais.
3. Envie todos os arquivos deste pacote na raiz do repositório.
4. Aguarde o GitHub Pages publicar.
5. Faça `Ctrl + F5` ou teste em janela anônima.
