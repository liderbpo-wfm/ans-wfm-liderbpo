/*
 ANS WFM 10.3.2
 Controle de escala ativa

 Evita retorno silencioso para a base antiga após importação.
*/

function salvarEscalaAtiva(registros, mesReferencia){
  const validos = registros.filter(r =>
    r.COLABORADOR &&
    r.COLABORADOR.trim() !== ""
  );

  const pacote = {
    ativo: true,
    mes: mesReferencia || "Atual",
    atualizadoEm: new Date().toLocaleString(),
    total: validos.length,
    dados: validos
  };

  localStorage.setItem(
    "ans_escala_ativa",
    JSON.stringify(pacote)
  );

  localStorage.setItem(
    "usuarios_ativos",
    JSON.stringify(validos)
  );

  return pacote;
}

function obterEscalaAtiva(){
  return JSON.parse(
    localStorage.getItem("ans_escala_ativa") || "null"
  );
}