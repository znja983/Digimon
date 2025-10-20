function Favoritos(){
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    if(favoritos.length == 0){
        document.getElementById("root").innerHTML = `
            <div class="no-fav-box">
                <p>No tienes favoritos aún</p>
                <p>Agrega Digimon a favoritos desde el inicio para verlos aquí.</p>
                <button onclick="Home()">Ir al inicio</button>
            </div>
        `;
        return;
    }else{
        // Asegurarse de que los objetos favoritos tengan {name,img,level}
        const favoritosNormalizados = favoritos.map(f => ({
            name: f.name,
            img: f.img || '',
            level: f.level || ''
        }));
        // Construir HTML con opción para eliminar favorito
        let html = '<div class="favoritos-list">';
        for (let i = 0; i < favoritosNormalizados.length; i++) {
            const f = favoritosNormalizados[i];
            const safeId = f.name.replace(/\s+/g, "_");
            const img = f.img || 'https://via.placeholder.com/60x60?text=No';
            const lvl = f.level || 'Unknown';
            html += `<div class="fav-item">
                <div class="fav-thumb">
                    <img src="${img}" alt="${f.name}" width="60" height="60" onerror="this.src='https://via.placeholder.com/60x60?text=No'">
                    <span class="digi-badge ${lvl.replace(/\s+/g,'-')}">${lvl}</span>
                </div>
                <div class="fav-info">
                    <p>${f.name}</p>
                </div>
                <div class="fav-actions">
                    <button onclick="Detalle('${encodeURIComponent(f.name)}')">Ver</button>
                    <button onclick="removeFavorito('${encodeURIComponent(f.name)}')">Eliminar</button>
                </div>
            </div>`;
        }
        html += '</div>';
        document.getElementById("root").innerHTML = html;
    }
    
}

// Remueve un favorito por nombre (encoded)
function removeFavorito(nameEnc) {
    const name = decodeURIComponent(nameEnc);
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    favoritos = favoritos.filter(f => f.name !== name);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    // Volver a renderizar la lista
    Favoritos();
}