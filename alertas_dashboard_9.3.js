/*
 ANS WFM 9.3
 Painel de Alertas de Pausas

 Exibe:
 - contador de alertas pendentes
 - operador
 - tipo de pausa
 - horário previsto
 - confirmação do supervisor
*/

function renderAlertasPausa(alertas){
  const area = document.getElementById("alertasPausa");

  if(!area) return;

  if(!alertas || alertas.length === 0){
    area.innerHTML = `
      <div class="alerta-ok">
        ✅ Nenhuma pausa pendente no momento
      </div>`;
    return;
  }

  area.innerHTML = alertas.map(a => `
    <div class="alerta-card">
      <strong>🔴 ${a.operador}</strong>
      <div>${a.tipo} - ${a.horario}</div>
      <span>Pendente de confirmação</span>
      <button onclick="confirmarPausa('${a.operador}','${a.tipo}')">
        Confirmar saída
      </button>
    </div>
  `).join("");
}

function confirmarPausa(operador, tipo){
  const historico = JSON.parse(
    localStorage.getItem("confirmacoes_pausa") || "[]"
  );

  historico.push({
    operador,
    tipo,
    data: new Date().toLocaleString()
  });

  localStorage.setItem(
    "confirmacoes_pausa",
    JSON.stringify(historico)
  );

  location.reload();
}