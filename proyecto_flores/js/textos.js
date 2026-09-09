// ======================================================
// FRASES ORIGINALES
// ======================================================

const frases = [
    "Mi amor",
    "Mi destino",
    "Mi cielo",
    "Reina",
    "Felicidad",
    "Eternidad",
    "Sueños",
    "Libertad",
    "Mi razón",
    "Mi universo",
    "Contigo",
    "Brillas",
    "Pasión",
    "Dulzura",
    "Esperanza"
];

// ======================================================
// ESTILOS TIPOGRÁFICOS
// ======================================================

const estilosTexto = {

    // --------------------------------------------------
    // ROMÁNTICO
    // --------------------------------------------------

    romantic: {
        fuentes: [
            "Great Vibes",
            "Dancing Script",
            "Sacramento"
        ],

        peso: "400",

        inclinacion: "normal"
    },

    // --------------------------------------------------
    // ELEGANTE
    // --------------------------------------------------

    elegant: {
        fuentes: [
            "Playfair Display",
            "Cinzel"
        ],

        peso: "400",

        inclinacion: "normal"
    },

    // --------------------------------------------------
    // MODERNO
    // --------------------------------------------------

    modern: {
        fuentes: [
            "Montserrat"
        ],

        pesos: [
            "300",
            "500"
        ],

        inclinacion: "normal"
    }
};

// ======================================================
// CONFIGURACIÓN
// ======================================================

const CONFIG_TEXTO = {

    tamañoMin: 10,
    tamañoMax: 34,

    opacidadMin: 0.25,
    opacidadMax: 1,

    velocidadFadeEntrada: 0.008,
    velocidadFadeSalida: 0.004,

    tiempoVisibleMin: 3000,
    tiempoVisibleMax: 7000,

    velocidadMovimientoMin: 0.05,
    velocidadMovimientoMax: 0.45,

    oscilacionMin: 0.002,
    oscilacionMax: 0.008,

    amplitudMin: 2,
    amplitudMax: 8,

    rotacionMax: 0.025
};

// ======================================================
// CLASE TEXTO FLOTANTE
// ======================================================

class TextoFlotante {

    constructor() {

        // ==================================================
        // PROFUNDIDAD
        // ==================================================

        this.profundidad =
            Math.random();

        // ==================================================
        // POSICIÓN
        // ==================================================

        this.x =
            Math.random() *
            window.innerWidth;

        this.y =
            Math.random() *
            window.innerHeight;

        // Guardamos la posición base
        // para la oscilación.

        this.xInicial =
            this.x;

        this.yInicial =
            this.y;

        // ==================================================
        // TAMAÑO
        // ==================================================

        this.tamaño =
            CONFIG_TEXTO.tamañoMin +
            this.profundidad *
            (
                CONFIG_TEXTO.tamañoMax -
                CONFIG_TEXTO.tamañoMin
            );

        // ==================================================
        // MOVIMIENTO
        // ==================================================

        const velocidad =
            CONFIG_TEXTO.velocidadMovimientoMin +
            this.profundidad *
            (
                CONFIG_TEXTO.velocidadMovimientoMax -
                CONFIG_TEXTO.velocidadMovimientoMin
            );

        this.velocidadX =
            (
                Math.random() - 0.5
            ) * velocidad;

        this.velocidadY =
            (
                Math.random() - 0.5
            ) * velocidad;

        // ==================================================
        // ROTACIÓN
        // ==================================================

        this.rotacion =
            (
                Math.random() - 0.5
            ) *
            CONFIG_TEXTO.rotacionMax;

        // ==================================================
        // OPACIDAD
        // ==================================================

        this.opacidad = 0;

        this.opacidadMax =
            CONFIG_TEXTO.opacidadMin +
            this.profundidad *
            (
                CONFIG_TEXTO.opacidadMax -
                CONFIG_TEXTO.opacidadMin
            );

        // ==================================================
        // ESTADO
        // ==================================================

        this.estado = "apareciendo";

        this.tiempoVisible = 0;

        this.duracionVisible =
            CONFIG_TEXTO.tiempoVisibleMin +
            Math.random() *
            (
                CONFIG_TEXTO.tiempoVisibleMax -
                CONFIG_TEXTO.tiempoVisibleMin
            );

        // ==================================================
        // FRASE
        // ==================================================

        this.cambiarFrase();

        // ==================================================
        // ESTILO
        // ==================================================

        this.cambiarEstilo();

        // ==================================================
        // OSCILACIÓN
        // ==================================================

        this.oscilacion =
            Math.random() *
            Math.PI *
            2;

        this.velocidadOscilacion =
            CONFIG_TEXTO.oscilacionMin +
            Math.random() *
            (
                CONFIG_TEXTO.oscilacionMax -
                CONFIG_TEXTO.oscilacionMin
            );

        this.amplitudOscilacion =
            CONFIG_TEXTO.amplitudMin +
            Math.random() *
            (
                CONFIG_TEXTO.amplitudMax -
                CONFIG_TEXTO.amplitudMin
            );

        // ==================================================
        // PARALLAX
        // ==================================================

        this.parallaxX = 0;
        this.parallaxY = 0;
    }

    // ======================================================
    // CAMBIAR FRASE
    // ======================================================

    cambiarFrase() {

        this.frase =
            frases[
                Math.floor(
                    Math.random() *
                    frases.length
                )
            ];
    }

    // ======================================================
    // CAMBIAR ESTILO
    // ======================================================

    cambiarEstilo() {

        const nombresEstilo = [
            "romantic",
            "elegant",
            "modern"
        ];

        this.tipoEstilo =
            nombresEstilo[
                Math.floor(
                    Math.random() *
                    nombresEstilo.length
                )
            ];

        this.estilo =
            estilosTexto[
                this.tipoEstilo
            ];

        this.fuente =
            this.estilo.fuentes[
                Math.floor(
                    Math.random() *
                    this.estilo.fuentes.length
                )
            ];

        // Montserrat puede tener
        // diferentes pesos.

        if (this.estilo.pesos) {

            this.peso =
                this.estilo.pesos[
                    Math.floor(
                        Math.random() *
                        this.estilo.pesos.length
                    )
                ];

        } else {

            this.peso =
                this.estilo.peso;
        }
    }

    // ======================================================
    // REINICIAR
    // ======================================================

    reiniciar() {

        this.x =
            Math.random() *
            window.innerWidth;

        this.y =
            Math.random() *
            window.innerHeight;

        this.xInicial =
            this.x;

        this.yInicial =
            this.y;

        this.opacidad = 0;

        this.estado =
            "apareciendo";

        this.tiempoVisible = 0;

        this.duracionVisible =
            CONFIG_TEXTO.tiempoVisibleMin +
            Math.random() *
            (
                CONFIG_TEXTO.tiempoVisibleMax -
                CONFIG_TEXTO.tiempoVisibleMin
            );

        this.cambiarFrase();

        this.cambiarEstilo();

        this.oscilacion =
            Math.random() *
            Math.PI *
            2;
    }

    // ======================================================
    // ACTUALIZAR
    // ======================================================

    actualizar() {

        // ==================================================
        // MOVIMIENTO
        // ==================================================

        this.x +=
            this.velocidadX;

        this.y +=
            this.velocidadY;

        // ==================================================
        // OSCILACIÓN
        // ==================================================

        this.oscilacion +=
            this.velocidadOscilacion;

        const movimientoOscilante =
            Math.sin(this.oscilacion) *
            this.amplitudOscilacion;

        this.y +=
            movimientoOscilante * 0.03;

        // ==================================================
        // ESTADO: APARECIENDO
        // ==================================================

        if (
            this.estado ===
            "apareciendo"
        ) {

            this.opacidad +=
                CONFIG_TEXTO.velocidadFadeEntrada;

            if (
                this.opacidad >=
                this.opacidadMax
            ) {

                this.opacidad =
                    this.opacidadMax;

                this.estado =
                    "visible";
            }
        }

        // ==================================================
        // ESTADO: VISIBLE
        // ==================================================

        else if (
            this.estado ===
            "visible"
        ) {

            this.tiempoVisible +=
                16;

            if (
                this.tiempoVisible >=
                this.duracionVisible
            ) {

                this.estado =
                    "desapareciendo";
            }
        }

        // ==================================================
        // ESTADO: DESAPARECIENDO
        // ==================================================

        else if (
            this.estado ===
            "desapareciendo"
        ) {

            this.opacidad -=
                CONFIG_TEXTO.velocidadFadeSalida;

            if (
                this.opacidad <= 0
            ) {

                this.opacidad = 0;

                this.reiniciar();
            }
        }

        // ==================================================
        // BORDES
        // ==================================================

        const margen =
            this.tamaño * 2;

        if (
            this.x < -margen
        ) {

            this.x =
                window.innerWidth +
                margen;
        }

        if (
            this.x >
            window.innerWidth +
            margen
        ) {

            this.x =
                -margen;
        }

        if (
            this.y < -margen
        ) {

            this.y =
                window.innerHeight +
                margen;
        }

        if (
            this.y >
            window.innerHeight +
            margen
        ) {

            this.y =
                -margen;
        }
    }

    // ======================================================
    // DIBUJAR
    // ======================================================

    dibujar() {

        if (
            this.opacidad <= 0
        ) {
            return;
        }

        ctx.save();

        // ==================================================
        // TRANSPARENCIA
        // ==================================================

        ctx.globalAlpha =
            this.opacidad;

        // ==================================================
        // POSICIÓN
        // ==================================================

        ctx.translate(
            this.x + this.parallaxX,
            this.y + this.parallaxY
        );

        // ==================================================
        // ROTACIÓN
        // ==================================================

        ctx.rotate(
            this.rotacion
        );

        // ==================================================
        // TIPOGRAFÍA
        // ==================================================

        ctx.font =
            `${this.peso} ${this.tamaño}px "${this.fuente}"`;

        ctx.textAlign =
            "center";

        ctx.textBaseline =
            "middle";

        // ==================================================
        // BRILLO
        // ==================================================

        ctx.shadowBlur =
            8 +
            this.profundidad * 8;

        ctx.shadowColor =
            "rgba(255,255,255,0.6)";

        // ==================================================
        // COLOR
        // ==================================================

        ctx.fillStyle =
            "#ffffff";

        // ==================================================
        // TEXTO
        // ==================================================

        ctx.fillText(
            this.frase,
            0,
            0
        );

        ctx.restore();
    }
}