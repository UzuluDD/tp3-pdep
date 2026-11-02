export class Tarea {
    titulo: string;
    descripcion: string;
    estado: string;
    fechaCreacion: Date;
    vencimiento: string | null;
    costo: number;
    dificultad: number;

    constructor(titulo: string, descripcion: string = "", costo: number = 0, vencimiento: string | null = null, dificultad: number = 1) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.estado = "Pendiente";
        this.fechaCreacion = new Date();
        this.vencimiento = vencimiento;
        this.costo = costo;
        this.dificultad = dificultad;
    }

    obtenerDificultadVisual(): string {
        switch (this.dificultad) {
            case 1: return "⭐ (Fácil)";
            case 2: return "⭐⭐ (Medio)";
            case 3: return "⭐⭐⭐ (Difícil)";
            default: return "⭐ (Fácil)";
        }
    }

    cambiarEstado(nuevoEstado: string) {
        const estadosValidos = ["Pendiente", "En curso", "Terminada", "Cancelada"];
        if (estadosValidos.includes(nuevoEstado)) {
            this.estado = nuevoEstado;
            console.log(`¡Estado actualizado a: ${this.estado}!`);
        } else {
            console.log("Error: Estado no válido.");
        }
    }
}