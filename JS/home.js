function buscadorfuncion(sza){
    if(sza.length >= 3){
        const filtrados = [];
        for (let i = 0; i < digimones.length; i++) {
            const nombre = digimones[i].name.toLowerCase();
            if (nombre.includes(sza.toLowerCase())) {
                filtrados.push(digimones[i]);
            }
        }
        let listaHTML = generarLista(filtrados)
        document.getElementById("la-lista").innerHTML = listaHTML;
    }else{
        let listaHTML = generarLista(digimones)
        document.getElementById("la-lista").innerHTML = listaHTML;
    }
}

function generarLista(arrayDigimones) {
    let listaHTML = "";
    for (let i = 0; i < arrayDigimones.length; i++) {
        // Para Digimon la data tiene { name, img, level }
        const nombre = arrayDigimones[i].name;
        const imagen = arrayDigimones[i].img || 'https://via.placeholder.com/120x120?text=No+Image';
        const nivel = arrayDigimones[i].level || '';
        // Usamos el índice como id sintético para llamadas a Detalle
        const id = i + 1;
        const safeId = nombre.replace(/\s+/g, "_");

        // Chequear si ya es favorito
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
        const isFav = favoritos.some(f => f.name === nombre);
        const heart = isFav ? '❤️' : '🤍';
        const activeClass = isFav ? 'fav-active' : '';

        listaHTML += `
        <div class="c-lista-pokemon digimon-${id}" id="digi-${safeId}">
            <div class="digi-badge ${nivel ? nivel.replace(/\s+/g,'-') : 'Unknown'}">${nivel || 'Unknown'}</div>
            <img src="${imagen}" width="auto" height="60" loading="lazy" alt="${nombre}" onclick="Detalle('${encodeURIComponent(nombre)}')" onerror="this.src='https://via.placeholder.com/120x120?text=No+Image'">
            <p onclick="Detalle('${encodeURIComponent(nombre)}')">${nombre}</p>
            <button class="fav-btn ${activeClass}" onclick="toggleFavorito('${encodeURIComponent(nombre)}','${encodeURIComponent(imagen)}','${encodeURIComponent(nivel)}')">
                <span id="corazon-${safeId}">${heart}</span>
            </button>
        </div>`;
    }

    return listaHTML;
}

function Home(filtro){
    var root = document.getElementById("root");
    
    // Limpiar el contenido anterior
    root.innerHTML = "";

    //buscador
    const buscador = document.createElement("input");
    buscador.classList.add("c-buscador");
    buscador.type = "text";
    buscador.placeholder = "Buscar Digimon...";
    buscador.addEventListener("input", () => {
        buscadorfuncion(buscador.value);
    });

    //contenedor filtro
    const tipos = [
        // Para Digimon los "tipos" son niveles
        "Fresh", "In Training", "Rookie", "Champion", "Ultimate", "Mega", "Armor"
    ];

    const contenedorFiltro = document.createElement("div");
    contenedorFiltro.classList.add("tipos-container"); 

    for (let i = 0; i < tipos.length; i++) {
        const btn = document.createElement("button");
        btn.textContent = tipos[i];
        // Agregar el evento click para filtrar por tipo
        btn.addEventListener("click", () => {
            FiltroConexion(encodeURIComponent(tipos[i])); 
        });
        // Agregar el botón al contenedor
        contenedorFiltro.appendChild(btn);
    }

    // Agrupar buscador y filtros en un wrapper centrado
    const searchFilterWrap = document.createElement('div');
    searchFilterWrap.classList.add('search-filter-wrap');
    searchFilterWrap.appendChild(buscador);
    searchFilterWrap.appendChild(contenedorFiltro);

    //add contenedor lista
    const listaHTML = generarLista(digimones);
    var contenedorLista = document.createElement("div");
    contenedorLista.classList.add("c-contenedor-lista"); 
    contenedorLista.id = "la-lista"; 
    contenedorLista.innerHTML = listaHTML;

    //agregar contenedores
    root.appendChild(searchFilterWrap);
    root.appendChild(contenedorLista);
}