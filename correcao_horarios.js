
// ANS WFM 10.3.4
// Conversão de horários Excel para HH:MM

function formatarHorarioExcel(valor){
  if(valor === null || valor === undefined || valor === "") return "--:--";

  if(typeof valor === "number"){
    let minutos = Math.round(valor * 24 * 60);
    let h = String(Math.floor(minutos / 60)).padStart(2,"0");
    let m = String(minutos % 60).padStart(2,"0");
    return `${h}:${m}`;
  }

  return valor;
}

function aplicarFormatoEscala(item){
  return {
    ...item,
    entrada: formatarHorarioExcel(item.entrada || item.ENTRADA),
    saida: formatarHorarioExcel(item.saida || item.SAIDA),
    pausa1: formatarHorarioExcel(item.pausa1 || item["PAUSA 1"]),
    almoco: formatarHorarioExcel(item.almoco || item["ALMOÇO"]),
    pausa2: formatarHorarioExcel(item.pausa2 || item["PAUSA 2"])
  };
}
