function simular(tipo) {
  const alerta = document.getElementById('mensagem-alerta');
  const icone = document.getElementById('icone-alerta');
  const texto = document.getElementById('texto-alerta');
  const nome = document.getElementById('nome-escola');
  const endereco = document.getElementById('endereco');
  const mapa = document.getElementById('mapa-imagem');

  switch (tipo) {
    case 'enchente':
      icone.src = '../img/icones/chuva-icon.png';
      texto.textContent = 'Atenção: enchente detectada nas proximidades! Evite áreas alagadas e dirija-se ao ponto de apoio mais próximo, se necessário.';
      alerta.style.backgroundColor = '#fdecea';
      alerta.style.color = '#b71c1c';
      nome.textContent = 'Escola Municipal São Pedro';
      endereco.innerHTML = 'Rua das Palmeiras, 123<br>(11) 91234-5678';
      mapa.src = 'assets/img/mapa_enchente.png';
      mapa.classList.remove('oculto');
      break;

    case 'alagamento':
      icone.src = '../img/icones/chuva-icon.png';
      texto.textContent = 'Alagamento identificado na sua região! Evite transitar por vias inundadas e procure abrigo seguro em um ponto de apoio, se precisar.';
      alerta.style.backgroundColor = '#e3f2fd';
      alerta.style.color = '#0d47a1';
      nome.textContent = 'Ginásio Poliesportivo Esperança';
      endereco.innerHTML = 'Av. das Nuvens, 321<br>(11) 92345-6789';
      mapa.src = 'assets/img/mapa_alagamento.png';
      mapa.classList.remove('oculto');
      break;

    case 'calor':
      icone.src = '../img/icones/fever.png';
      texto.textContent = 'Alerta de calor extremo: hidrate-se com frequência e evite exposição ao sol. Se estiver passando mal, procure imediatamente o ponto de apoio mais próximo.';
      alerta.style.backgroundColor = '#ffebee';
      alerta.style.color = '#c62828';
      nome.textContent = 'Posto de Saúde Primavera';
      endereco.innerHTML = 'Rua Flor do Campo, 789<br>(11) 98765-4321';
      mapa.src = 'assets/img/mapa_calor.png';
      mapa.classList.remove('oculto');
      abrirModal(); // <-- chama o modal
      break;



    case 'vento':
      icone.src = '../img/icones/ventos-icon.png';
      texto.textContent = 'Alerta de ventos fortes: evite áreas abertas e fique longe de árvores e estruturas instáveis.';
      alerta.style.backgroundColor = '#ede7f6';
      alerta.style.color = '#4a148c';
      nome.textContent = 'Escola Técnica Ventos do Sul';
      endereco.innerHTML = 'Av. Liberdade, 999<br>(11) 93456-7890';
      mapa.src = 'assets/img/mapa_vento.png';
      mapa.classList.remove('oculto');
      break;

    default:
      icone.src = '../img/icones/clear-sky.png';
      texto.textContent = 'Nenhum alerta no momento.';
      alerta.style.backgroundColor = '#c8e6c9';
      alerta.style.color = '#2e7d32';
      nome.textContent = 'Nenhum ponto selecionado';
      endereco.innerHTML = '---';
      mapa.src = 'assets/img/sem_alerta.png';
      mapa.classList.add('oculto');
      break;
  }

  alerta.classList.add('ativo');
}
window.addEventListener('DOMContentLoaded', () => {
  simular(); // sem parâmetro, cai no "default"
});

function abrirModal() {
  document.getElementById('modal-agua').classList.remove('oculto');
}

function fecharModal() {
  document.getElementById('modal-agua').classList.add('oculto');
  document.getElementById('input-peso').value = '';
  document.getElementById('resultado-agua').textContent = '';
}

function calcularAgua() {
  const peso = parseFloat(document.getElementById('input-peso').value);
  const resultado = document.getElementById('resultado-agua');

  if (!isNaN(peso) && peso > 0) {
    const agua = peso * 35;
    resultado.textContent = `Você deve beber aproximadamente ${(agua / 1000).toFixed(2)} litros de água por dia.`;
  } else {
    resultado.textContent = 'Por favor, insira um peso válido.';
  }
}

// Fecha modal clicando fora do conteúdo
window.addEventListener('click', function (e) {
  const modal = document.getElementById('modal-agua');
  if (e.target === modal) fecharModal();
});
