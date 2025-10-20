var esFavorito = false;

// Función para agregar o quitar un Digimon de favoritos
// Recibe valores codificados para evitar problemas con caracteres especiales
function toggleFavorito(nameEnc, imgEnc, levelEnc) {
    const name = decodeURIComponent(nameEnc);
    const img = decodeURIComponent(imgEnc);
    const level = decodeURIComponent(levelEnc);

    // Leer favoritos actuales desde localStorage
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    let existe = favoritos.some(f => f.name === name);

    if (existe) {
    favoritos = favoritos.filter(fav => fav.name !== name);
        esFavorito = false;
    } else {
        // Si no está, agregarlo (guardamos name, img y level)
        favoritos.push({
            name: name,
            img: img,
            level: level,
            addedAt: new Date().toISOString()
        });
        esFavorito = true;
    }

    // Guardar el array actualizado en localStorage
    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    // Actualizar el icono en pantalla (si existe el span)
    const safeId = name.replace(/\s+/g, "_");
    const boton = document.querySelector(`#corazon-${safeId}`);
    if (boton) boton.textContent = esFavorito ? "❤️" : "🤍";
}

async function Detalle(parametro) {
        const root = document.getElementById("root");
        root.innerHTML = "";

        // parametro vendrá como el nombre (URI encoded)
        const nombre = decodeURIComponent(parametro);
        const res = await fetch(`https://digimon-api.vercel.app/api/digimon/name/${nombre}`);
        const dataArr = await res.json();
        const data = Array.isArray(dataArr) ? dataArr[0] : dataArr;

        // Revisar si este Digimon ya está en favoritos
        favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
        esFavorito = favoritos.some(fav => fav.name === data.name);

            // HTML del detalle (Digimon tiene name, img, level)
            const safeId = data.name.replace(/\s+/g, "_");
            const imgSrc = data.img || 'https://via.placeholder.com/240x240?text=No+Image';
                const nivel = data.level || 'Unknown'; // Ensure 'nivel' is used
            const detalle = `
            <section class="c-detalle">
                <div class="digi-detail-header">
                      <h2>${data.name}</h2>
                      <span class="digi-badge ${nivel ? nivel.replace(/\s+/g,'-'): 'Unknown'}">${nivel || 'Unknown'}</span>
                </div>
                    <img src="${imgSrc || 'https://via.placeholder.com/150?text=No+Image'}" alt="${data.name}" onerror="this.src='https://via.placeholder.com/150?text=No+Image'">
                <button class="fav-btn" onClick="toggleFavorito('${encodeURIComponent(data.name)}','${encodeURIComponent(data.img)}','${encodeURIComponent(data.level)}')">
                    <span id="corazon-${safeId}">${esFavorito ? '❤️' : '🤍'}</span> Favorito
                </button>
            </section>
        `;

        root.innerHTML = detalle;
}