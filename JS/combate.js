function iniciarCombate() {
    const misDigis = JSON.parse(localStorage.getItem("misDigis")) || [];
    
    if (misDigis.length === 0) {
        alert("No tienes Digimon capturados para combatir.");
        return;
    }

    // Seleccionar un Digimon capturado aleatorio
    const digimonCapturado = misDigis[Math.floor(Math.random() * misDigis.length)];

    // Seleccionar un Digimon aleatorio de la API
    const digimonAleatorio = digimones[Math.floor(Math.random() * digimones.length)];

    // Simulación de combate
    const resultado = simularCombate(digimonCapturado, digimonAleatorio);

    // Mostrar resultado
    mostrarResultado(digimonCapturado, digimonAleatorio, resultado);
}

function simularCombate(digimonCapturado, digimonAleatorio) {
    // Simulación simple de combate basado en niveles
    const nivelCapturado = obtenerNivel(digimonCapturado);
    const nivelAleatorio = obtenerNivel(digimonAleatorio.name);

    if (nivelCapturado > nivelAleatorio) {
        return "¡Has ganado el combate!";
    } else if (nivelCapturado < nivelAleatorio) {
        return "Has perdido el combate.";
    } else {
        return "El combate ha terminado en empate.";
    }
}

function obtenerNivel(nombre) {
    const digimon = digimones.find(d => d.name === nombre);
    return digimon ? digimon.level : 0; // Retorna 0 si no se encuentra el Digimon
}

function mostrarResultado(digimonCapturado, digimonAleatorio, resultado) {
    const root = document.getElementById("root");
    root.innerHTML = `
        <section class="c-combate">
            <h2>Combate entre ${digimonCapturado} y ${digimonAleatorio.name}</h2>
            <p>${resultado}</p>
            <button onclick="Home()">Volver a la galería</button>
        </section>
    `;
}