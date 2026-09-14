function converterHorarioExcel(valor){
  if(valor === null || valor === undefined || valor === "") return "";

  if(typeof valor === "number" && Number.isFinite(valor)){
    // Excel armazena horário como fração de um dia.
    let fracao = ((valor % 1) + 1) % 1;
    let minutos = Math.round(fracao * 24 * 60) % (24 * 60);
    const h = String(Math.floor(minutos / 60)).padStart(2, "0");
    const m = String(minutos % 60).padStart(2, "0");
    return h + ":" + m;
  }

  const texto = String(valor).trim();
  if(!texto || texto === "-") return texto;

  // Normaliza H:MM / HH:MM sem alterar valores já corretos.
  const match = texto.match(/^(\d{1,2}):(\d{2})(?::\d{2})?$/);
  if(match){
    return String(Number(match[1])).padStart(2, "0") + ":" + match[2];
  }
  return texto;
}
