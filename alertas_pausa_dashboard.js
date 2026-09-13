/* ANS WFM 9.3.1 - Alertas de Pausas Integrado */

function carregarAlertasPausa(){
  const area = document.getElementById("alertasPausa");
  if(!area) return;

  const alertas = [
    {
      operador:"Aloysio Almeida",
      pausa:"Pausa 1",
      horario:"09:50"
    },
    {
      operador:"Maria Souza",
      pausa:"Almoço",
      horario:"12:00"
    }
  ];

  if(alertas.length === 0){
    area.innerHTML = "<div>✅ Nenhuma pausa pendente</div>";
    return;
  }

  area.innerHTML = alertas.map(a => `
    <div class="alerta-card">
      <b>🔴 ${a.operador}</b>
      <br>${a.pausa} - ${a.horario}
      <br><small>Aguardando confirmação</small>
      <br><button onclick="confirmarAlerta('${a.operador}')">
      Confirmar saída
      </button>
    </div>
  `).join("");
}

function confirmarAlerta(nome){
  alert("Pausa confirmada: " + nome);
  location.reload();
}