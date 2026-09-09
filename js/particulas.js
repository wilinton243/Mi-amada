class Particula {

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

        // ==================================================
        // TAMAÑO SEGÚN PROFUNDIDAD
        // ==================================================

        this.tamaño =
            0.4 +
            this.profundidad * 2.8;

        // ==================================================
        // VELOCIDAD SEGÚN PROFUNDIDAD
        // ==================================================

        const velocidad =
            0.02 +
            this.profundidad * 0.12;

        this.velocidadX =
            (
                Math.random() - 0.5
            ) * velocidad;

        this.velocidadY =
            (
                Math.random() - 0.5
            ) * velocidad;

        // ==================================================
        // OPACIDAD
        // ==================================================

        this.opacidad =
            0.15 +
            Math.random() * 0.65;

        this.opacidadBase =
            this.opacidad;

        // ==================================================
        // PARPADEO
        // ==================================================

        this.velocidadParpadeo =
            0.003 +
            Math.random() * 0.012;

        this.direccionParpadeo =
            Math.random() < 0.5
                ? 1
                : -1;

        // ==================================================
        // TIPO
        // ==================================================

        // La mayoría serán puntos.
        // Algunas serán estrellas.

        this.tipo =
            Math.random() < 0.16
                ? 1
                : 0;

        // ==================================================
        // ROTACIÓN
        // ==================================================

        this.rotacion =
            Math.random() *
            Math.PI *
            2;

        this.velocidadRotacion =
            (
                Math.random() - 0.5
            ) * 0.01;

        // ==================================================
        // OSCILACIÓN
        // ==================================================

        this.oscilacion =
            Math.random() *
            Math.PI *
            2;

        this.velocidadOscilacion =
            0.005 +
            Math.random() * 0.015;

        this.amplitudOscilacion =
            0.1 +
            this.profundidad * 0.8;

        // ==================================================
        // BRILLO
        // ==================================================

        this.brillo =
            this.tipo === 1
                ? 10 + Math.random() * 15
                : 3 + Math.random() * 7;
    }

    // ======================================================
    // ACTUALIZAR
    // ======================================================

    actualizar() {

        // ==================================================
        // MOVIMIENTO
        // ==================================================

        this.x += this.velocidadX;
        this.y += this.velocidadY;

        // ==================================================
        // OSCILACIÓN
        // ==================================================

        this.oscilacion +=
            this.velocidadOscilacion;

        this.x +=
            Math.sin(this.oscilacion) *
            this.amplitudOscilacion *
            0.02;

        // ==================================================
        // ROTACIÓN
        // ==================================================

        this.rotacion +=
            this.velocidadRotacion;

        // ==================================================
        // PARPADEO
        // ==================================================

        this.opacidad +=
            this.velocidadParpadeo *
            this.direccionParpadeo;

        // Límite superior

        if (
            this.opacidad >=
            this.opacidadBase
        ) {

            this.opacidad =
                this.opacidadBase;

            this.direccionParpadeo =
                -1;
        }

        // Límite inferior

        if (
            this.opacidad <= 0.05
        ) {

            this.opacidad =
                0.05;

            this.direccionParpadeo =
                1;
        }

        // ==================================================
        // RECICLAR EN LOS BORDES
        // ==================================================

        const margen = 20;

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
            this.x,
            this.y
        );

        // ==================================================
        // ROTACIÓN
        // ==================================================

        ctx.rotate(
            this.rotacion
        );

        // ==================================================
        // BRILLO
        // ==================================================

        ctx.shadowBlur =
            this.brillo;

        ctx.shadowColor =
            "rgba(255,255,255,0.9)";

        // ==================================================
        // COLOR
        // ==================================================

        ctx.fillStyle =
            "#ffffff";

        // ==================================================
        // PARTÍCULA NORMAL
        // ==================================================

        if (
            this.tipo === 0
        ) {

            ctx.beginPath();

            ctx.arc(
                0,
                0,
                this.tamaño,
                0,
                Math.PI * 2
            );

            ctx.fill();
        }

        // ==================================================
        // DESTELLO
        // ==================================================

        else {

            const tamaño =
                this.tamaño * 2.8;

            ctx.beginPath();

            // Punto superior
            ctx.moveTo(
                0,
                -tamaño
            );

            // Derecha superior
            ctx.lineTo(
                tamaño * 0.25,
                -tamaño * 0.25
            );

            // Derecha
            ctx.lineTo(
                tamaño,
                0
            );

            // Derecha inferior
            ctx.lineTo(
                tamaño * 0.25,
                tamaño * 0.25
            );

            // Punto inferior
            ctx.lineTo(
                0,
                tamaño
            );

            // Izquierda inferior
            ctx.lineTo(
                -tamaño * 0.25,
                tamaño * 0.25
            );

            // Izquierda
            ctx.lineTo(
                -tamaño,
                0
            );

            // Izquierda superior
            ctx.lineTo(
                -tamaño * 0.25,
                -tamaño * 0.25
            );

            ctx.closePath();

            ctx.fill();
        }

        ctx.restore();
    }
}