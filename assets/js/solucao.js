function simular(tipo) {
  const alerta = document.getElementById('mensagem-alerta');
  const nome = document.getElementById('nome-escola');
  const endereco = document.getElementById('endereco');
  const mapa = document.getElementById('mapa-imagem');

  if (tipo === 'enchente') {
    alerta.textContent = '🚨 Enchente detectada próxima à sua localização!';
    alerta.style.backgroundColor = '#fdecea';
    alerta.style.color = '#b71c1c';
    nome.textContent = 'Escola Municipal São Pedro';
    endereco.innerHTML = 'Rua das Palmeiras, 123<br>(11) 91234-5678';
    mapa.src = 'assets/img/mapa_enchente.png';
  } else if (tipo === 'chuva') {
    alerta.textContent = '⚠️ Chuvas intensas registradas na sua área!';
    alerta.style.backgroundColor = '#fff3cd';
    alerta.style.color = '#856404';
    nome.textContent = 'Centro Comunitário Vida';
    endereco.innerHTML = 'Av. Central, 456<br>(11) 99876-5432';
    mapa.src = 'assets/img/mapa_chuva.png';
  } else if (tipo === 'calor') {
    alerta.textContent = '🌡️ Calor extremo! Risco de insolação.';
    alerta.style.backgroundColor = '#ffebee';
    alerta.style.color = '#c62828';
    nome.textContent = 'Posto de Saúde Primavera';
    endereco.innerHTML = 'Rua Flor do Campo, 789<br>(11) 98765-4321';
    mapa.src = 'assets/img/mapa_calor.png';
  }

  alerta.textContent = '🚨 Enchente detectada próxima à sua localização!';
alerta.classList.add('ativo');

}
