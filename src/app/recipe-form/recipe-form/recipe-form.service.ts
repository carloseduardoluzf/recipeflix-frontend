import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Recipe } from 'src/models/Recipe';
import { User } from 'src/models/User';
import { catchError } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class RecipeFormService {

  private baseUrl = 'http://localhost:8080/recipe';

  private apiUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) { }

  createRecipe(recipe: Recipe): Observable<Recipe> {
    // Obtém o token JWT do armazenamento local
    const token = localStorage.getItem('token');
    
    // Verifica se o token está presente
    if (token) {
      // Adiciona o token ao cabeçalho Authorization
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      });
      console.log(JSON.stringify(headers));
      // Faz a requisição com o cabeçalho contendo o token
      return this.http.post<Recipe>(`${this.baseUrl}/add`, recipe, { headers })
        .pipe(
          catchError(error => {
            // Se ocorrer um erro na requisição, trata o erro aqui
            console.error('Erro ao criar receita:', error);
            return throwError(error); // Reenvia o erro para o observador
          })
        );
    } else {
      // Se o token não estiver presente, emite um erro
      const errorMessage = 'Token JWT não encontrado';
      console.error(errorMessage);
      return throwError(errorMessage);
    }
  }


  



  getUserById(userId: number): Observable<User> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<User>(url);
  }

  getAllRecipes(page: number, pageSize: number): Observable<Recipe[]> {
    const token = localStorage.getItem('token');
    
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      return this.http.get<Recipe[]>(`${this.baseUrl}/all?page=${page}&pageSize=${pageSize}`, { headers })
        .pipe(
          catchError(error => {
            console.error('Erro ao obter todas as receitas:', error);
            return throwError(error);
          })
        );
    } else {
      const errorMessage = 'Token JWT não encontrado';
      console.error(errorMessage);
      return throwError(errorMessage);
    }
  }

  getAllRecipess(page: number, pageSize: number) {
    // Ajuste o endpoint do backend para aceitar os parâmetros de paginação
    return this.http.get<Recipe[]>(`/recipe/all?page=${page}&pageSize=${pageSize}`);
  }
}
