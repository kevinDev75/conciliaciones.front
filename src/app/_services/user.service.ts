import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { AppConfig } from '../app.config';
import { User } from 'app/_models/user.model';
import { Menu } from '../shared/menu-items/menu-items';

import 'rxjs/add/operator/map'
import { RecursoProceso } from '../_models/perfil.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private apiUrlAgregaUsuarioPerfil = this.config.apiUrl + '/api/Users/AgregaUsuarioPerfil';
    private apiUrlEliminaUsuarioPerfil = this.config.apiUrl + '/api/Users/EliminaUsuarioPerfil';
    private headers = new Headers({ 'Content-Type': 'application/json' });
    selectedUser: User = new User();
  constructor(private http: Http, private config: AppConfig) { }



  getAll() {
      return this.http.get(this.config.apiUrl + '/api/users', this.jwt()).map((response: Response) => response.json());
  }

  getById(id: number) {
      return this.http.get(this.config.apiUrl + '/api/users/' + id, this.jwt()).map((response: Response) => response.json());
  }

  create(user: User) {
      return this.http.post(this.config.apiUrl + '/api/users', user, this.jwt());
  }

  update(user: User) {
      return this.http.put(this.config.apiUrl + '/api/users/' + user.id, user, this.jwt());
  }

  delete(id: number) {
      return this.http.delete(this.config.apiUrl + '/api/users/' + id, this.jwt());
  }

  recursos(username: string) {

    return this.http.post(this.config.apiUrl + '/api/users/recursos', { username: username, password: '123' })
    .map((response: Response) => {
        // login successful if there's a jwt token in the response
        const recursos = response.json();
        if (recursos && recursos.menu) {
            localStorage.setItem('menuRecursos', JSON.stringify(recursos.menu));
        }
    });
  }

  AgregaUsuarioPerfil(recursoProceso: RecursoProceso) {
    return this.http.post(this.apiUrlAgregaUsuarioPerfil, JSON.stringify(recursoProceso), { headers: this.headers }).map(res => res.json());
  }

  EliminaUsuarioPerfil(recursoProceso: RecursoProceso) {
    // tslint:disable-next-line:max-line-length
    return this.http.post(this.apiUrlEliminaUsuarioPerfil, JSON.stringify(recursoProceso), { headers: this.headers }).map(res => res.json());
  }
  // private helper methods

  private jwt() {
      // create authorization header with jwt token
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.token) {
          const headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
          return new RequestOptions({ headers: headers });
      }
  }
}
