function mesclarLoginEscala(nova, antiga){
 return nova.map(item=>{
  let old=antiga.find(u=> (u.nome||"").toLowerCase()===(item.nome||"").toLowerCase());
  return {...item, usuario:old?.usuario||item.usuario, senha:old?.senha||"ANS#2026"};
 });
}