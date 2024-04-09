import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/models/User';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }
  private baseUrl: string = 'http://localhost:8080/login'; 

  login(user: User): Observable<any> { // Defina o tipo de retorno como Observable<any>
    return this.httpClient.post<any>(`${this.baseUrl}`, { username: user.username, password: user.password });
  }

}
