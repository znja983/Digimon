let digimones = []; // lista de Digimon
let totalDigi = 0; // se actualizará tras cargar

// Conexión para obtener la lista de Digimon
async function conexionLista(filtrotipo) { // debe esperar a que se ejecute

  if (filtrotipo == "All"){
    // Endpoint que devuelve todos los Digimon
    try {
      const res = await fetch('https://digimon-api.vercel.app/api/digimon');
      const data = await res.json();
  // data es un array de objetos { name, img, level }
  digimones = data;
  totalDigi = digimones.length;
  return digimones;
    } catch (err) {
      console.error('Error cargando Digimon:', err);
      // mostrar banner de error en la UI
      if (typeof showApiError === 'function') showApiError('No se pudieron cargar los Digimon. Intenta más tarde.');
      // devolver array vacío para que la UI no rompa
      digimones = [];
      totalDigi = 0;
      return [];
    }
  } else {
    // Endpoint para obtener por nivel: filtrotipo se interpreta como level
    try {
      // Asegurar que el filtro de nivel esté correctamente codificado en la URL
      const nivel = decodeURIComponent(filtrotipo);
      const res = await fetch(`https://digimon-api.vercel.app/api/digimon/level/${encodeURIComponent(nivel)}`);
      const data = await res.json();
      return data; // array de Digimon con same shape
    } catch (err) {
      console.error(`Error cargando Digimon por nivel ${filtrotipo}:`, err);
      if (typeof showApiError === 'function') showApiError('No se pudieron cargar los Digimon filtrados. Intenta más tarde.');
      return [];
    }
  }
}

// Muestra un banner simple de error en la parte superior del root
function showApiError(message) {
  try {
    const root = document.getElementById('root') || document.body;
    let banner = document.getElementById('api-error');
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'api-error';
      banner.classList.add('api-error');
      root.prepend(banner);
    }
    banner.textContent = message;
  } catch (e) {
    console.error('No se pudo mostrar el banner de error', e);
  }
}


// Cargar todos los Digimon al iniciar
async function General() {
  if (digimones.length === 0) {
    digimones = await conexionLista("All");
  }
  Home();
}
General();

async function FiltroConexion(filtroelegido){
  const digisFiltrados = await conexionLista(filtroelegido);
  document.getElementById("la-lista").innerHTML = "";
  const listaFiltro = generarLista(digisFiltrados);
  document.getElementById("la-lista").innerHTML = listaFiltro;
}