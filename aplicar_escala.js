/*
 ANS WFM 10.3
 Aplicação real da escala importada

 Fluxo:
 - recebe os registros importados
 - salva nova base ativa
 - recarrega dados do sistema
*/

function aplicarNovaEscala(registros){
  const validos = registros.filter(r =>
    r.COLABORADOR &&
    r.COLABORADOR.trim() !== ""
  );

  localStorage.setItem(
    "usuarios_ativos",
    JSON.stringify(validos)
  );

  return {
    sucesso: true,
    total: validos.length
  };
}

function carregarEscalaAtiva(){
  return JSON.parse(
    localStorage.getItem("usuarios_ativos") || "[]"
  );
}