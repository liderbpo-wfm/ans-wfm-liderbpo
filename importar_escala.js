/* ANS WFM 10.3.3 - Importação integrada */
function normalizarOperador(r){
 const nome=String(r['COLABORADOR']||'').trim();
 if(!nome) return null;
 return {
  nome:nome,
  usuario: nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9 ]/g,'').trim().split(/\s+/).slice(0,2).join('.'),
  senha:'ANS#2026',
  status:'ATIVO',
  cargo:r['CARGO']||'',
  supervisor:r['SUPERVISOR(A)']||'',
  entrada:converterHorarioExcel(r['ENTRADA']),
  pausa1:converterHorarioExcel(r['PAUSA 1']),
  almoco:converterHorarioExcel(r['ALMOÇO']),
  pausa2:converterHorarioExcel(r['PAUSA 2']),
  saida:converterHorarioExcel(r['SAÍDA'])
 };
}

function aplicarNovaEscala(registros){
 let antiga=JSON.parse(localStorage.getItem('usuarios_ativos')||'[]');
 if(!antiga.length && typeof usuarios!=='undefined') antiga=usuarios;
 let nova=registros.map(normalizarOperador).filter(Boolean);
 nova=mesclarLoginEscala(nova,antiga);
 localStorage.setItem('usuarios_ativos',JSON.stringify(nova));
 localStorage.setItem('ans_escala_ativa',JSON.stringify({
   total:nova.length,
   atualizadoEm:new Date().toLocaleString(),
   dados:nova
 }));
 return nova.length;
}

function importarEscalaArquivo(){
 const input=document.getElementById('arquivoEscala');
 const status=document.getElementById('statusImportacao');
 if(!input || !input.files.length){status.textContent='Selecione um arquivo Excel antes de importar.';return;}
 const reader=new FileReader();
 reader.onload=function(e){
  try{
   const wb=XLSX.read(e.target.result,{type:'binary'});
   const ws=wb.Sheets[wb.SheetNames[0]];
   const rows=XLSX.utils.sheet_to_json(ws,{defval:''})
    .filter(r=>String(r['COLABORADOR']||'').trim().length>2 && String(r['COLABORADOR']).toUpperCase()!=='COLABORADOR');
   const total=aplicarNovaEscala(rows);
   status.innerHTML='✅ Escala aplicada: '+total+' colaboradores. Login preservado e horários convertidos.';
  }catch(err){status.textContent='Erro: '+err.message;}
 };
 reader.readAsBinaryString(input.files[0]);
}