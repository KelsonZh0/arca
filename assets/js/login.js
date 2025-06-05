function exibirMensagem(texto, tipo = "sucesso", duracao = 3000) {
  const msg = document.getElementById("mensagem-feedback");
  msg.textContent = texto;
  msg.className = `mensagem ${tipo}`;
  msg.classList.remove("oculto");

  setTimeout(() => {
    msg.style.opacity = "1";
    msg.style.transform = "translate(-50%, 0)";
  }, 10);

  setTimeout(() => {
    msg.style.opacity = "0";
    msg.style.transform = "translate(-50%, -20px)";
    setTimeout(() => {
      msg.classList.add("oculto");
    }, 300);
  }, duracao);
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("form-login");
  const cadastroForm = document.getElementById("form-cadastro");
  const btnLogin = document.getElementById("btn-login");
  const btnCadastro = document.getElementById("btn-cadastro");
  const btnAnonimo = document.getElementById("btn-anonimo");
  const btnLogout = document.getElementById("btn-logout");

  const cpfInput = document.getElementById("cad-cpf");
  const emailInput = document.getElementById("cad-email");
  const senhaInput = document.getElementById("cad-senha");
  const senhaConfInput = document.getElementById("cad-senhaconf");

  function limparCampos() {
    document.getElementById("cad-nome").value = "";
    document.getElementById("cad-email").value = "";
    document.getElementById("cad-nascimento").value = "";
    document.getElementById("cad-cpf").value = "";
    document.getElementById("cad-senha").value = "";
    document.getElementById("cad-senhaconf").value = "";
    document.getElementById("login-usuario").value = "";
    document.getElementById("login-senha").value = "";
  }

  btnLogin.addEventListener("click", () => mostrarFormulario("login"));
  btnCadastro.addEventListener("click", () => mostrarFormulario("cadastro"));

  function mostrarFormulario(tipo) {
    loginForm.classList.toggle("hidden", tipo !== "login");
    cadastroForm.classList.toggle("hidden", tipo === "login");
    btnLogin.classList.toggle("active", tipo === "login");
    btnCadastro.classList.toggle("active", tipo !== "login");
  }

  cadastroForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("cad-nome").value.trim();
    const email = emailInput.value.trim();
    const nascimento = document.getElementById("cad-nascimento").value;
    const senha = senhaInput.value;

    if (!nome || !nascimento || !senha) {
      exibirMensagem(
        "Por favor, preencha todos os campos obrigatórios marcados",
        "erro"
      );
      return;
    }

    if (email && (!email.includes("@") || !email.includes("."))) {
      exibirMensagem(
        "O formato do e-mail é inválido. Use um e-mail válido ou deixe em branco.",
        "erro"
      );
      return;
    }

    if (localStorage.getItem(nome)) {
      exibirMensagem(
        "Este nome já está cadastrado. Por favor, use seu nome completo.",
        "erro"
      );
      return;
    }

    const novoUsuario = { nome, email, nascimento, senha };
    localStorage.setItem(nome, JSON.stringify(novoUsuario));
    exibirMensagem(
      "Cadastro realizado com sucesso! Você já pode fazer login.",
      "sucesso"
    );
    limparCampos();
    mostrarFormulario("login");
  });

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.getElementById("login-usuario").value.trim();
    const senha = document.getElementById("login-senha").value.trim();

    const dados = localStorage.getItem(nome);
    if (!dados) {
      exibirMensagem(
        "Nome não encontrado. Verifique o nome ou faça um novo cadastro.",
        "erro"
      );
      return;
    }

    const usuarioDados = JSON.parse(dados);
    if (usuarioDados.senha !== senha) {
      exibirMensagem(
        "Senha incorreta. Verifique suas credenciais e tente novamente.",
        "erro"
      );
      return;
    }

    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioDados));
    document.getElementById("nome-usuario").textContent = usuarioDados.nome;
    document.getElementById("tela-autenticacao").style.display = "none";
    document.body.classList.remove("login-ativo");
    exibirMensagem(`Bem-vindo ao A.R.C.A, ${usuarioDados.nome}!`, "sucesso");
    limparCampos();
  });

  btnAnonimo.addEventListener("click", () => {
    const anonimo = { nome: "Visitante" };
    localStorage.setItem("usuarioLogado", JSON.stringify(anonimo));
    document.getElementById("nome-usuario").textContent = anonimo.nome;
    document.getElementById("tela-autenticacao").style.display = "none";
    document.body.classList.remove("login-ativo");
    exibirMensagem(
      "Você entrou como visitante. Algumas funcionalidades podem estar limitadas.",
      "sucesso"
    );
  });

  btnLogout.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogado");
    document.body.classList.add("login-ativo");
    location.reload();
  });

  const usuarioSalvo = localStorage.getItem("usuarioLogado");
  if (usuarioSalvo) {
    const dados = JSON.parse(usuarioSalvo);
    document.getElementById("nome-usuario").textContent = dados.nome;
    document.getElementById("tela-autenticacao").style.display = "none";
    document.body.classList.remove("login-ativo");
  } else {
    document.getElementById("tela-autenticacao").style.display = "flex";
    document.body.classList.add("login-ativo");
  }

  cpfInput.addEventListener("input", () => {
    let value = cpfInput.value.replace(/\D/g, "").slice(0, 11);
    value = value
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    cpfInput.value = value;
    validarCPF(value);
  });

  function validarCPF(cpf) {
    const erroCpf = document.getElementById("erro-cpf");
    const clean = cpf.replace(/\D/g, "");
    let valido = false;

    if (clean.length === 11 && !/^(\d)\1+$/.test(clean)) {
      let soma = 0;
      for (let i = 0; i < 9; i++) soma += parseInt(clean[i]) * (10 - i);
      let resto = (soma * 10) % 11;
      if (resto === 10) resto = 0;
      if (resto === parseInt(clean[9])) {
        soma = 0;
        for (let i = 0; i < 10; i++) soma += parseInt(clean[i]) * (11 - i);
        resto = (soma * 10) % 11;
        if (resto === 10) resto = 0;
        valido = resto === parseInt(clean[10]);
      }
    }

    cpfInput.classList.toggle("valid", valido);
    erroCpf.textContent = valido ? "" : "CPF inválido.";
  }

  emailInput.addEventListener("input", () => {
    const erroEmail = document.getElementById("erro-email");
    const email = emailInput.value.trim();

    if (email) {
      const valido = email.includes("@") && email.includes(".");
      emailInput.classList.toggle("valid", valido);
      erroEmail.textContent = valido ? "" : "E-mail inválido.";
    } else {
      emailInput.classList.remove("valid");
      erroEmail.textContent = "";
    }
  });

  function validarSenha() {
    const erroSenha = document.getElementById("erro-senha");
    const senha = senhaInput.value;
    const confirmar = senhaConfInput.value;
    const padrao = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!padrao.test(senha)) {
      erroSenha.textContent =
        "A senha deve ter no mínimo 8 caracteres, incluindo maiúsculas, minúsculas, número e símbolo.";
      senhaInput.classList.remove("valid");
      senhaConfInput.classList.remove("valid");
      return;
    }

    if (senha === confirmar) {
      senhaInput.classList.add("valid");
      senhaConfInput.classList.add("valid");
      erroSenha.textContent = "";
    } else {
      senhaInput.classList.remove("valid");
      senhaConfInput.classList.remove("valid");
      erroSenha.textContent = "As senhas não coincidem.";
    }
  }

  senhaInput.addEventListener("input", validarSenha);
  senhaConfInput.addEventListener("input", validarSenha);
});
