import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import * as alertify from 'alertifyjs'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  users: any[] = [];
  miFormulario: FormGroup = this.fb.group({
    email:    ['aaron-alvare@hotmail.com', [Validators.required, Validators.email]],
    password: ['12345', [Validators.required, Validators.minLength(5)]]
  });

  constructor( private fb: FormBuilder, private router: Router, 
    private authService: AuthService, private http: HttpClient) { 
      this.http.get('../../../assets/users.json').subscribe((data: any) => {
        this.users = data.users;
      });
    }

  ngOnInit(): void {
  }

  onSubmit(){}

  login(){
    console.log(this.users);
    const { email, password } = this.miFormulario.value;
    const user = this.users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.authService.isLoggedIn = true;
      window.location.replace('/conductores');
    } else {
      alertify.error('Credenciales incorrectas');
    }
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.authService.isLoggedIn = false;
    window.location.replace('/login');
  }
  
}
