import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service'; 

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  public sidenavAbierto = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      this.sidenavAbierto = false;
    });
  }

  logout(){
    localStorage.removeItem('currentUser');
    this.authService.isLoggedIn = false;
    window.location.replace('/login');
  }
}
