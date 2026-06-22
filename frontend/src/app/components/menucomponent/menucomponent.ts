import { Component, inject } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Authservice } from '../../services/authservice';

@Component({
  selector: 'app-menucomponent',
  imports: [MatToolbarModule,MatButtonModule,MatIconModule,MatMenuModule,RouterLink,RouterLinkActive],
  templateUrl: './menucomponent.html',
  styleUrl: './menucomponent.css',
})
export class Menucomponent {
  private auth = inject(Authservice);
  private router = inject(Router);

  cerrarSesion(): void {
    this.auth.logout();
    this.router.navigate(['/']);
  }
}
