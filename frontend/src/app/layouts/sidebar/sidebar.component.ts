import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Usuario } from '../../interfaces/usuario';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  usuario: Usuario | null = null;

  constructor(private router: Router, private authservice: AuthService) {}

  ngOnInit() {
    this.usuario = this.authservice.getUser()
  }

    logout() {
      this.authservice.logout();
    }

}
