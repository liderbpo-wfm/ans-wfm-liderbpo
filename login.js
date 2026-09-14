/*
 ANS WFM 10.3.6
 Autenticação integrada com ACESSOS ANS
*/

function alternarSenha(){
  const campo = document.getElementById("senha");
  if(!campo) return;
  campo.type = campo.type === "password" ? "text" : "password";
}

function autenticar(usuario, senha){
  const acessos = JSON.parse(
    localStorage.getItem("acessos_ans") || "[]"
  );

  const encontrado = acessos.find(a =>
    a.usuario === usuario && a.senha === senha
  );

  if(encontrado){
    localStorage.setItem(
      "usuario_logado",
      JSON.stringify(encontrado)
    );
    return encontrado;
  }

  return null;
}