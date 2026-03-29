export interface Horario {
    inicio: string;
    fin: string;
}

export interface MyEvento {
    id: string;
    nombre: string;
    descripcion: string;
    fechaApertura: string;
    fechaFin: string;
    dirigidoA: string;
    tipo: string;
    horarios: Horario[];
    preinscritos: string[];
    img: string;
    activo: boolean;
}