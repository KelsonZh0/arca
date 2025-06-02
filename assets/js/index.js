document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const secoes = document.querySelectorAll(".detalhe-desastre");

  // Mostra a seção ao clicar no card
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const idAlvo = card.getAttribute("data-alvo");

      // Oculta todas as seções primeiro
      secoes.forEach(sec => sec.classList.remove("visivel"));

      // Mostra apenas a seção correspondente
      const alvo = document.getElementById(idAlvo);
      if (alvo) {
        alvo.classList.add("visivel");
      }
    });
  });

  // Botão "Fechar" para esconder a seção de detalhes
  const botoesFechar = document.querySelectorAll(".btn-fechar");

  botoesFechar.forEach(botao => {
    botao.addEventListener("click", () => {
      const secao = botao.closest(".detalhe-desastre");
      secao.classList.remove("visivel");
    });
  });
});
