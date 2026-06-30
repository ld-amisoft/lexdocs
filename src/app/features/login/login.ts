import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Session } from '../../shared/session';
import { ROLES, roleRoutes } from '../../shared/mock-data';

// ponytail: login simulado. Usuario/contraseña + ClaveÚnica (demo); luego selección de rol.
@Component({
  selector: 'app-login',
  template: `
    <div class="wrap">
      <div class="card login">
        <div class="brand">
          <span class="mark"></span>
          <span class="wm"><b>Lex</b>Docs</span>
        </div>
        <p class="by">by amisoft</p>

        @if (step() === 'auth') {
          <form (submit)="aRol($event)">
            <div class="field"><label>Usuario</label><input name="user" value="admin" /></div>
            <div class="field"><label>Contraseña</label><input name="pass" type="password" value="1234" /></div>
            <button class="btn full" type="submit">Iniciar sesión</button>
          </form>
          <div class="sep"><span>o</span></div>
          <button class="btn full cu" (click)="aRol()">🔑 Ingresar con ClaveÚnica</button>
          <a class="recuperar" href="javascript:void(0)">¿Problemas para ingresar? Mesa de Ayuda</a>
        } @else {
          <p class="hint">Selecciona un rol para acceder</p>
          <div class="field">
            <label>Rol</label>
            <select [value]="rol()" (change)="rol.set($any($event.target).value)">
              @for (r of roles; track r) { <option [value]="r">{{ r }}</option> }
            </select>
          </div>
          <button class="btn full" (click)="ingresar()">Ingresar</button>
          <a class="recuperar" href="javascript:void(0)" (click)="step.set('auth')">← Volver</a>
        }
      </div>
    </div>
  `,
  styles: [`
    .wrap { min-height: 100vh; display: grid; place-items: center; background: var(--page-bg); }
    .login { width: 400px; padding: 40px 36px; display: flex; flex-direction: column; align-items: center; }
    .brand { display: flex; align-items: center; gap: 12px; }
    .mark { width: 40px; height: 40px; border-radius: 11px; background: linear-gradient(135deg, var(--brand-purple), var(--brand-blue) 50%, var(--brand-green)); }
    .wm { font-family: 'Exo'; font-size: 30px; font-weight: 800; color: var(--brand-green); }
    .wm b { color: var(--text); }
    .by { color: var(--text-muted); margin: 4px 0 28px; font-size: 13px; }
    form { width: 100%; display: flex; flex-direction: column; gap: 16px; }
    .field { width: 100%; display: flex; flex-direction: column; gap: 6px; }
    .field label { font-size: 13px; color: var(--text); }
    .field input, .field select { border: 1px solid var(--border); border-radius: 8px; padding: 11px 14px; font-family: inherit; font-size: 14px; width: 100%; background: #fff; }
    .btn.full { justify-content: center; width: 100%; border-radius: 8px; padding: 12px; margin-top: 8px; }
    .btn.cu { background: #0a4ea3; }
    .sep { width: 100%; display: flex; align-items: center; gap: 10px; color: var(--text-muted); font-size: 12px; margin: 16px 0 4px; }
    .sep::before, .sep::after { content: ''; flex: 1; height: 1px; background: var(--border); }
    .hint { color: var(--text-muted); font-size: 13px; text-align: center; margin: 0 0 16px; }
    .recuperar { text-align: center; color: var(--brand-purple); font-size: 13px; margin-top: 16px; }
  `],
})
export class Login {
  private router = inject(Router);
  private session = inject(Session);
  roles = ROLES;
  step = signal<'auth' | 'role'>('auth');
  metodo = signal('Usuario y contraseña');
  rol = signal(ROLES[0]);

  aRol(e?: Event) { e?.preventDefault(); this.step.set('role'); }
  ingresar() {
    this.session.set(this.rol(), this.metodo());
    const first = roleRoutes[this.rol()]?.[0] ?? 'inicio';
    this.router.navigate(['/app', first]);
  }
}
