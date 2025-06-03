const usuarios = [
  { id: 1, nome: 'Ana Sophia Araújo', lat: -23.5575, lon: -46.6603 },
  { id: 2, nome: 'Samuel Plaça', lat: -23.5505, lon: -46.6333 },
  { id: 3, nome: 'Enzo Castro', lat: -25.9653, lon: 32.5892 },
  { id: 4, nome: 'Aiko Ribeiro', lat: 48.8566, lon: 2.3522 },
  { id: 5, nome: 'Pierre Santos', lat: -12.0464, lon: -77.0428 }
];

const pontos_apoio = [
  { id: 1, nome: 'Centro Comunitário Paulista', lat: -23.5505, lon: -46.6333 },
  { id: 2, nome: 'Igreja de São Paulo', lat: -23.5605, lon: -46.6533 },
  { id: 3, nome: 'Escola Primária Maputo', lat: -25.9753, lon: 32.5992 },
  { id: 4, nome: 'Centro Cultural Paris 14', lat: 48.9566, lon: 2.4522 },
  { id: 5, nome: 'Estádio Nacional de Lima', lat: -12.0564, lon: -77.0528 }
];

// Retorna distância em km entre dois pontos
function calcularDistancia(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function encontrarPontoMaisProximo(idUsuario) {
  const usuario = usuarios.find(u => u.id === idUsuario);
  if (!usuario) return null;

  let pontoMaisProximo = null;
  let menorDistancia = Infinity;

  pontos_apoio.forEach(ponto => {
    const distancia = calcularDistancia(usuario.lat, usuario.lon, ponto.lat, ponto.lon);
    if (distancia < menorDistancia) {
      menorDistancia = distancia;
      pontoMaisProximo = { ...ponto, distancia: distancia.toFixed(2) };
    }
  });

  return pontoMaisProximo;
}

// Exemplo de uso: encontrar ponto mais próximo do usuário com id 1
window.addEventListener('DOMContentLoaded', () => {
  const ponto = encontrarPontoMaisProximo(1);
  if (ponto) {
    const rota = document.getElementById('rota');
    rota.innerHTML = `
      <h3>📍 Rota sugerida</h3>
      <p><strong>Destino:</strong> ${ponto.nome}</p>
      <p><strong>Distância aproximada:</strong> ${ponto.distancia} km</p>
    `;
  }
});
