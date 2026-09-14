
// ANS WFM 10.3.4
// Mantém autenticação e atualiza somente escala

function atualizarEscalaMantendoLogin(novaEscala, usuariosAtuais){

 return novaEscala.map(novo=>{
   let antigo = usuariosAtuais.find(u =>
     (u.nome || u.COLABORADOR) === novo.COLABORADOR
   );

   return {
     ...(antigo || {}),
     ...novo,
     usuario: antigo?.usuario || novo.usuario,
     senha: antigo?.senha || novo.senha
   };
 });

}
