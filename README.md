# ANS WFM 4.5 — Login definitivo + escala dinâmica

Pacote completo para GitHub Pages.

## O que foi corrigido
- A base `ACESSOS ANS.xlsx` foi incorporada em `acessos_ans.js`, agora com 118 credenciais.
- O login e a escala usam a mesma lista `usuarios`.
- Ao abrir o sistema, qualquer escala já salva no `localStorage` é reparada com as credenciais corretas da base de acessos.
- Ao importar uma nova escala, usuário e senha são vinculados novamente pelo nome do colaborador.
- Horários numéricos do Excel são convertidos para `HH:MM`.
- Botão de olho no campo de senha.
- Admin continua `admin.ans` / `ANS#2026`.

## Visual (atualizado)
- Tela de login redesenhada em painel duplo (identidade da marca à esquerda, formulário à direita), tipografia nova (Space Grotesk + Inter) e cabeçalho mais leve.
- Rodapé fixo em todas as telas: "Criado e gerido por Eliabe Goulart — Gerente Operacional".
- Só o visual mudou (`index.html` — CSS/HTML); nenhuma lógica de login, escala ou admin foi alterada.

## Pop-up de pausa para o operador logado
- Enquanto o operador está logado, o sistema avisa com um pop-up **5 minutos antes** de cada pausa (Pausa 1, Almoço, Pausa 2) começar, com o horário previsto — e um segundo pop-up **no exato momento** em que a pausa começa.
- Cada um desses dois avisos aparece uma única vez por pausa/dia (não repete a cada minuto) e pode ser fechado clicando em "Entendi"; se ninguém interagir, ele some sozinho em 30 segundos.
- Funciona só com a aba aberta e logada como operador — não é uma notificação do sistema operacional, é dentro da página. O aviso reseta ao deslogar/logar de novo.
- Quer mudar de 5 para outro número de minutos de antecedência? É só editar a constante `AVISO_PAUSA_MINUTOS` no `index.html`.

## Versão 4.5 — visual
- Marca **WFM** em destaque: selo compacto no cabeçalho (visível em toda tela) e wordmark grande na tela de login.

## Correção: dados desatualizados em outros computadores
Cada navegador guarda uma cópia local dos dados (`localStorage`) pra funcionar sem precisar de servidor. Antes, ao publicar uma escala/credencial nova no GitHub, só usuário e senha eram corrigidos automaticamente nessa cópia — turno, cargo, supervisor e pessoas novas ficavam presos na versão antiga até alguém limpar o cache manualmente. Por isso um computador podia mostrar os dados atualizados e outro não.
- Agora o sistema carimba a base de colaboradores com uma "assinatura" que muda sozinha sempre que `usuarios.js` é atualizado. Se a assinatura salva no navegador não bate com a da base publicada, a cópia antiga é descartada e tudo volta a vir do arquivo mais recente — automaticamente, sem precisar limpar cache.
- O botão **Importar Escala** do painel admin continua funcionando normalmente: uma escala importada pela tela sobrevive a um F5, mas é substituída pela base oficial assim que uma nova versão for publicada no GitHub.
- **Importante**: essa importação pela tela (`Importar Escala`) só atualiza o navegador de quem fez a importação — ela não é enviada a mais ninguém. Para toda a equipe enxergar a mesma escala/credenciais, o caminho é sempre publicar a atualização no GitHub (como já vem sendo feito).
- Mesmo com a correção, quem já estava com a aba aberta numa versão anterior do `index.html`/`usuarios.js` precisa dar um F5 (ou reabrir a aba) **uma vez** para receber esse próprio código novo — depois disso, as próximas atualizações passam a se corrigir sozinhas.

## Correção 2: arquivo antigo preso em cache (não é só localStorage)
Se mesmo depois da correção acima o problema persistir em algumas máquinas, a causa é outra camada de cache: o navegador (ou um proxy da rede da empresa) guarda o `.js` antigo e nem chega a baixar o novo — nesse caso o código da correção 1 nunca roda, porque quem está rodando é o arquivo velho.
- Os arquivos JS agora são carregados com um número de versão na URL (`usuarios.js?v=4.5`). Isso força o navegador a tratá-los como um arquivo diferente a cada versão nova, ignorando qualquer cópia antiga guardada — sem precisar de F5 forçado.
- **Isso só funciona se o número no final da URL for atualizado a cada publicação.** Sempre que a versão mudar (ex.: 4.4 → 4.5), essas 4 linhas no fim do `index.html` precisam mudar junto:
  ```html
  <script src="conversor_horario_excel.js?v=4.5"></script>
  <script src="acessos_ans.js?v=4.5"></script>
  <script src="importar_escala.js?v=4.5"></script>
  <script src="usuarios.js?v=4.5"></script>
  ```
  (o Claude já faz isso automaticamente nas próximas atualizações, junto com o número de versão exibido na tela)

## Correção 3: index.html preso em cache do proxy/CDN (versão 4.5)
Se mesmo com as correções 1 e 2 o problema persistir em máquinas específicas, quase sempre é um proxy da rede da empresa (ou o CDN do próprio GitHub Pages) guardando uma cópia antiga do próprio `index.html` e servindo pra quem passa por ali, independente do F5 individual de cada pessoa. Duas coisas foram adicionadas em 4.5 pra atacar isso:
- **Meta tags anti-cache no `<head>`** (`Cache-Control`, `Pragma`, `Expires`), pedindo ao navegador para revalidar o HTML a cada visita em vez de reaproveitar cópia guardada.
- **Auto-recarregamento inteligente na primeira visita a uma nova versão**: um pequeno script no topo do arquivo verifica se essa é a primeira vez que aquele navegador vê a versão atual. Se for e ainda não tem o parâmetro `?v=X.Y` na URL, ele adiciona automaticamente e recarrega uma única vez. Esse parâmetro na URL é diferente do anterior, o que geralmente força qualquer proxy intermediário a buscar a versão nova diretamente da origem. Não entra em loop — o `localStorage` marca que essa versão já foi carregada.

Se ainda assim uma máquina insistir em ver a versão antiga depois disso, o problema está no cache do proxy corporativo pra páginas HTML em geral — nesse caso a solução definitiva envolve pedir pra o setor de TI liberar o domínio do GitHub Pages ou reduzir o TTL do cache pra HTML.
Se mesmo depois da correção acima o problema persistir em algumas máquinas, a causa é outra camada de cache: o navegador (ou um proxy da rede da empresa) guarda o `.js` antigo e nem chega a baixar o novo — nesse caso o código da correção 1 nunca roda, porque quem está rodando é o arquivo velho.
- Os arquivos JS agora são carregados com um número de versão na URL (`usuarios.js?v=4.5`). Isso força o navegador a tratá-los como um arquivo diferente a cada versão nova, ignorando qualquer cópia antiga guardada — sem precisar de F5 forçado.
- **Isso só funciona se o número no final da URL for atualizado a cada publicação.** Sempre que a versão mudar (ex.: 4.4 → 4.5), essas 4 linhas no fim do `index.html` precisam mudar junto:
  ```html
  <script src="conversor_horario_excel.js?v=4.5"></script>
  <script src="acessos_ans.js?v=4.5"></script>
  <script src="importar_escala.js?v=4.5"></script>
  <script src="usuarios.js?v=4.5"></script>
  ```
  (o Claude já faz isso automaticamente nas próximas atualizações, junto com o número de versão exibido na tela)

## Padrão de login (atualizado)
- **Usuário**: `primeiro.ultimonome` (mesmo padrão de sempre), ex.: `aloysio.almeida`, `ketley.gomes`.
- **Senha**: a data de nascimento do colaborador(a), no formato `ddmmaaaa` (ex.: 03/05/1999 → `03051999`).
- Fonte das datas: `acessos.xlsx` (aba CADOPDB), enviado por Eliabe.
- **Ketley de Lima Gomes**: usuário `ketley.gomes`, senha `17121994`. Turno confirmado: 08:00 às 16:12, supervisão WALLACE. As pausas (09:20 / almoço 11:30 / 14:00) ainda são um valor provisório, seguindo o padrão mais comum do Nível 1 nesse turno — ajustar se os horários reais de pausa forem diferentes.
- **Bianca da Fonseca Magalhaes não é operadora e foi removida do escopo** — não está mais em `acessos_ans.js` nem em `usuarios.js`.

## Teste conhecido
- Aloysio: `aloysio.almeida` / `03051999`.

## Observação de segurança
A senha ser a própria data de nascimento é uma decisão operacional do Eliabe. Vale lembrar que qualquer pessoa que souber a data de nascimento de alguém (ex.: rede social, crachá) consegue entrar na conta dela — se quiser reduzir esse risco no futuro, dá pra trocar só a regra da senha, sem mexer no usuário.

## Instalação
1. Faça backup do repositório atual.
2. Apague os arquivos atuais.
3. Envie todos os arquivos deste pacote na raiz do repositório.
4. Aguarde o GitHub Pages publicar.
5. Faça `Ctrl + F5` ou teste em janela anônima.
