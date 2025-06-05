const usuarios = [
  {
    nome: "Samuel Plaça",
    desastre: "alagamento",
    lat: -23.5505,
    lon: -46.6333,
  },
  {
    nome: "Ana Sophia Araújo",
    desastre: "vento",
    lat: -23.5575,
    lon: -46.6603,
  },
  { nome: "Enzo Castro", desastre: "enchente", lat: -25.9653, lon: 32.5892 },
  { nome: "Aiko Ribeiro", desastre: "calor", lat: 48.8566, lon: 2.3522 },
];

const pontosApoio = [
  { nome: "Centro Comunitário Paulista", lat: -23.5689, lon: -46.6426 },
  { nome: "Igreja de São Paulo", lat: -23.5605, lon: -46.6533 },
  { nome: "Escola Primária Maputo", lat: -25.9753, lon: 32.5992 },
  { nome: "Centro Cultural Paris 14", lat: 48.9566, lon: 2.4522 },
];

function calcularDistancia(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function encontrarPontoMaisProximo(usuario, pontos) {
  let menor = Infinity;
  let pontoProximo = null;
  pontos.forEach((p) => {
    const dist = calcularDistancia(usuario.lat, usuario.lon, p.lat, p.lon);
    if (dist < menor) {
      menor = dist;
      pontoProximo = p;
    }
  });
  return pontoProximo;
}

function simular(tipo = "nenhum") {
  const alerta = document.getElementById("mensagem-alerta");
  const icone = document.getElementById("icone-alerta");
  const texto = document.getElementById("texto-alerta");
  const nome = document.getElementById("nome-escola");
  const endereco = document.getElementById("endereco");
  const mapa = document.getElementById("mapa-imagem");

  const configuracoes = {
    enchente: {
      icone: "../img/icones/chuva-icon.png",
      cor: "#b71c1c",
      bg: "#fdecea",
      mensagem:
        "Atenção: enchente detectada nas proximidades! Evite áreas alagadas e dirija-se ao ponto de apoio mais próximo, se necessário.",
    },
    alagamento: {
      icone: "../img/icones/chuva-icon.png",
      cor: "#0d47a1",
      bg: "#e3f2fd",
      mensagem:
        "Alagamento identificado na sua região! Evite transitar por vias inundadas e procure abrigo seguro em um ponto de apoio, se precisar.",
    },
    calor: {
      icone: "../img/icones/fever.png",
      cor: "#c62828",
      bg: "#ffebee",
      mensagem:
        "Alerta de calor extremo: hidrate-se com frequência e evite exposição ao sol. Se estiver passando mal, procure imediatamente o ponto de apoio mais próximo.",
    },
    vento: {
      icone: "../img/icones/ventos-icon.png",
      cor: "#4a148c",
      bg: "#ede7f6",
      mensagem:
        "Alerta de ventos fortes: evite áreas abertas e fique longe de árvores e estruturas instáveis.",
    },
    nenhum: {
      icone: "../img/icones/clear-sky.png",
      cor: "#2e7d32",
      bg: "#c8e6c9",
      mensagem: "Nenhum alerta no momento.",
    },
  };

  const conf = configuracoes[tipo];

  if (tipo === "nenhum" || !conf) {
    icone.src = configuracoes.nenhum.icone;
    texto.textContent = configuracoes.nenhum.mensagem;
    alerta.style.backgroundColor = configuracoes.nenhum.bg;
    alerta.style.color = configuracoes.nenhum.cor;
    nome.textContent = "Nenhum ponto selecionado";
    endereco.innerHTML = "---";
    mapa.src = "assets/img/sem_alerta.png";
    mapa.classList.add("oculto");
    alerta.classList.add("ativo");
    return;
  }

  const usuario = usuarios.find((u) => u.desastre === tipo);
  const apoio = encontrarPontoMaisProximo(usuario, pontosApoio);

  if (!usuario || !apoio) {
    texto.textContent = "Dados não encontrados.";
    return;
  }

  icone.src = conf.icone;
  texto.textContent = conf.mensagem;
  alerta.style.backgroundColor = conf.bg;
  alerta.style.color = conf.cor;
  nome.textContent = apoio.nome;
  const distancia = calcularDistancia(
    usuario.lat,
    usuario.lon,
    apoio.lat,
    apoio.lon
  ).toFixed(2);
  endereco.innerHTML = `O ponto de apoio mais próximo é <strong>${apoio.nome}</strong>, a aproximadamente <strong>${distancia} km</strong> de distância da sua localização.`;

  mapa.src = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyByteZ_u1h_qeQTE-bgaNT1K0my9LxS86g&origin=${usuario.lat},${usuario.lon}&destination=${apoio.lat},${apoio.lon}&zoom=13`;

  mapa.classList.remove("oculto");

  if (tipo === "calor") abrirModal();

  alerta.classList.add("ativo");
}

window.addEventListener("DOMContentLoaded", () => {
  simular(); // sem parâmetro, mostra "Nenhum alerta"
});

function abrirModal() {
  document.getElementById("modal-agua").classList.remove("oculto");
}

function fecharModal() {
  document.getElementById("modal-agua").classList.add("oculto");
  document.getElementById("input-peso").value = "";
  document.getElementById("resultado-agua").textContent = "";
}

function calcularAgua() {
  const peso = parseFloat(document.getElementById("input-peso").value);
  const resultado = document.getElementById("resultado-agua");

  if (!isNaN(peso) && peso > 0) {
    const agua = peso * 35;
    resultado.textContent = `Você deve beber aproximadamente ${(
      agua / 1000
    ).toFixed(2)} litros de água por dia.`;
  } else {
    resultado.textContent = "Por favor, insira um peso válido.";
  }
}

window.addEventListener("click", function (e) {
  const modal = document.getElementById("modal-agua");
  if (e.target === modal) fecharModal();
});
