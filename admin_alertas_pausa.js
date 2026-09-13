/*
ANS WFM 9.3.4
Módulo administrativo de alertas de pausa.
*/
function confirmarPausaSupervisor(id){
  const dados = JSON.parse(localStorage.getItem("pausas_confirmadas") || "[]");
  dados.push({
    alerta:id,
    data:new Date().toLocaleString()
  });
  localStorage.setItem("pausas_confirmadas", JSON.stringify(dados));
}