# ANS WFM 10.4.2 — Login definitivo + escala dinâmica

Pacote completo para GitHub Pages.

## O que foi corrigido
- A base `ACESSOS ANS.xlsx` foi incorporada em `acessos_ans.js`, agora com 119 credenciais (118 + Ketley de Lima Gomes).
- O login e a escala usam a mesma lista `usuarios`.
- Ao abrir o sistema, qualquer escala já salva no `localStorage` é reparada com as credenciais corretas da base de acessos.
- Ao importar uma nova escala, usuário e senha são vinculados novamente pelo nome do colaborador.
- Horários numéricos do Excel são convertidos para `HH:MM`.
- Botão de olho no campo de senha.
- Admin continua `admin.ans` / `ANS#2026`.

## Padrão de login (atualizado)
- Usuário e senha de cada operador(a) agora são a **própria data de nascimento**, no formato `ddmmaa` (ex.: 03/05/1999 → `030599`). Usuário e senha são idênticos.
- Fonte das datas: `acessos.xlsx` (aba CADOPDB), enviado por Eliabe.
- **Ketley de Lima Gomes** foi cadastrada com usuário/senha `171294` (data de nascimento). Turno confirmado: 08:00 às 16:12, supervisão WALLACE. As pausas (09:20 / almoço 11:30 / 14:00) ainda são um valor provisório, seguindo o padrão mais comum do Nível 1 nesse turno — ajustar se os horários reais de pausa forem diferentes.
- **Bianca da Fonseca Magalhaes não é operadora e foi removida do escopo** — não está mais em `acessos_ans.js` nem em `usuarios.js`.

## Teste conhecido
- Aloysio: `030599` / `030599`.

## Observação de segurança
Usuário e senha iguais (a própria data de nascimento) é uma decisão operacional do Eliabe. Vale lembrar que qualquer pessoa que souber a data de nascimento de alguém consegue entrar na conta dela — se quiser reduzir esse risco no futuro, dá pra manter o usuário como está e trocar só a senha por outra regra.

## Instalação
1. Faça backup do repositório atual.
2. Apague os arquivos atuais.
3. Envie todos os arquivos deste pacote na raiz do repositório.
4. Aguarde o GitHub Pages publicar.
5. Faça `Ctrl + F5` ou teste em janela anônima.
