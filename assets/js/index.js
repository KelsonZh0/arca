document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const secoes = document.querySelectorAll(".detalhe-desastre");

  cards.forEach((card) => {
    card.addEventListener("click", (event) => {
      event.stopPropagation();
      const idAlvo = card.getAttribute("data-alvo");

      secoes.forEach((sec) => {
        sec.classList.remove("visivel");
        sec.classList.add("oculto");
      });

      const alvo = document.getElementById(idAlvo);
      if (alvo) {
        alvo.classList.remove("oculto");
        alvo.classList.add("visivel");

        // ⏱️ Espera para garantir que a classe 'visivel' foi aplicada
        setTimeout(() => {
          const conteudo = alvo.querySelector(".card-conteudo");
          if (conteudo) {
            conteudo.scrollTo({ top: 0, behavior: "smooth" });
          }
        }, 50);
      }
    });
  });

  // Fechar com botão
  const botoesFechar = document.querySelectorAll(".btn-fechar");
  botoesFechar.forEach((botao) => {
    botao.addEventListener("click", (event) => {
      event.stopPropagation();
      const secao = botao.closest(".detalhe-desastre");
      secao.classList.remove("visivel");
      secao.classList.add("oculto");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // Fechar clicando fora da área
  document.addEventListener("click", (event) => {
    secoes.forEach((secao) => {
      if (secao.classList.contains("visivel")) {
        const conteudo = secao.querySelector(".card-conteudo");
        if (!conteudo.contains(event.target)) {
          secao.classList.remove("visivel");
          secao.classList.add("oculto");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    });
  });
});
