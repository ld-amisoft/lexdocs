import { Component, computed, signal } from '@angular/core';
import { DataTable } from '../../shared/data-table';
import { documentosPorFirmar, firmaColumns } from '../../shared/mock-data';

@Component({
  selector: 'app-firma',
  imports: [DataTable],
  template: `
    <h1 class="page-title">Bandeja de firmas</h1>

    <div class="segs">
      @for (s of segmentos; track s.key) {
        <button class="seg" [class.active]="s.key === seg()" (click)="seg.set(s.key)">
          {{ s.label }} <span class="cnt">{{ s.count }}</span>
        </button>
      }
    </div>

    <div class="card panel">
      <p class="muted refresh">La vista se actualiza automáticamente cada 15 segundos…</p>
      <div class="filters">
        <div class="field"><label>Materia</label><input [value]="materia()" (input)="materia.set($any($event.target).value)" placeholder="Buscar por materia…" /></div>
        <div class="field"><label>Tipo de documento</label><select [value]="tipo()" (change)="tipo.set($any($event.target).value)"><option>Todos</option><option>Adjunto</option><option>Resolución</option><option>Antecedente</option></select></div>
        <button class="btn btn-ghost" (click)="limpiar()">Limpiar</button>
        <button class="btn">🔍 Buscar</button>
        <div class="spacer"></div>
        <button class="btn btn-outline">✒️ Firmar selección</button>
        <button class="btn">✒️ Firmar todo</button>
      </div>
    </div>

    <div class="card" style="margin-top:18px">
      <app-data-table [columns]="cols" [rows]="filtrados()" [menu]="['Ver detalle', 'Firmar', 'Enviar a numeración manual', 'Rechazar']" />
      <div class="pagination"><span>« Anterior</span><span class="active">1</span><span>2</span><span>3</span><span>4</span><span>Siguiente »</span></div>
    </div>
  `,
  styles: [`
    .segs { display: flex; gap: 14px; margin-bottom: 18px; }
    .seg { flex: 1; border: 1px solid var(--border); background: #fff; border-radius: 999px; padding: 14px 20px; font-weight: 700; font-size: 13px; color: var(--text-muted); display: flex; align-items: center; justify-content: center; gap: 10px; text-transform: uppercase; }
    .seg.active { background: var(--brand-primary); color: #fff; border-color: var(--brand-primary); }
    .seg .cnt { background: rgba(0,0,0,.12); border-radius: 999px; padding: 1px 9px; font-size: 12px; }
    .seg.active .cnt { background: rgba(255,255,255,.25); }
    .refresh { font-size: 12px; margin: 0 0 14px; }
    .filters { align-items: flex-end; }
    .spacer { flex: 1; }
  `],
})
export class Firma {
  cols = firmaColumns;
  segmentos = [
    { key: 'porfirmar', label: 'Documentos por firmar', count: 28 },
    { key: 'procesados', label: 'Procesados', count: 22 },
    { key: 'firmados', label: 'Firmados', count: 45 },
  ];
  seg = signal('porfirmar');
  materia = signal('');
  tipo = signal('Todos');

  filtrados = computed(() => {
    const m = this.materia().toLowerCase().trim();
    return documentosPorFirmar.filter(d => {
      const est = d.estado.toLowerCase();
      const okSeg = this.seg() === 'porfirmar' ? /pendiente|fallido/.test(est)
        : this.seg() === 'procesados' ? est.includes('proces')
        : est.includes('firmad');
      return okSeg
        && (this.tipo() === 'Todos' || d.tipoDoc === this.tipo())
        && (!m || d.materia.toLowerCase().includes(m));
    });
  });
  limpiar() { this.materia.set(''); this.tipo.set('Todos'); }
}
