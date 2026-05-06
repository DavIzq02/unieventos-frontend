export interface Evento {
    id: number;
    nombre: string;
    nombreTipoEvento: string;
    descripcion: string;
    urlImagenPortada: string;
    fechaDeApertura: Date;
    fechaDeFinalizacion: Date;
    activo?: boolean;
    abierto?: boolean;
    cerrado?: boolean;
    listaJornadas?: any[];
    codigo?: string;
}