class Corazon {

    constructor(x, y, angulo, velocidad) {

        // ==================================================
        // POSICIÓN
        // ==================================================

        this.x = x;
        this.y = y;

        // ==================================================
        // TAMAÑO
        // ==================================================

        this.tamaño =
            8 + Math.random() * 12;

        // Algunos corazones serán pequeños
        // y otros más grandes.

        if (Math.random() < 0.2) {
            this.tamaño *= 1.35;
        }

        // ==================================================
        // MOVIMIENTO
        // ==================================================

        this.anguloMovimiento = angulo;

        this.velocidad =
            velocidad;

        this.velocidadX =
            Math.cos(angulo) *
            velocidad;

        this.velocidadY =
            Math.sin(angulo) *
            velocidad;

        // ==================================================
        // GRAVEDAD
        // ==================================================

        this.gravedad =
            0.008 +
            Math.random() * 0.012;

        // ==================================================
        // VIENTO
        // ==================================================

        this.viento =
            (Math.random() - 0.5) *
            0.015;

        // ==================================================
        // ROTACIÓN
        // ==================================================

        this.rotacion =
            Math.random() *
            Math.PI *
            2;

        this.velocidadRotacion =
            (Math.random() - 0.5) *
            0.08;

        // ==================================================
        // OPACIDAD
        // ==================================================

        this.opacidad = 1;

        this.velocidadDesaparicion =
            0.006 +
            Math.random() * 0.006;

        // ==================================================
        // VIDA
        // ==================================================

        this.vida = 1;

        // ==================================================
        // COLOR
        // ==================================================

        const colores = [
            "#ff4d6d",
            "#ff6b81",
            "#ff8fa3",
            "#ffccd5",
            "#ffffff"
        ];

        this.color =
            colores[
                Math.floor(
                    Math.random() *
                    colores.length
                )
            ];

        // ==================================================
        // BRILLO
        // ==================================================

        this.brillo =
            8 +
            Math.random() * 12;

        // ==================================================
        // OSCILACIÓN
        // ==================================================

        this.oscilacion =
            Math.random() *
            Math.PI *
            2;

        this.velocidadOscilacion =
            0.02 +
            Math.random() * 0.025;

        this.fuerzaOscilacion =
            0.2 +
            Math.random() * 0.5;
    }

    // ======================================================
    // ACTUALIZAR
    // ======================================================

    actualizar() {

        // ------------------------------------------
        // Movimiento horizontal
        // ------------------------------------------

        this.velocidadX += this.viento;

        // Limitar velocidad horizontal

        this.velocidadX *= 0.995;

        this.x += this.velocidadX;

        // ------------------------------------------
        // Movimiento vertical
        // ------------------------------------------

        this.velocidadY += this.gravedad;

        this.y += this.velocidadY;

        // ------------------------------------------
        // Oscilación lateral
        // ------------------------------------------

        this.oscilacion +=
            this.velocidadOscilacion;

        this.x +=
            Math.sin(this.oscilacion) *
            this.fuerzaOscilacion;

        // ------------------------------------------
        // Rotación
        // ------------------------------------------

        this.rotacion +=
            this.velocidadRotacion;

        // ------------------------------------------
        // Desaparición
        // ------------------------------------------

        this.opacidad -=
            this.velocidadDesaparicion;

        if (this.opacidad < 0) {
            this.opacidad = 0;
        }

        // ------------------------------------------
        // Vida
        // ------------------------------------------

        this.vida = this.opacidad;
    }

    // ======================================================
    // DIBUJAR
    // ======================================================

    dibujar() {

        if (this.opacidad <= 0) {
            return;
        }

        ctx.save();

        // ------------------------------------------
        // Transparencia
        // ------------------------------------------

        ctx.globalAlpha =
            this.opacidad;

        // ------------------------------------------
        // Posición
        // ------------------------------------------

        ctx.translate(
            this.x,
            this.y
        );

        // ------------------------------------------
        // Rotación
        // ------------------------------------------

        ctx.rotate(
            this.rotacion
        );

        // ------------------------------------------
        // Brillo
        // ------------------------------------------

        ctx.shadowBlur =
            this.brillo;

        ctx.shadowColor =
            this.color;

        // ------------------------------------------
        // Color
        // ------------------------------------------

        ctx.fillStyle =
            this.color;

        // ------------------------------------------
        // Escala
        // ------------------------------------------

        const s =
            this.tamaño;

        // ------------------------------------------
        // Corazón
        // ------------------------------------------

        ctx.beginPath();

        ctx.moveTo(
            0,
            s * 0.3
        );

        // Parte izquierda

        ctx.bezierCurveTo(
            -s * 0.8,
            -s * 0.2,

            -s * 0.6,
            -s,

            0,
            -s * 0.35
        );

        // Parte derecha

        ctx.bezierCurveTo(
            s * 0.6,
            -s,

            s * 0.8,
            -s * 0.2,

            0,
            s * 0.3
        );

        // Punta inferior

        ctx.closePath();

        ctx.fill();

        ctx.restore();
    }
}