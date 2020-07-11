import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'app/_services/authentication.service';
import { AlertService } from 'app/_services/alert.service';
import { NgForm } from '@angular/forms';
import { User } from '../../_models/user.model';
import { UserService } from '../../_services/user.service';
import { DialogErrorComponent } from '../../dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: string;


    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private userService: UserService,
        private alertService: AlertService,
        private dialog: MatDialog) { }

        ngOnInit() {
          // reset login status
          this.authenticationService.logout();

          // get return url from route parameters or default to '/'
          this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
      }

      login() {
          this.loading = true;
          this.authenticationService.login(this.model.username, this.model.password)
              .subscribe(
                  data => {
                        this.userService.recursos(this.model.username)
                        .subscribe(
                            () => {
                                this.router.navigate([this.returnUrl]);
                            },
                            error => {
                              console.log('Error');
                            });
                  },
                  error => {
                      this.dialog.open(DialogErrorComponent, { data: {
                          message: 'Usuario y/o contraseña incorrectos'
                      }});
                  });


      }
      limpiarRegistros() {
            this.model.username = '';
            this.model.password = '';
      }

      resetForm(loginForm?: NgForm) {
        if (loginForm != null) {
        loginForm.reset();
        }
          this.userService.selectedUser = new User();
      }

}
