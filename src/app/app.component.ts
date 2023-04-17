import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ServicioTransporte';
  constructor(private authService: AuthService) { }
  ngOnInit() {
    const currentUser = localStorage.getItem('currentUser');
    this.authService.isLoggedIn = currentUser !== null;
  }

}
