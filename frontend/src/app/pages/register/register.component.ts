import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {nombre: '', email: '', password: '', confirmPassword: '' };

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    if (this.user.password !== this.user.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    this.auth.register(this.user).subscribe({
      next: (res: any) => {
        this.router.navigate(['/login']);
      },
      error: err => alert('Error al registrar, intenta de nuevo')
    });
  }
}
