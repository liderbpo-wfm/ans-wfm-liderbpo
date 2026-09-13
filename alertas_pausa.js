/*
 ANS WFM 9.1.1 - Módulo Alertas de Pausa

Lógica:
- Verifica pausas programadas do operador.
- Gera alerta quando o horário chega.
- Supervisor confirma saída.
- Alerta é removido da lista pendente.
*/

function gerarAlertasPausa(usuarios) {
  const agora = new Date();
  const minutos = agora.getHours() * 60 + agora.getMinutes();

  return usuarios.flatMap(usuario => {
    const pausas = usuario.pausas || [];
    return pausas
      .filter(p => !p.confirmada)
      .filter(p => {
        const [h,m] = p.inicio.split(":").map(Number);
        const pausaMin = h*60+m;
        return minutos >= pausaMin;
      })
      .map(p => ({
        nome: usuario.nome,
        tipo: p.tipo,
        horario: p.inicio,
        status: "PENDENTE"
      }));
  });
}

function confirmarPausa(nome, tipo) {
  const evento = {
    operador: nome,
    pausa: tipo,
    confirmadoEm: new Date().toLocaleString()
  };

  localStorage.setItem(
    "ultima_confirmacao_pausa",
    JSON.stringify(evento)
  );
}