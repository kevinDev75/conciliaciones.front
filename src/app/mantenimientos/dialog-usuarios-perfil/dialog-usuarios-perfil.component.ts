import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { User, UsuarioPerfil } from '../../_models/user.model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef,
  MatSnackBar, MatDialogConfig, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { DialogUsuarioComponent } from '../dialog-usuario/dialog-usuario.component';
import { PerfilService } from '../../_services/perfil.service';
import { RecursoProceso } from 'app/_models/perfil.model';
import { UserService } from '../../_services/user.service';
import { ToastrService } from 'ngx-toastr';
import { DialogConfirmComponent } from 'app/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-dialog-usuarios-perfil',
  templateUrl: './dialog-usuarios-perfil.component.html',
  styleUrls: ['./dialog-usuarios-perfil.component.scss']
})
export class DialogUsuariosPerfilComponent implements OnInit {

  config: MatDialogConfig = {
    disableClose: false,
    autoFocus: true,
    width: '500px',
    height: '200px'
  };

  loading = true;

  listaUsuario: UsuarioPerfil[];
  displayedColumns = ['codUsuario', 'correoUsuario', 'nombre', 'apellidoPaterno', 'acciones'];
  dataSource = new MatTableDataSource<UsuarioPerfil>(this.listaUsuario);
  idPerfil: number;
  pageSize = 4;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dialog: MatDialog,
              private dialogUsuarioPerfil: MatDialogRef<DialogUsuariosPerfilComponent>,
              private service: PerfilService,
              private userService: UserService,
              private toastr: ToastrService,
              public snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) public data: any) {
                this.idPerfil = data.id;
                this.config.data = {Tipo: 1, Titulo: 'Agregar un nuevo usuario', idPerfil: data.id}
              }

  onDelete(nombreUsuario) {

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {
        message: 'Esta seguro que quiere borrar este registro?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if ( result === true ) {

      const datosRecursoPerfil = new RecursoProceso();
      datosRecursoPerfil.VcUsuario = nombreUsuario;
      datosRecursoPerfil.IdPerfil = this.idPerfil;
      datosRecursoPerfil.VcUsuariocreacion = JSON.parse(localStorage.getItem('currentUser')).username;
      // this..deletePerfil(datosRecursoPerfil)
      this.userService.EliminaUsuarioPerfil(datosRecursoPerfil).subscribe(x => {
        // this.perfilService.getListaPerfiles();
        this.toastr.success('Eliminado Correctamente', 'Mantenimiento de Perfiles');
        this.onConsultarUsuario(this.idPerfil);
      })
    }
    });
  }

  openDialogUsuario() {
    console.log( this.config);
    const dialogRef = this.dialog.open(DialogUsuarioComponent, this.config);

    dialogRef.afterClosed().subscribe(
      val => {
        console.log('openDialogUsuario output:', val);
        this.onConsultarUsuario(this.idPerfil);
        });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.onConsultarUsuario(this.idPerfil);
  }
  close() {
    this.dialogUsuarioPerfil.close();
  }

  onConsultarUsuario(idPerfil: number) {
    console.log(idPerfil);
    this.loading  =  true;
    this.service.ListarUsuarioPerfil(idPerfil).subscribe(
        s => { console.log(s);
                this.listaUsuario = s;
                this.dataSource = new MatTableDataSource<UsuarioPerfil>(this.listaUsuario);
                this.dataSource.paginator = this.paginator;
                console.log(this.dataSource.data);
              },
        e => { console.log(e); });
        this.loading  =  false;
  }
}
