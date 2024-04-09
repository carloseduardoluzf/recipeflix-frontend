import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/User';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  loading: boolean = false;
  loginForm: FormGroup;
  successMessage: boolean = false;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
      
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }
  
    setTimeout(() => {
      this.loading = true;
  
      this.user.username = this.loginForm.value.username;
      this.user.password = this.loginForm.value.password;
  
      this.loginService.login(this.user).subscribe(
        response => {
          console.log('Usuário autenticado com sucesso:', response);
          localStorage.setItem('token', response.token)
          setTimeout(() => {
            this.loading = false; 
            this.successMessage = true;
            this.router.navigate(['/home']);
          }, 2000);
         
        },
        error => {
          console.error('Erro ao autenticar usuário:', error);
          this.loading = false;
        }
      );
    }, 350);
  }

  
}

