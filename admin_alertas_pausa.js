/*
 ANS WFM 9.2 - Dashboard Supervisor

Funcionalidades:
- Alertas automáticos por horário de pausa
- Confirmação manual do supervisor
- Baixa do alerta após confirmação
- Histórico local de confirmações
*/

function gerarAlertasPausa(colaboradores, agora = new Date()){
  const minutoAtual = agora.getHours()*60 + agora.getMinutes();

  return colaboradores.flatMap(c =>
    (c.pausas || []).filter(p => {
      const [h,m] = p.inicio.split(':').map(Number);
      return minutoAtual >= (h*60+m) && !p.confirmada;
    }).map(p => ({
      operador:c.nome,
      pausa:p.tipo,
      horario:p.inicio,
      status:"PENDENTE"
    }))
  );
}

function confirmarPausa(operador, pausa){
  const registros = JSON.parse(localStorage.getItem("historico_pausas") || "[]");
  registros.push({
    operador,
    pausa,
    confirmadoEm:new Date().toLocaleString()
  });
  localStorage.setItem("historico_pausas", JSON.stringify(registros));
}