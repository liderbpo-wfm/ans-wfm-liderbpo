/*
 ANS WFM 10.3.6.2
 Carregamento automático da base de acessos
*/

async function carregarBaseAcessos(){
  try{
    const resposta = await fetch("acessos_ans.json");
    const dados = await resposta.json();

    localStorage.setItem(
      "acessos_ans",
      JSON.stringify(dados)
    );

    return dados;
  }catch(e){
    console.error("Erro carregando acessos:", e);
    return [];
  }
}