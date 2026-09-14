function converterHorarioExcel(valor){
 if(valor===null||valor===undefined||valor==="") return "";
 if(typeof valor==="number"){
  let minutos=Math.round(valor*24*60);
  return String(Math.floor(minutos/60)).padStart(2,"0")+":"+String(minutos%60).padStart(2,"0");
 }
 return String(valor).trim();
}