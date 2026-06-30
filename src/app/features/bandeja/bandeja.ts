import { Component, computed, signal } from '@angular/core';

interface Item { tipo: string; titulo: string; detalle: string; cuando: string; prioridad: string; }

@Component({
  selector: 'app-bandeja',
  template: `
    <section class="hero">
      <h2>Bandeja de Entrada</h2>
      <p>Centro de control unificado · {{ items.length }} pendientes totales</p>
    </section>

    <div class="card panel">
      <div class="pills">
        @for (f of filtros; track f) {
          <button class="pill" [class.active]="f === filtro()" (click)="filtro.set(f)">
            {{ f }} <b>{{ contar(f) }}</b>
          </button>
        }
      </div>

      <div class="lista">
        @for (it of visibles(); track it.titulo) {
          <div class="item" [class.alta]="it.prioridad === 'Alta'">
            <div class="left">
              <div class="row1"><b>{{ it.titulo }}</b> <span class="badge badge-green">Novedad</span> <small class="muted">{{ it.cuando }}</small></div>
              <div class="muted">{{ it.detalle }}</div>
            </div>
            <div class="acts">
              <button class="btn btn-green btn-sm">Gestionar →</button>
              <button class="btn btn-ghost btn-sm">Leído</button>
            </div>
          </div>
        }
        @if (!visibles().length) { <div class="placeholder">Sin pendientes en esta categoría.</div> }
      </div>
    </div>
  `,
  styles: [`
    .lista { margin-top: 18px; display: flex; flex-direction: column; gap: 12px; }
    .item { display: flex; justify-content: space-between; align-items: center; gap: 16px; border: 1px solid var(--border); border-left: 4px solid var(--brand-green); border-radius: 10px; padding: 14px 16px; }
    .item.alta { border-left-color: #e11d48; }
    .row1 { display: flex; align-items: center; gap: 10px; margin-bottom: 4px; }
    .acts { display: flex; gap: 8px; flex-shrink: 0; }
  `],
})
export class Bandeja {
  filtros = ['Todas', 'Plazos', 'Tareas', 'Movimientos', 'Colaboración'];
  filtro = signal('Todas');

  items: Item[] = [
    { tipo: 'Movimientos', titulo: 'Movimiento en expediente', detalle: 'Se registró un nuevo movimiento en 2026-00094-S-000001.', cuando: 'hace 1 hora', prioridad: 'Media' },
    { tipo: 'Plazos', titulo: 'Plazo fatal próximo', detalle: 'Vence el plazo de revisión del expediente 2026-00088-S-000014 en 24 horas.', cuando: 'hace 2 horas', prioridad: 'Alta' },
    { tipo: 'Tareas', titulo: 'Nueva tarea asignada', detalle: 'Se te asignó la calificación de la solicitud 2026-00075-S-000007.', cuando: 'hace 3 horas', prioridad: 'Media' },
    { tipo: 'Colaboración', titulo: 'Nuevo participante', detalle: 'Has sido incorporado como participante en 2026-00071-S-000022.', cuando: 'hace 5 horas', prioridad: 'Baja' },
    { tipo: 'Movimientos', titulo: 'Documento derivado', detalle: 'Se derivó un documento a tu bandeja desde Oficina de Partes.', cuando: 'ayer', prioridad: 'Media' },
    { tipo: 'Plazos', titulo: 'Vencimiento de notificación', detalle: 'La notificación del expediente 2026-00060-S-000019 vence mañana.', cuando: 'ayer', prioridad: 'Alta' },
  ];

  visibles = computed(() => this.filtro() === 'Todas' ? this.items : this.items.filter(i => i.tipo === this.filtro()));
  contar(f: string) { return f === 'Todas' ? this.items.length : this.items.filter(i => i.tipo === f).length; }
}
