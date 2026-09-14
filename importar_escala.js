/* ANS WFM 10.3.1 - Importação e aplicação real da escala */
function normalizarOperador(r){
 const nome=String(r['COLABORADOR']||'').trim();
 if(!nome) return null;
 const usuario=(nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9 ]/g,'').trim().split(/\s+/).slice(0,2).join('.'));
 return {
  usuario: usuario || ('operador.'+Date.now()),
  senha:'ANS#2026',
  nome:nome,
  status:'ATIVO',
  cargo:r['CARGO']||'',
  supervisor:r['SUPERVISOR(A)']||'',
  entrada:r['ENTRADA']||'',
  pausa1:r['PAUSA 1']||'',
  almoco:r['ALMOÇO']||'',
  pausa2:r['PAUSA 2']||'',
  saida:r['SAÍDA']||''
 };
}
function aplicarNovaEscala(registros){
 const nova=registros.map(normalizarOperador).filter(Boolean);
 localStorage.setItem('usuarios_ativos',JSON.stringify(nova));
 localStorage.setItem('escala_atualizada_em',new Date().toLocaleString());
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
   const brutas=XLSX.utils.sheet_to_json(ws,{defval:''});
   const rows=brutas.filter(r=>String(r['COLABORADOR']||'').trim().length>2 && String(r['COLABORADOR']).toUpperCase()!=='COLABORADOR');
   const total=aplicarNovaEscala(rows);
   status.innerHTML='✅ Escala aplicada: '+total+' colaboradores. Atualize a página para carregar a nova base.';
  }catch(err){status.textContent='Erro: '+err.message;}
 };
 reader.readAsBinaryString(input.files[0]);
}
