var misDigis = JSON.parse(localStorage.getItem("misDigis")) || [];

function Aleatorios(){
    document.getElementById("nuevos").innerHTML = "";
    console.log("----------------------------------")
    let digisAleatorios = "";
    for (let i = 0; i < 4; i++) {
        //let num = Math.floor(Math.random() * rango) + 1;
    let idx = Math.floor(Math.random() * digimones.length);
    const dig = digimones[idx];

        const imgSrc = dig.img || 'https://via.placeholder.com/60x60?text=No+Image';
        const levelBadge = dig.level || 'Unknown';
        digisAleatorios += `
            <div class="c-lista-pokemon c-un_aleatorio">
                <div class="digi-badge ${levelBadge.replace(/\s+/g,'-')}">${levelBadge}</div>
                <img src="${imgSrc}" alt="${dig.name}" width="60" height="60" onerror="this.src='https://via.placeholder.com/60x60?text=No+Image'">
                <p>${dig.name}</p>
            </div>`;


        misDigis = JSON.parse(localStorage.getItem("misDigis")) || [];
        let existe = misDigis.includes(dig.name);

        if (!existe) {
            misDigis.push(dig.name);
            localStorage.setItem("misDigis", JSON.stringify(misDigis));
            const el = document.getElementById("c-un_digi-" + dig.name.replace(/\s+/g, "_"));
            if (el) {
                const imgSmall = dig.img || 'https://via.placeholder.com/45x45?text=No';
                el.innerHTML = `
                    <div  onclick="Detalle('${encodeURIComponent(dig.name)}')">
                        <div class="digi-badge ${dig.level ? dig.level.replace(/\s+/g,'-') : 'Unknown'}">${dig.level || 'Unknown'}</div>
                        <img src="${imgSmall}" width="auto" height="45" loading="lazy" alt="${dig.name}" onerror="this.src='https://via.placeholder.com/45x45?text=No'">
                        <p>${dig.name}</p>
                    </div>`
              el.classList.add("c-mios-pokemon");
                            // Añadir animación temporal para resaltar la captura
                            el.classList.add('capture-anim');
                            // Remover la clase al terminar la animación para permitir reuso
                            setTimeout(() => el.classList.remove('capture-anim'), 700);
            }
        }
    }

    document.getElementById("nuevos").innerHTML += digisAleatorios
    document.getElementById("contador").innerHTML = `${misDigis.length} / ${totalDigi}`;
}





function Capturados(){
    document.getElementById("root").innerHTML = ""

    //crear aleatorios
    const capturaAleatorea = document.createElement("section");
    capturaAleatorea.classList.add("c-lista");
    capturaAleatorea.id = "nuevos"
    const boton = document.createElement("button");
    boton.textContent = "4 nuevos";
    boton.addEventListener("click", () => {
        Aleatorios();
    });
    //crear album (mejor representación por tarjeta — grid uniforme)
    const seccioncapturados = document.createElement("section");
    // Reutilizamos la clase grid existente para listas
    seccioncapturados.classList.add("c-contenedor-lista");
    seccioncapturados.id = "album-capturados";

    // Construir HTML del álbum con los Digimon que están en localStorage misDigis
    let albumHTML = "";
    const capturaStorage = JSON.parse(localStorage.getItem("misDigis")) || [];
    for (let i = 0; i < digimones.length; i++) {
        const dig = digimones[i];
        const safeId = dig.name.replace(/\s+/g, "_");
        const lvl = dig.level || 'Unknown';
        const img = dig.img || 'https://via.placeholder.com/80x80?text=No';
        const isCaptured = capturaStorage.includes(dig.name);

        if (isCaptured) {
            albumHTML += `
            <div class="c-lista-pokemon album-card captured digimon-${safeId}" id="c-un_digi-${safeId}" onclick="Detalle('${encodeURIComponent(dig.name)}')">
                <div class="digi-badge ${lvl.replace(/\s+/g,'-')}">${lvl}</div>
                <img src="${img}" alt="${dig.name}" height="80" loading="lazy" onerror="this.src='https://via.placeholder.com/80x80?text=No'">
                <p>${dig.name}</p>
            </div>`;
        } else {
            albumHTML += `
            <div class="c-lista-pokemon album-card not-captured" id="c-un_digi-${safeId}">
                <div class="digi-badge Unknown">?</div>
                <img src="https://via.placeholder.com/80x80?text=?" alt="placeholder" height="80" loading="lazy">
                <p class="muted">${dig.name}</p>
            </div>`;
        }
    }

    seccioncapturados.innerHTML = albumHTML;

    //rangos y capturados
    let contador = document.createElement("p");
    const capturadosCount = capturaStorage.length || 0;
    contador.textContent = `${capturadosCount} / ${totalDigi}`;
    contador.id = "contador"

    //añadir al elemento
    document.getElementById("root").appendChild(contador)
    document.getElementById("root").appendChild(boton)
    document.getElementById("root").appendChild(capturaAleatorea)
    document.getElementById("root").appendChild(seccioncapturados)

}