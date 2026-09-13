/*
ANS WFM 9.3.4
Controle visual de alertas.
*/
function atualizarAlertas(){
  const el=document.getElementById("alertasPausa");
  if(el){
    el.innerHTML="Nenhum alerta pendente.";
  }
}