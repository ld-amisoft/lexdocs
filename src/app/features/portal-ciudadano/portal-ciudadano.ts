import { Component } from '@angular/core';
import { DataTable } from '../../shared/data-table';
import { ciudadanoSolicitudes, expedienteColumns } from '../../shared/mock-data';

// Vista del rol ciudadano: menús reducidos y solo sus propias solicitudes.
@Component({
  selector: 'app-portal-ciudadano',
  imports: [DataTable],
  template: `
    <section class="hero" style="background:linear-gradient(110deg,#410367,var(--brand-purple))">
      <h2>Portal Ciudadano</h2>
      <p>Consulta el estado de tus solicitudes en línea.</p>
    </section>

    <div class="grid grid-3" style="margin-bottom:18px">
      <div class="card action-card">
        <div style="font-size:22px">📝</div><div class="name" style="font-weight:700">Nueva solicitud</div>
        <div class="muted">Inicia un trámite completando el formulario.</div>
        <a class="link-arrow" href="javascript:void(0)">Iniciar →</a>
      </div>
      <div class="card action-card green">
        <div style="font-size:22px">🔍</div><div class="name" style="font-weight:700">Consultar estado</div>
        <div class="muted">Revisa etapas y documentos de tus solicitudes.</div>
        <a class="link-arrow" href="javascript:void(0)">Ver mis solicitudes →</a>
      </div>
      <div class="card action-card orange">
        <div style="font-size:22px">📥</div><div class="name" style="font-weight:700">Subir documento</div>
        <div class="muted">Adjunta antecedentes a una solicitud en curso.</div>
        <a class="link-arrow" href="javascript:void(0)">Subir archivo →</a>
      </div>
    </div>

    <div class="card">
      <div class="panel"><b>Mis solicitudes</b></div>
      <app-data-table [columns]="cols" [rows]="rows" />
    </div>
  `,
})
export class PortalCiudadano {
  cols = expedienteColumns;
  rows = ciudadanoSolicitudes;
}
