import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AppConfig } from 'app/app.config';
import 'rxjs/add/operator/map'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: Http, private config: AppConfig) { }

  login(username: string, password: string) {
    return this.http.post(this.config.apiUrl + '/api/users/authenticate', { username: username, password: password })
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            const user = response.json();
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
        });
}

logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('menuRecursos');
}
}
