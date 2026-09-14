function mostrarSenha(){
 const campo=document.getElementById("senha");
 campo.type = campo.type==="password" ? "text" : "password";
}

function entrar(){
 const usuario=document.getElementById("usuario").value;
 const senha=document.getElementById("senha").value;

 const base=obterColaboradores();

 const colaborador=base.find(c =>
   c.usuario===usuario &&
   c.senha===senha
 );

 if(colaborador){
   localStorage.setItem("usuario_logado", JSON.stringify(colaborador));
   alert("Login autorizado: "+colaborador.nome);
 }else{
   alert("Usuário ou senha inválidos.");
 }
}