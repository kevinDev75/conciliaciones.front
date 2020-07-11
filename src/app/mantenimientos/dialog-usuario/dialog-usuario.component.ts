import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { RecursoProceso } from '../../_models/perfil.model';
import { UserService } from '../../_services/user.service';
import { DialogConfirmComponent } from 'app/dialog-confirm/dialog-confirm.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog-usuario',
  templateUrl: './dialog-usuario.component.html',
  styleUrls: ['./dialog-usuario.component.scss']
})
export class DialogUsuarioComponent implements OnInit {
  public mensaje = '';
  form: FormGroup;
  idPerfil: number;
  ngOnInit(): void {

  }




  constructor(private fb: FormBuilder,
    private service: UserService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private dialogUsuario: MatDialogRef<DialogUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.idPerfil = data.idPerfil;
      this.form = fb.group({
        nombreUsuario:  ['', Validators.required],
      });
    }

    onSubmit(): void {
      console.log(this.idPerfil);
      const id = this.idPerfil;
      const datosRecursoPerfil = new RecursoProceso();
      datosRecursoPerfil.IdPerfil = id;
      datosRecursoPerfil.VcUsuario = this.form.get('nombreUsuario').value;
      datosRecursoPerfil.VcUsuariocreacion = JSON.parse(localStorage.getItem('currentUser')).username;
      const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {
        message: 'Esta seguro que quiere agregar este usuario?'}
      });
      dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if ( result === true ) {
            this.service.AgregaUsuarioPerfil(datosRecursoPerfil).subscribe(
              s => {
                    console.log(s);
                      this.mensaje = s.result;
                      this.toastr.success('Asociado Correctamente', 'Mantenimiento de Perfiles');
                      this.dialogUsuario.close();
                },
              e => {
                console.log(e);
                this.toastr.error('El usuario no existe', 'Mantenimiento de Perfiles');
              }
              );
      }
    });
  }
  
}
