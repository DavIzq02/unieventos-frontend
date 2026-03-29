import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EventosService } from '../../../core/services/eventos.service';
import { BreadcrumbItem } from '../../../shared/models/breadcrumb-item.model';
import { MyEvento } from 'src/app/shared/models/my-evento.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css']
})
export class CrearEventoComponent implements OnInit {

  breadcrumb: BreadcrumbItem[] = [
    { label: 'Inicio', link: '/dashboard' },
    { label: 'Mis Eventos', link: '/eventos/mis-eventos' },
    { label: 'Crear Evento' }
  ];

  dirigidoAOptions = ['Estudiantes', 'Docentes', 'Egresados', 'Administrativos'];
  tipoEventoOptions = ['Académico', 'Cultural', 'Deportivo', 'Social', 'Tecnológico', 'Bienestar'];

  form!: FormGroup;
  imagenPreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private eventosService: EventosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      fechaFin: ['', Validators.required],
      descripcion: [''],
      portada: [''],
      fechaApertura: ['', Validators.required],
      dirigidoA: ['', Validators.required],
      tipoEvento: ['', Validators.required],
      horarios: this.fb.array([this.crearHorario()])
    });
  }

  get horarios(): FormArray {
    return this.form.get('horarios') as FormArray;
  }

  crearHorario(): FormGroup {
    return this.fb.group({
      inicio: ['', Validators.required],
      fin: ['', Validators.required]
    });
  }

  agregarHorario(): void {
    this.horarios.push(this.crearHorario());
  }

  eliminarHorario(index: number): void {
    if (this.horarios.length > 1) {
      this.horarios.removeAt(index);
    } else {
      Swal.fire({
        title: 'Atención',
        text: 'Debe haber al menos un horario',
        icon: 'warning',
        confirmButtonColor: '#1f5fa8'
      });
    }
  }

  onImagenChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagenPreview = e.target?.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.value;

    const nuevoEvento: MyEvento = {
      id: Date.now().toString(),
      nombre: v.nombre,
      descripcion: v.descripcion,
      fechaApertura: v.fechaApertura,
      fechaFin: v.fechaFin,
      dirigidoA: v.dirigidoA,
      tipo: v.tipoEvento,
      horarios: v.horarios,
      preinscritos: [],
      img: this.imagenPreview || 'https://cdn-icons-png.flaticon.com/512/1055/1055687.png',
      activo: false
    };

    this.eventosService.agregarEvento(nuevoEvento);

    Swal.fire({
      title: '¡Evento creado!',
      text: `${nuevoEvento.nombre} fue creado exitosamente`,
      icon: 'success',
      confirmButtonColor: '#1f5fa8'
    }).then(() => {
      this.router.navigate(['/eventos/mis-eventos']);
    });
  }
}