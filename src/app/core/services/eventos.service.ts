import { Injectable } from '@angular/core';
import { Evento } from '../../shared/models/evento.model';
import { MyEvento } from '../../shared/models/my-evento.model';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private eventosActuales: Evento[] = [
    {
      nombre: 'Simposio de Innovación',
      categoria: 'Académico',
      descripcion: 'Charlas en vivo sobre emprendimiento e innovación.',
      img: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
    },
    {
      nombre: 'Maratón de Programación',
      categoria: 'Tecnológico',
      descripcion: 'Competencia activa de resolución de problemas.',
      img: 'https://cdn-icons-png.flaticon.com/512/2721/2721279.png'
    },
    {
      nombre: 'Clases de Baile',
      categoria: 'Cultural',
      descripcion: 'Sesiones abiertas de danza para estudiantes.',
      img: 'https://cdn-icons-png.flaticon.com/512/3048/3048122.png'
    },
    {
      nombre: 'Ajedrez al lago',
      categoria: 'Deportivo',
      descripcion: 'Partidas en curso entre estudiantes.',
      img: 'https://cdn-icons-png.flaticon.com/512/3655/3655666.png'
    },
    {
      nombre: 'Campaña Ambiental',
      categoria: 'Social',
      descripcion: 'Actividades de reciclaje y concientización.',
      img: 'https://cdn-icons-png.flaticon.com/512/427/427735.png'
    },
    {
      nombre: 'Taller de Oratoria',
      categoria: 'Académico',
      descripcion: 'Prácticas en vivo para mejorar la comunicación.',
      img: 'https://cdn-icons-png.flaticon.com/512/1995/1995574.png'
    },
    {
      nombre: 'Zona Gamer',
      categoria: 'Social',
      descripcion: 'Espacio activo con videojuegos y torneos.',
      img: 'https://cdn-icons-png.flaticon.com/512/686/686589.png'
    }
  ];

  private proximosEventos: Evento[] = [
    {
      nombre: 'Semana Cultural',
      categoria: 'Social',
      descripcion: 'Evento cultural universitario.',
      img: 'https://cdn-icons-png.flaticon.com/512/854/854878.png'
    },
    {
      nombre: 'Festival de la Felicidad',
      categoria: 'Social',
      descripcion: 'Festival con música y actividades.',
      img: 'https://cdn-icons-png.flaticon.com/512/616/616489.png'
    },
    {
      nombre: 'Club de Lectura',
      categoria: 'Académico',
      descripcion: 'Reunión para amantes de los libros.',
      img: 'https://cdn-icons-png.flaticon.com/512/29/29302.png'
    },
    {
      nombre: 'Seminario de Inteligencia Artificial',
      categoria: 'Académico',
      descripcion: 'Conferencia sobre avances en IA.',
      img: 'https://cdn-icons-png.flaticon.com/512/4149/4149676.png'
    },
    {
      nombre: 'Torneo de Fútbol',
      categoria: 'Deportivo',
      descripcion: 'Competencia entre facultades.',
      img: 'https://cdn-icons-png.flaticon.com/512/861/861512.png'
    },
    {
      nombre: 'Hackathon 24h',
      categoria: 'Tecnológico',
      descripcion: 'Desarrollo de soluciones en 24 horas.',
      img: 'https://cdn-icons-png.flaticon.com/512/1055/1055687.png'
    },
    {
      nombre: 'Taller de Desarrollo Web',
      categoria: 'Tecnológico',
      descripcion: 'Aprende HTML, CSS y JavaScript.',
      img: 'https://cdn-icons-png.flaticon.com/512/2721/2721297.png'
    },
    {
      nombre: 'Festival de Cine',
      categoria: 'Cultural',
      descripcion: 'Proyección de películas independientes.',
      img: 'https://cdn-icons-png.flaticon.com/512/744/744922.png'
    },
    {
      nombre: 'Exposición de Arte',
      categoria: 'Cultural',
      descripcion: 'Muestra de obras de estudiantes.',
      img: 'https://cdn-icons-png.flaticon.com/512/1829/1829586.png'
    },
    {
      nombre: 'Jornada de Salud',
      categoria: 'Bienestar',
      descripcion: 'Chequeos médicos gratuitos.',
      img: 'https://cdn-icons-png.flaticon.com/512/2966/2966480.png'
    },
    {
      nombre: 'Taller de Manejo del Estrés',
      categoria: 'Bienestar',
      descripcion: 'Estrategias para mejorar la salud mental.',
      img: 'https://cdn-icons-png.flaticon.com/512/2913/2913465.png'
    }
  ];

  private misEventos: MyEvento[] = [
    {
      id: '1',
      nombre: '¡Hackaton al lago!',
      descripcion: 'Una competencia intensa de 24 horas para resolver retos tecnológicos cerca del lago de la universidad.',
      fechaApertura: '2026-03-01',
      fechaFin: '2026-03-30',
      dirigidoA: 'Estudiantes',
      tipo: 'Tecnológico',
      horarios: [
        { inicio: '10:00', fin: '22:00' },
        { inicio: '08:00', fin: '12:00' }
      ],
      preinscritos: ['Juan Pérez', 'Maria Garcia', 'Carlos Lopez', 'Ana Martinez'],
      img: 'assets/img/hackaton.png',
      activo: false
    },
    {
      id: '2',
      nombre: 'Monitoría Cálculo',
      descripcion: 'Sesiones de refuerzo para estudiantes de primer semestre. Repasaremos derivadas e integrales.',
      fechaApertura: '2026-03-05',
      fechaFin: '2026-04-05',
      dirigidoA: 'Estudiantes',
      tipo: 'Académico',
      horarios: [
        { inicio: '14:00', fin: '16:00' },
        { inicio: '10:00', fin: '12:00' }
      ],
      preinscritos: ['Sofia Torres', 'Luis Ramirez', 'Elena Rivas'],
      img: 'assets/img/monitoria.png',
      activo: false
    },
    {
      id: '3',
      nombre: 'Futbolito',
      descripcion: 'Torneo relámpago de fútbol 5. Inscripciones abiertas para todos los programas académicos.',
      fechaApertura: '2026-03-10',
      fechaFin: '2026-04-10',
      dirigidoA: 'Estudiantes',
      tipo: 'Deportivo',
      horarios: [
        { inicio: '16:00', fin: '18:00' },
        { inicio: '16:00', fin: '20:00' }
      ],
      preinscritos: ['Pedro Nel', 'Jorge Eliécer', 'Alvaro Uribe', 'Gustavo Petro'],
      img: 'assets/img/futbolito.png',
      activo: false
    }
  ];

  getMisEventos(): MyEvento[] {
    return this.misEventos;
  }

  getMisEventoById(id: string): MyEvento | undefined {
    return this.misEventos.find(e => e.id === id);
  }

  agregarEvento(evento: MyEvento): void {
    this.misEventos.push(evento);
  }

  eliminarEvento(id: string): void {
    this.misEventos = this.misEventos.filter(e => e.id !== id);
  }

  iniciarEvento(id: string): void {
    const evento = this.misEventos.find(e => e.id === id);
    if (evento) evento.activo = true;
  }

  getEventosActuales(): Evento[] {
    return this.eventosActuales;
  }

  getProximosEventos(): Evento[] {
    return this.proximosEventos;
  }

  filtrar(lista: Evento[], texto: string, categoria: string): Evento[] {
    return lista.filter(e => {
      const coincideTexto = e.nombre.toLowerCase().includes(texto.toLowerCase());
      const coincideCategoria = categoria === 'todos' || e.categoria === categoria;
      return coincideTexto && coincideCategoria;
    });
  }
}