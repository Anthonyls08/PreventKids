import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Loginservice } from '../../services/loginservice';

@Component({
  selector: 'app-menucomponent',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, RouterLink, RouterLinkActive],
  templateUrl: './menucomponent.html',
  styleUrl: './menucomponent.css',
})
export class Menucomponent {
  role: string = '';

  constructor(private loginService: Loginservice, private router: Router) { }

  cerrarSesion(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  verificar(): boolean {

    const existe = this.loginService.verificar();

    if (existe) {
      this.role = this.loginService.showRole() ?? '';
    }

    return existe;
  }

  isAdmin() {
    return this.role === 'ADMIN';
  }

  isDoctor() {
    return this.role === 'DOCTOR';
  }

  isPadre() {
    return this.role === 'PADRE';
  }
}
