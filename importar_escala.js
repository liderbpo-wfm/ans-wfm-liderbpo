/* ANS WFM 10.2 - Importação de escala Excel */
function importarEscalaArquivo(){
 const input=document.getElementById('arquivoEscala');
 const status=document.getElementById('statusImportacao');
 if(!input || !input.files.length){
   status.textContent='Selecione um arquivo Excel antes de importar.';
   return;
 }
 const file=input.files[0];
 const reader=new FileReader();
 reader.onload=function(e){
   try{
    const wb=XLSX.read(e.target.result,{type:'binary'});
    const ws=wb.Sheets[wb.SheetNames[0]];
    const rowsBrutas=XLSX.utils.sheet_to_json(ws,{defval:''});
    // Considera somente linhas que possuem colaborador preenchido
    const rows=rowsBrutas.filter(r => {
      const nome = r['COLABORADOR'];
      return nome && String(nome).trim().length > 0;
    });
    const required=['COLABORADOR','ENTRADA','SAÍDA','SUPERVISOR(A)'];
    const headers=Object.keys(rows[0]||{});
    const missing=required.filter(x=>!headers.includes(x));
    if(missing.length){
      status.textContent='Colunas ausentes: '+missing.join(', ');
      return;
    }
    localStorage.setItem('escala_importada_10_2',JSON.stringify({
      data:new Date().toLocaleString(),
      total:rows.length,
      total_linhas_ignoradas: rowsBrutas.length - rows.length,
      registros:rows
    }));
    status.textContent='✅ Escala importada: '+rows.length+' colaboradores encontrados.';
    if(rowsBrutas.length !== rows.length){
      status.textContent += ' Linhas vazias ignoradas: '+(rowsBrutas.length-rows.length)+'.';
    }
   }catch(err){
    status.textContent='Erro ao ler arquivo: '+err.message;
   }
 };
 reader.readAsBinaryString(file);
}