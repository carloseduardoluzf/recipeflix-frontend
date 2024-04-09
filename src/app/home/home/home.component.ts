import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeFormService } from 'src/app/recipe-form/recipe-form/recipe-form.service';
import { Recipe } from 'src/models/Recipe';
import jwt_decode from 'jwt-decode';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  recipes: Recipe[] = [];
  private tokenExpirationTimer: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  currentPage: number = 0;
  pageSize: number = 5;

  constructor(private router: Router, private recipeService: RecipeFormService) {}

  ngOnInit(): void {
    this.getAllRecipes();
    console.log(this.getAllRecipes())
  }

  setSession(authResult: any): void {
    // Armazena o token JWT e a data/hora de expiração no localStorage
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('expires_at', JSON.stringify(authResult.expiresAt));

    // Inicia o temporizador de expiração do token
    this.startTokenExpirationTimer();
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    // Recarregar as receitas com base na página atual e no tamanho da página
    this.getAllRecipes();
  }

  private startTokenExpirationTimer(): void {
    const expiresAtString = localStorage.getItem('expires_at');
    // Obtém a data/hora de expiração do token do localStorage
    if (expiresAtString) {
      const expiresAt = JSON.parse(expiresAtString);
      // Calcula o tempo restante antes da expiração do token em milissegundos
      const expiresIn = new Date(expiresAt).getTime() - new Date().getTime();

      // Configura o temporizador para chamar o método de logout após o tempo de expiração
      this.tokenExpirationTimer = setTimeout(() => {
        this.logout();
      }, expiresIn);
    } else {
      this.logout();
    }
  }

 /* getAllRecipes() {
    this.recipeService.getAllRecipes().subscribe(
      recipes => {
        this.recipes = recipes; // Atribui as receitas retornadas ao array do componente
        console.log(recipes);
      },
      error => {
        console.error('Erro ao obter receitas:', error);
        // Trate o erro de acordo com sua lógica de negócios, por exemplo, exibindo uma mensagem de erro para o usuário
      }
    );
  }*/

  getAllRecipes() {
    this.recipeService.getAllRecipes(this.currentPage, this.pageSize).subscribe(
      recipes => {
        this.recipes = recipes; // Atribui as receitas retornadas ao array do componente
        console.log(recipes);
      },
      error => {
        console.error('Erro ao obter receitas:', error);
        // Trate o erro de acordo com sua lógica de negócios, por exemplo, exibindo uma mensagem de erro para o usuário
      }
    );
  }

  getUserById(): void {
    const userId = this.getUserIdByLocalStorage();
    if (userId) {
      this.recipeService.getUserById(userId)
        .subscribe(
          user => {
            console.log('Usuário obtido com sucesso:', user);
          },
          error => {
            console.error('Erro ao obter usuário:', error);
            // Lidar com o erro, por exemplo, exibindo uma mensagem para o usuário
          }
        );
    }
  }

  getUserIdByLocalStorage(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      return decodedToken.userId;
    }
    return null;
  }

  getToken(): any {
    const token = localStorage.getItem('token'); // Obtém o token do localStorage
    if (token) {
      console.log(token); // Exibe os dados do usuário no console
    } else {
      console.log('Token não encontrado no localStorage');
    }
  }

  logout(): void {
    // Limpa os dados armazenados no localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
    // Para o temporizador de expiração do token
    clearTimeout(this.tokenExpirationTimer);
    // Redireciona o usuário para a página de login
    this.router.navigate(['/login']);
  }
}
