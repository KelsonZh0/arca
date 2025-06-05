document.addEventListener("DOMContentLoaded", () => {
  const btnLogout = document.getElementById("btn-logout");

  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      localStorage.removeItem("usuarioLogado");
      document.body.classList.add("login-ativo");
      window.location.href = "../../index.html"; // Redireciona para a tela de login
    });
  }
});
