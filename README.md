ANS WFM 11.0 - Escala Dinâmica

Versão final consolidada do projeto.

Objetivo:
A planilha XLSX enviada pelo Admin passa a ser a fonte de atualização da escala.

Fluxo:
1. Admin entra:
   usuário: admin.ans
   senha: ANS#2026

2. Envia a planilha da escala.

3. Sistema valida:
   - colaboradores
   - supervisores
   - horários
   - pausas

4. Após confirmação:
   - atualiza escala
   - atualiza pausas
   - atualiza calendário
   - atualiza dashboard

Arquivos principais:
- index.html
- usuarios.js
- importar_escala.js
- módulos administrativos

Observação:
Esta versão mantém a estrutura estática do GitHub Pages.
Para uso multiusuário simultâneo, a próxima evolução seria banco online.