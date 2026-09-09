const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const fraseClic = document.getElementById("fraseClic");
const fotoClic = document.getElementById("fotoClic");

const frasesClic = [
    "Hay momentos en los que el corazón no necesita palabras para saber que ha encontrado a la persona que siempre quiso tener a su lado.",
    "Entre millones de personas, entre tantos caminos y tantos destinos posibles, qué bonito es que nuestras vidas hayan encontrado la manera de coincidir.",
    "Si pudiera guardar un instante para volver a él cada vez que te extraño, elegiría uno en el que simplemente estuvieras tú, porque contigo cualquier momento se vuelve especial."
];

const fotosClic = [
    "imagenes/foto1.jpg",
    
];


// ==========================================
// AJUSTAR CANVAS
// ==========================================

function ajustarCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

ajustarCanvas();

window.addEventListener(
    "resize",
    ajustarCanvas
);


// ==========================================
// CLASE FLOR
// ==========================================

class Flor {

    constructor(imagen) {

        this.imagen = imagen;

        // Profundidad
        this.profundidad =
            Math.random();

        // Posición
        this.x =
            Math.random() *
            canvas.width;

        this.y =
            Math.random() *
            canvas.height;

        // Tamaño
        this.tamano =
            60 +
            (this.profundidad * 220);

        // Movimiento horizontal
        this.velocidadX =
            (Math.random() - 0.5) *
            (0.15 +
            this.profundidad * 0.5);

        // Movimiento vertical
        this.velocidadY =
            (Math.random() - 0.5) *
            (0.15 +
            this.profundidad * 0.5);

        // Rotación
        this.rotacion =
            Math.random() *
            Math.PI * 2;

        this.velocidadRotacion =
            (Math.random() - 0.5) *
            0.003;

        // Aparición
        this.opacidad = 0;

        this.opacidadMaxima =
            0.35 +
            (this.profundidad * 0.65);

        this.velocidadOpacidad =
            0.005 +
            Math.random() * 0.01;

        // Efecto de interacción
        this.latido = 0;
        this.brillo = 0;

    }


    // ======================================
    // ACTUALIZAR FLOR
    // ======================================

    actualizar() {

        this.x +=
            this.velocidadX;

        this.y +=
            this.velocidadY;

        this.rotacion +=
            this.velocidadRotacion;


        // Reducir progresivamente
        // el efecto de clic

        if (this.latido > 0) {

            this.latido *= 0.90;

            if (this.latido < 0.01) {

                this.latido = 0;

            }

        }


        if (this.brillo > 0) {

            this.brillo -= 0.025;

            if (this.brillo < 0) {

                this.brillo = 0;

            }

        }


        // Aparecer progresivamente

        if (
            this.opacidad <
            this.opacidadMaxima
        ) {

            this.opacidad +=
                this.velocidadOpacidad;

            if (
                this.opacidad >
                this.opacidadMaxima
            ) {

                this.opacidad =
                    this.opacidadMaxima;

            }

        }


        // Salir por un lado
        // y aparecer por el otro

        if (
            this.x >
            canvas.width + this.tamano
        ) {

            this.x =
                -this.tamano;

        }

        if (
            this.x <
            -this.tamano
        ) {

            this.x =
                canvas.width +
                this.tamano;

        }

        if (
            this.y >
            canvas.height +
            this.tamano
        ) {

            this.y =
                -this.tamano;

        }

        if (
            this.y <
            -this.tamano
        ) {

            this.y =
                canvas.height +
                this.tamano;

        }

    }


    // ======================================
    // DETECTAR CLICK SOBRE LA FLOR
    // ======================================

    contienePunto(px, py) {

        // Distancia desde el centro
        // de la flor

        const dx =
            px - this.x;

        const dy =
            py - this.y;


        // Deshacer la rotación

        const cos =
            Math.cos(-this.rotacion);

        const sin =
            Math.sin(-this.rotacion);


        const localX =
            dx * cos -
            dy * sin;

        const localY =
            dx * sin +
            dy * cos;


        // Proporción de la imagen

        const proporcion =
            this.imagen.height /
            this.imagen.width;

        const ancho =
            this.tamano;

        const alto =
            ancho * proporcion;


        // Área donde se puede hacer click

        return (
            Math.abs(localX) <=
            ancho / 2 &&
            Math.abs(localY) <=
            alto / 2
        );

    }


    // ======================================
    // DIBUJAR FLOR
    // ======================================

    dibujar() {

        ctx.save();

        ctx.globalAlpha =
            this.opacidad;


        // Efecto de latido

        const escalaLatido =
            1 + this.latido;


        ctx.translate(
            this.x,
            this.y
        );

        ctx.rotate(
            this.rotacion
        );

        ctx.scale(
            escalaLatido,
            escalaLatido
        );


        const proporcion =
            this.imagen.height /
            this.imagen.width;

        const ancho =
            this.tamano;

        const alto =
            ancho * proporcion;


        // Brillo temporal al hacer clic

        if (this.brillo > 0) {

            ctx.shadowBlur =
                25 * this.brillo;

            ctx.shadowColor =
                `rgba(255, 70, 100, ${this.brillo})`;

        }


        ctx.drawImage(
            this.imagen,
            -ancho / 2,
            -alto / 2,
            ancho,
            alto
        );

        ctx.restore();

    }

}


// ==========================================
// CARGAR RAMO
// ==========================================

const imagenFlor =
    new Image();


// ==========================================
// MATRICES
// ==========================================

const flores = [];
const textos = [];
const particulas = [];
const corazones = [];


// ==========================================
// CREAR TEXTOS
// ==========================================

for (let i = 0; i < 25; i++) {

    const frase =
        frases[
            Math.floor(
                Math.random() *
                frases.length
            )
        ];

    textos.push(
        new TextoFlotante(frase)
    );

}


// ==========================================
// CREAR PARTÍCULAS
// ==========================================

for (let i = 0; i < 150; i++) {

    particulas.push(
        new Particula()
    );

}


// ==========================================
// CUANDO LA IMAGEN CARGA
// ==========================================

imagenFlor.onload = function () {

    console.log(
        "Ramo cargado correctamente"
    );


    // Crear flores

    for (let i = 0; i < 10; i++) {

        flores.push(
            new Flor(imagenFlor)
        );

    }

};


// ==========================================
// ERROR AL CARGAR EL RAMO
// ==========================================

imagenFlor.onerror = function () {

    console.error(
        "No se pudo cargar imagenes/ramo1.png"
    );

};


// ==========================================
// INICIAR ANIMACIÓN
// ==========================================

animar();


// ==========================================
// CARGAR IMAGEN
// ==========================================

imagenFlor.src =
    "imagenes/ramo1.png";


// ==========================================
// CLICK SOBRE EL CANVAS
// ==========================================

canvas.addEventListener(
    "click",
    function(event) {

        const x =
            event.clientX;

        const y =
            event.clientY;


        // Buscar las flores que están
        // debajo del cursor

        const floresSeleccionadas =
            flores.filter(
                flor =>
                    flor.contienePunto(x, y)
            );


        // Si no hay ninguna flor,
        // no hacemos nada

        if (
            floresSeleccionadas.length === 0
        ) {

            return;

        }


        // Si hay varias flores superpuestas,
        // seleccionar la que tiene mayor profundidad

        floresSeleccionadas.sort(
            (a, b) =>
                b.profundidad -
                a.profundidad
        );


        const flor =
            floresSeleccionadas[0];


        // Activar efecto de latido y brillo

        flor.latido = 0.12;
        flor.brillo = 1;


        // Crear explosión de corazones

        const cantidad =
            8 +
            Math.floor(
                Math.random() * 5
            );


        for (
            let i = 0;
            i < cantidad;
            i++
        ) {

            // Distribuir los corazones
            // en diferentes direcciones

            const angulo =
                Math.random() *
                Math.PI * 2;


            const velocidad =
                0.8 +
                Math.random() * 1.8;


            corazones.push(
                new Corazon(
                    flor.x,
                    flor.y,
                    angulo,
                    velocidad
                )
            );

        }


     // ======================================
// MOSTRAR FRASE Y FOTO
// ======================================

const fraseAleatoria =
    frasesClic[
        Math.floor(
            Math.random() *
            frasesClic.length
        )
    ];

const fotoAleatoria =
    fotosClic[
        Math.floor(
            Math.random() *
            fotosClic.length
        )
    ];


// Desaparecer lo que estaba anteriormente

fraseClic.classList.remove(
    "visible"
);

fotoClic.classList.remove(
    "visible"
);


// Esperar 3 segundos

setTimeout(() => {

    fraseClic.textContent =
        fraseAleatoria;


    fotoClic.innerHTML = `
        <img
            src="${fotoAleatoria}"
            alt="Foto"
        >
    `;


    fraseClic.classList.add(
        "visible"
    );

    fotoClic.classList.add(
        "visible"
    );

}, 3000);


        setTimeout(() => {

            fraseClic.classList.add(
                "visible"
            );

            fotoClic.classList.add(
                "visible"
            );

        }, 3000);

    }
);


// ==========================================
// ANIMACIÓN
// ==========================================

function animar() {

    // Limpiar pantalla

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // Fondo

    ctx.fillStyle =
        "#050505";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // ======================================
    // PARTÍCULAS
    // ======================================

    for (
        const particula of particulas
    ) {

        particula.actualizar();
        particula.dibujar();

    }


    // ======================================
    // ACTUALIZAR FLORES
    // ======================================

    for (
        const flor of flores
    ) {

        flor.actualizar();

    }


    // ======================================
    // ACTUALIZAR TEXTOS
    // ======================================

    for (
        const texto of textos
    ) {

        texto.actualizar();

    }


    // ======================================
    // ORDENAR POR PROFUNDIDAD
    // ======================================

    const elementos = [
        ...flores,
        ...textos
    ];


    elementos.sort(
        (a, b) =>
            a.profundidad -
            b.profundidad
    );


    // Dibujar

    for (
        const elemento of elementos
    ) {

        elemento.dibujar();

    }


    // ======================================
    // CORAZONES
    // ======================================

    for (
        let i = corazones.length - 1;
        i >= 0;
        i--
    ) {

        const corazon =
            corazones[i];


        corazon.actualizar();
        corazon.dibujar();


        // Eliminar corazones
        // completamente transparentes

        if (
            corazon.opacidad <= 0
        ) {

            corazones.splice(
                i,
                1
            );

        }

    }


    // Continuar animación

    requestAnimationFrame(
        animar
    );

}