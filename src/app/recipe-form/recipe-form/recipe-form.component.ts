import { Component, OnInit } from '@angular/core';
import { RecipeFormService } from './recipe-form.service';
import { Recipe } from 'src/models/Recipe';
import jwt_decode from 'jwt-decode';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css']
})
export class RecipeFormComponent implements OnInit {

  recipe: Recipe = new Recipe();
  currentUser: string | null = localStorage.getItem('token');
  recipeForm: FormGroup;
  loading: boolean = false;
  successMessage: boolean = false;
  
  constructor(private recipeService: RecipeFormService,private formBuilder: FormBuilder, private router: Router) { 
    this.recipeForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      instructions: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getUserById();
  }

  getUserIdByLocalStorage(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token);
      return decodedToken.userId;
    }
    return null;
  }
  
  goBack(): void {
    this.router.navigate(['/home']);
  }
  
  getUserById(): void {
    const userId = this.getUserIdByLocalStorage();
    if (userId) {
      this.recipeService.getUserById(userId)
        .subscribe(
          user => {
            console.log('Usuário obtido com sucesso:', user);
            // Defina o nome do autor da receita
            this.recipe.authorName = user.authorName;
            console.log(user)
          },
          error => {
            console.error('Erro ao obter usuário:', error);
            // Lidar com o erro, por exemplo, exibindo uma mensagem para o usuário
          }
        );
    }
  }

  createRecipe(): void {

    this.recipeService.createRecipe(this.recipe).subscribe(
        response => {
          console.log('Receita criada com sucesso:', response);
          this.successMessage = true;
         },
        error => {
          console.error('Erro ao criar receita:', error);
          // Lidar com o erro, por exemplo, exibindo uma mensagem para o usuário
        }
      );
  }

}
