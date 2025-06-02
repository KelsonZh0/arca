function mostrarFormulario(tipo) {
  const loginForm = document.getElementById("form-login");
  const cadastroForm = document.getElementById("form-cadastro");
  const btnLogin = document.getElementById("btn-login");
  const btnCadastro = document.getElementById("btn-cadastro");

  if (tipo === "login") {
    loginForm.classList.remove("hidden");
    cadastroForm.classList.add("hidden");

    btnLogin.classList.add("active");
    btnCadastro.classList.remove("active");
  } else {
    cadastroForm.classList.remove("hidden");
    loginForm.classList.add("hidden");

    btnCadastro.classList.add("active");
    btnLogin.classList.remove("active");
  }
}


// Cadastro de novo usuário
function cadastrarUsuario(event) {
  event.preventDefault();

  const nome = document.getElementById("cad-nome").value.trim();
  const email = document.getElementById("cad-email").value.trim();
  const nascimento = document.getElementById("cad-nascimento").value;
  const usuario = document.getElementById("cad-usuario").value.trim();
  const senha = document.getElementById("cad-senha").value;

  if (!nome || !email || !nascimento || !usuario || !senha) {
    alert("Preencha todos os campos.");
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    alert("E-mail inválido.");
    return;
  }

  if (localStorage.getItem(usuario)) {
    alert("Usuário já cadastrado.");
    return;
  }

  const novoUsuario = { nome, email, nascimento, usuario, senha };
  localStorage.setItem(usuario, JSON.stringify(novoUsuario));

  alert("Cadastro realizado com sucesso!");
  mostrarFormulario("login");
}

// Login do usuário
function loginUsuario(event) {
  event.preventDefault();

  const usuario = document.getElementById("login-usuario").value.trim();
  const senha = document.getElementById("login-senha").value;

  const dados = localStorage.getItem(usuario);

  if (!dados) {
    alert("Usuário não encontrado.");
    return;
  }

  const usuarioDados = JSON.parse(dados);

  if (usuarioDados.senha !== senha) {
    alert("Senha incorreta.");
    return;
  }

  localStorage.setItem("usuarioLogado", JSON.stringify(usuarioDados));
  document.getElementById("nome-usuario").textContent = usuarioDados.nome;
  document.getElementById("tela-autenticacao").style.display = "none";
}

// Acesso anônimo
function loginComoAnonimo() {
  const anonimo = { nome: "Visitante" };
  localStorage.setItem("usuarioLogado", JSON.stringify(anonimo));
  document.getElementById("nome-usuario").textContent = anonimo.nome;
  document.getElementById("tela-autenticacao").style.display = "none";
}

// Logout
function logoutUsuario() {
  localStorage.removeItem("usuarioLogado");
  location.reload();
}

// Adiciona os eventos após carregar o DOM
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("form-login").addEventListener("submit", loginUsuario);
  document.getElementById("form-cadastro").addEventListener("submit", cadastrarUsuario);
  document.getElementById("btn-login").addEventListener("click", () => mostrarFormulario("login"));
  document.getElementById("btn-cadastro").addEventListener("click", () => mostrarFormulario("cadastro"));
  document.getElementById("btn-anonimo").addEventListener("click", loginComoAnonimo);
  document.getElementById("btn-logout").addEventListener("click", logoutUsuario);

  const usuarioSalvo = localStorage.getItem("usuarioLogado");
  if (usuarioSalvo) {
    const dados = JSON.parse(usuarioSalvo);
    document.getElementById("nome-usuario").textContent = dados.nome;
    document.getElementById("tela-autenticacao").style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const cpfInput = document.getElementById("cad-cpf");
  const emailInput = document.getElementById("cad-email");
  const senhaInput = document.getElementById("cad-senha");
  const senhaConfInput = document.getElementById("cad-senhaconf");

  // Máscara de CPF
  cpfInput.addEventListener("input", () => {
    let value = cpfInput.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    cpfInput.value = value;
    validarCPF(value);
  });

  // Validação de CPF
  function validarCPF(cpf) {
    const erroCpf = document.getElementById("erro-cpf");
    const cleanCpf = cpf.replace(/\D/g, "");
    let valido = false;

    if (cleanCpf.length === 11 && !/^(\d)\1+$/.test(cleanCpf)) {
      let soma = 0;
      for (let i = 0; i < 9; i++) soma += parseInt(cleanCpf.charAt(i)) * (10 - i);
      let resto = (soma * 10) % 11;
      resto = resto === 10 ? 0 : resto;
      if (resto === parseInt(cleanCpf.charAt(9))) {
        soma = 0;
        for (let i = 0; i < 10; i++) soma += parseInt(cleanCpf.charAt(i)) * (11 - i);
        resto = (soma * 10) % 11;
        resto = resto === 10 ? 0 : resto;
        valido = resto === parseInt(cleanCpf.charAt(10));
      }
    }

    if (valido) {
      cpfInput.classList.add("valid");
      erroCpf.textContent = "";
    } else {
      cpfInput.classList.remove("valid");
      erroCpf.textContent = "CPF inválido.";
    }
  }

  // Validação de E-mail
  emailInput.addEventListener("input", () => {
    const erroEmail = document.getElementById("erro-email");
    const valido = emailInput.value.includes("@") && emailInput.value.includes(".");
    if (valido) {
      emailInput.classList.add("valid");
      erroEmail.textContent = "";
    } else {
      emailInput.classList.remove("valid");
      erroEmail.textContent = "E-mail inválido.";
    }
  });

  // Validação de senha e confirmação
function validarSenha() {
  const erroSenha = document.getElementById("erro-senha");
  const senha = senhaInput.value;
  const confirmar = senhaConfInput.value;

  const padrao = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  if (!padrao.test(senha)) {
    erroSenha.textContent = "A senha deve ter no mínimo 8 caracteres, incluindo maiúsculas, minúsculas, número e símbolo.";
    senhaInput.classList.remove("valid");
    senhaConfInput.classList.remove("valid");
    return;
  }

  if (senha && confirmar && senha === confirmar) {
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
