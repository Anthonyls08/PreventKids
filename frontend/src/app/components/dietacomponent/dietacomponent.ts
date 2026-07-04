import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  PLATFORM_ID,
  computed,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { Alimento } from '../../models/Alimento';
import { Hijo } from '../../models/Hijo';
import { Nutricionservice } from '../../services/nutricionservice';
import { Hijoservice } from '../../services/hijoservice';
import { Loginservice } from '../../services/loginservice';

@Component({
  selector: 'app-dietacomponent',
  imports: [
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatChipsModule,
  ],
  templateUrl: './dietacomponent.html',
  styleUrl: './dietacomponent.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dietacomponent implements OnInit {
  private nS = inject(Nutricionservice);
  private hS = inject(Hijoservice);
  private loginService = inject(Loginservice);
  private platformId = inject(PLATFORM_ID);

  termino = signal<string>('');
  resultados = signal<Alimento[]>([]);
  miDia = signal<Alimento[]>([]);
  cargando = signal<boolean>(false);
  buscado = signal<boolean>(false);

  // Paginacion de la API (12 alimentos por pagina)
  readonly tamPagina = 12;
  totalResultados = signal<number>(0);
  pagina = signal<number>(0);
  // Catalogo del que salieron los resultados: las paginas siguientes se piden
  // al mismo (asi el fallback Peru->mundo no mezcla resultados)
  private fuente: 'peru' | 'mundo' | undefined;
  private terminoBuscado = '';

  // Hijos del usuario: el dia de dieta se arma por cada nino
  hijos = signal<Hijo[]>([]);
  hijoSeleccionado = signal<Hijo | null>(null);

  // Maximo de azucar libre al dia segun la OMS
  readonly limiteAzucar = 25;

  // Meta de calorias segun la edad del hijo seleccionado
  // (referencias: 1-3 anios ~1200, 4-8 ~1400, 9-13 ~1800, 14+ ~2200)
  metaKcal = computed(() => {
    const h = this.hijoSeleccionado();
    if (!h) return 1800;
    const anios = this.edad(h.fechanacimiento);
    if (anios <= 3) return 1200;
    if (anios <= 8) return 1400;
    if (anios <= 13) return 1800;
    return 2200;
  });

  // Totales del dia (suma de lo agregado)
  totalCalorias = computed(() =>
    this.miDia().reduce((acc, a) => acc + a.calorias, 0)
  );
  totalAzucar = computed(
    () => Math.round(this.miDia().reduce((acc, a) => acc + a.azucar, 0) * 10) / 10
  );
  totalGrasa = computed(
    () => Math.round(this.miDia().reduce((acc, a) => acc + a.grasa, 0) * 10) / 10
  );
  totalProteina = computed(
    () => Math.round(this.miDia().reduce((acc, a) => acc + a.proteina, 0) * 10) / 10
  );

  // Avance frente a la meta (para las barras; el ancho se limita a 100%)
  porcentajeKcal = computed(() =>
    Math.round((this.totalCalorias() / this.metaKcal()) * 100)
  );
  porcentajeAzucar = computed(() =>
    Math.round((this.totalAzucar() / this.limiteAzucar) * 100)
  );

  // Verde mientras hay margen, ambar cerca del limite, rojo si se paso
  colorAvance(porcentaje: number): string {
    if (porcentaje <= 80) return '#7cd67f';
    if (porcentaje <= 100) return '#ffd54f';
    return '#ff8a80';
  }

  ngOnInit(): void {
    // Evitamos llamar al backend y a localStorage durante el prerender SSR
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.cargarDia();
    // El padre arma el dia de sus hijos; el doctor/admin puede elegir cualquiera
    const esPadre = this.loginService.showRole() === 'PADRE';
    const peticion = esPadre ? this.hS.misHijos() : this.hS.list();
    peticion.subscribe({
      next: (data) => {
        this.hijos.set(data);
        if (data.length > 0) {
          this.hijoSeleccionado.set(data[0]);
          this.cargarDia();
        }
      },
      error: () => this.hijos.set([]),
    });
  }

  cambiarHijo(idHijo: number) {
    const hijo = this.hijos().find((h) => h.idHijo === idHijo) ?? null;
    this.hijoSeleccionado.set(hijo);
    this.cargarDia();
  }

  edad(fechanacimiento: Date | string): number {
    const nacimiento = new Date(fechanacimiento);
    const hoy = new Date();
    let anios = hoy.getFullYear() - nacimiento.getFullYear();
    const cumpleEsteAnio = new Date(hoy.getFullYear(), nacimiento.getMonth(), nacimiento.getDate());
    if (hoy < cumpleEsteAnio) {
      anios--;
    }
    return anios;
  }

  // ===== Persistencia del dia (localStorage, por hijo y por fecha) =====

  private claveDia(): string {
    const fecha = new Date().toISOString().slice(0, 10); // yyyy-mm-dd
    const id = this.hijoSeleccionado()?.idHijo ?? 0;
    return `dieta_dia_${id}_${fecha}`;
  }

  private guardarDia() {
    localStorage.setItem(this.claveDia(), JSON.stringify(this.miDia()));
  }

  private cargarDia() {
    const guardado = localStorage.getItem(this.claveDia());
    this.miDia.set(guardado ? JSON.parse(guardado) : []);
  }

  buscar() {
    const q = this.termino().trim();
    if (q.length === 0) {
      return;
    }
    this.terminoBuscado = q;
    this.fuente = undefined; // busqueda nueva: decide Peru o mundo otra vez
    this.pagina.set(0);
    this.consultar(1);
  }

  cambiarPagina(e: PageEvent) {
    this.pagina.set(e.pageIndex);
    this.consultar(e.pageIndex + 1); // la API cuenta las paginas desde 1
  }

  private consultar(paginaApi: number) {
    this.cargando.set(true);
    this.buscado.set(true);
    this.nS.buscar(this.terminoBuscado, paginaApi, this.fuente).subscribe({
      next: (r) => {
        this.resultados.set(r.alimentos);
        this.totalResultados.set(r.total);
        this.fuente = r.fuente;
        this.cargando.set(false);
      },
      error: () => {
        this.resultados.set([]);
        this.totalResultados.set(0);
        this.cargando.set(false);
      },
    });
  }

  agregar(a: Alimento) {
    this.miDia.update((lista) => [...lista, a]);
    this.guardarDia();
  }

  quitar(i: number) {
    this.miDia.update((lista) => lista.filter((_, idx) => idx !== i));
    this.guardarDia();
  }

  vaciar() {
    this.miDia.set([]);
    this.guardarDia();
  }

  colorNutriscore(grado: string): string {
    const mapa: Record<string, string> = {
      a: '#2e7d32',
      b: '#7cb342',
      c: '#fdd835',
      d: '#fb8c00',
      e: '#e53935',
    };
    return mapa[grado] ?? '#9e9e9e';
  }

  // Semaforo nutricional por 100 g (umbrales del etiquetado frontal UK)
  colorAzucar(gramos: number): string {
    if (gramos <= 5) return '#2e7d32';
    if (gramos <= 22.5) return '#f9a825';
    return '#e53935';
  }

  colorGrasa(gramos: number): string {
    if (gramos <= 3) return '#2e7d32';
    if (gramos <= 17.5) return '#f9a825';
    return '#e53935';
  }

  // Ancho de la barra (0-100) relativo a un valor de referencia
  barra(valor: number, referencia: number): number {
    return Math.min(Math.round((valor / referencia) * 100), 100);
  }
}
