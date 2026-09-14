/*
 ANS WFM 10.3.5
 Sincronização de acessos

 Usa a base de acessos importada para manter login
 enquanto a escala é atualizada.
*/

function autenticarUsuario(usuario, senha){
  const base = JSON.parse(
    localStorage.getItem("acessos_ans") || "[]"
  );

  return base.find(u =>
    u.usuario === usuario &&
    u.senha === senha
  );
}

function carregarAcessosANS(dados){
  localStorage.setItem(
    "acessos_ans",
    JSON.stringify(dados)
  );
}