function informativa(){
        const root = document.getElementById('root');
        root.innerHTML = '';

        const html = `
        <section class="info-wrap">
            <h2>DigiDex — Historia y Mundo Digital</h2>
            <p class="lead">Los Digimon (Digital Monsters) son criaturas originadas dentro del "Mundo Digital", un universo paralelo creado por los datos de la humanidad. A lo largo de las décadas han surgido historias diversas en series, juegos y películas.</p>

            <h3>Origen y concepto</h3>
            <p>El concepto de Digimon nació en 1997 como mascota virtual para dispositivos portátiles (similar a los tamagotchi), pero evolucionó rápidamente en una franquicia multimedia. La idea central es que los Digimon son entidades digitales con la capacidad de evolucionar a formas más poderosas al ganar experiencia o sincronizarse con sus compañeros humanos.</p>

            <h3>El Mundo Digital</h3>
            <p>El Mundo Digital es una red paralela que refleja, corrompe y recrea datos del mundo real. Está compuesto por distintos <em>sectores</em> y servidores, con paisajes que van desde bosques de datos hasta ciudades de código y zonas corrompidas. Migraciones, virus y eventos de sincronía son amenazas constantes.</p>

            <h3>Niveles y clasificación</h3>
            <ul>
                <li><strong>Fresh</strong>: formas muy básicas; recién nacidas.</li>
                <li><strong>In Training</strong>: formas infantiles en desarrollo.</li>
                <li><strong>Rookie</strong>: la forma común en combate.</li>
                <li><strong>Champion</strong>: evoluciones más fuertes y especializadas.</li>
                <li><strong>Ultimate</strong>: poderosas, con habilidades avanzadas.</li>
                <li><strong>Mega</strong>: formas muy raras y extremadamente poderosas.</li>
                <li><strong>Armor</strong>: evoluciones alternativas basadas en artefactos o datos especiales.</li>
            </ul>

            <h3>Curiosidades</h3>
            <p>- Muchos Digimon están inspirados en animales, mitología y máquinas.</p>
            <p>- A diferencia de otras franquicias, las evoluciones en Digimon suelen ser temporales y dependientes de condiciones.</p>

            <h3>Lecturas y recursos</h3>
            <p>Puedes explorar más en fuentes como enciclopedias de fans, wikis y guías de la franquicia. En esta versión de DigiDex usamos datos públicos de la Digimon API para mostrar listas y fichas.</p>

            <div class="info-actions">
                <button onclick="Home()">Volver a la galería</button>
            </div>
        </section>
        `;

        root.innerHTML = html;
}