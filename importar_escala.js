/* ANS WFM 4.4 - Importação integrada e autenticação preservada */

function normalizarCabecalho(valor){
  return String(valor || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toUpperCase();
}

function valorColuna(registro, aliases){
  const mapa = {};
  Object.keys(registro || {}).forEach(k => {
    mapa[normalizarCabecalho(k)] = registro[k];
  });
  for(const alias of aliases){
    const chave = normalizarCabecalho(alias);
    if(Object.prototype.hasOwnProperty.call(mapa, chave)) return mapa[chave];
  }
  return "";
}

function normalizarOperadorExcel(r){
  const nome = String(valorColuna(r, ["COLABORADOR"]) || "").trim();
  if(!nome || normalizarCabecalho(nome) === "COLABORADOR") return null;

  return {
    nome,
    status: String(valorColuna(r, ["STATUS"]) || "ATIVO").trim() || "ATIVO",
    cargo: String(valorColuna(r, ["CARGO"]) || "").trim(),
    supervisor: String(valorColuna(r, ["SUPERVISOR(A)", "SUPERVISOR", "SUPERVISORA"]) || "").trim(),
    entrada: converterHorarioExcel(valorColuna(r, ["ENTRADA"])),
    pausa1: converterHorarioExcel(valorColuna(r, ["PAUSA 1", "PAUSA1"])),
    almoco: converterHorarioExcel(valorColuna(r, ["ALMOÇO", "ALMOCO"])),
    pausa2: converterHorarioExcel(valorColuna(r, ["PAUSA 2", "PAUSA2"])),
    saida: converterHorarioExcel(valorColuna(r, ["SAÍDA", "SAIDA"]))
  };
}

function aplicarNovaEscala(registros){
  let nova = (Array.isArray(registros) ? registros : [])
    .map(normalizarOperadorExcel)
    .filter(Boolean);

  // Fonte única das credenciais: ACESSOS_ANS.
  nova = mesclarAcessosNaEscala(nova);

  const semAcesso = nova.filter(u => !u.usuario || !u.senha);
  localStorage.setItem("usuarios_ativos", JSON.stringify(nova));
  // Carimba a escala importada com a versão atual da base publicada, para
  // que ela sobreviva a um F5 mas seja descartada automaticamente assim que
  // uma nova escala/credencial for publicada no GitHub.
  if(typeof assinaturaBase === "function"){
    localStorage.setItem("usuarios_ativos_versao", assinaturaBase());
  }
  localStorage.setItem("ans_escala_ativa", JSON.stringify({
    versao: "4.4",
    total: nova.length,
    acessosVinculados: nova.length - semAcesso.length,
    acessosPendentes: semAcesso.map(u => u.nome),
    atualizadoEm: new Date().toLocaleString("pt-BR"),
    dados: nova
  }));

  // Atualiza a variável global usada pelo dashboard/login sem depender de reload.
  if(typeof usuarios !== "undefined"){
    usuarios = nova;
  }

  return {
    total: nova.length,
    vinculados: nova.length - semAcesso.length,
    pendentes: semAcesso
  };
}

function importarEscalaArquivo(){
  const input = document.getElementById("arquivoEscala");
  const status = document.getElementById("statusImportacao");

  if(!input || !input.files || !input.files.length){
    if(status) status.textContent = "Selecione um arquivo Excel antes de importar.";
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e){
    try{
      const wb = XLSX.read(e.target.result, {type:"array"});
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(ws, {defval:"", raw:true});
      const resultado = aplicarNovaEscala(rows);

      if(status){
        if(resultado.pendentes.length){
          status.innerHTML =
            "⚠️ Escala aplicada: <strong>" + resultado.total + "</strong> colaboradores. " +
            "Acessos vinculados: <strong>" + resultado.vinculados + "</strong>. " +
            "Sem credencial: <strong>" + resultado.pendentes.length + "</strong>.";
        }else{
          status.innerHTML =
            "✅ Escala aplicada: <strong>" + resultado.total + "</strong> colaboradores. " +
            "Acessos vinculados: <strong>" + resultado.vinculados + "</strong>. " +
            "Horários convertidos e logins preservados.";
        }
      }

      // Refaz o painel administrativo com a nova base.
      if(typeof initAdmin === "function"){
        const adminArea = document.getElementById("adminArea");
        if(adminArea && !adminArea.classList.contains("hidden")){
          initAdmin();
        }
      }
    }catch(err){
      if(status) status.textContent = "Erro ao importar a escala: " + err.message;
      console.error(err);
    }
  };
  reader.readAsArrayBuffer(input.files[0]);
}
