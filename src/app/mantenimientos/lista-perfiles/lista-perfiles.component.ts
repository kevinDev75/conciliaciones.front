import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { PerfilService } from '../../_services/perfil.service';
import { ToastrService } from 'ngx-toastr';
import { PerfilResultado, DatosConsultarPerfil, RecursoProceso } from '../../_models/perfil.model';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogConfig, MatDialog } from '@angular/material';
import 'rxjs/add/observable/of';
import { DialogPerfilComponent } from '../dialog-perfil/dialog-perfil.component';
import { DialogUsuariosPerfilComponent } from '../dialog-usuarios-perfil/dialog-usuarios-perfil.component';
import { ExcelService } from '../../_services/exportexcel.service';
import { TipoPerfil } from 'app/_models/entidad.model';
import { DialogErrorComponent } from '../../dialog-error/dialog-error.component';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-lista-perfiles',
  templateUrl: './lista-perfiles.component.html',
  styleUrls: ['./lista-perfiles.component.scss']
})
export class ListaPerfilesComponent implements OnInit {

    // Grillas
    displayedColumnsPerfil = ['idPerfil', 'tipoPerfil', 'nombrePerfil', 'descripcion', 'fechaCreacion', 'acciones'];

  closeResult: string;
  listaPerfil: PerfilResultado[];
  dataSourcePerfil = new MatTableDataSource<PerfilResultado>(this.listaPerfil);
  dtOptions: DataTables.Settings = {};
  loading =  true;
  pageSize = 0;
  public listatipoperfil: TipoPerfil[] = [];

  config: MatDialogConfig = {
    disableClose: false,
    autoFocus: true,
    width: '900px',
    height: '700px',
    data: {Tipo: 1, Titulo: 'Edición de perfil'}
  };

configUsuarioPerfil: MatDialogConfig = {
  disableClose: false,
  autoFocus: true,
  width: '900px',
  height: '700px'
}


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  tipoDialogoLoad: any;
  // dataSource: any;
  constructor(
    private perfilService: PerfilService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private serviceExporta: ExcelService,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngAfterViewInit() {
    this.dataSourcePerfil.paginator = this.paginator;
    this.dataSourcePerfil.sort = this.sort;
  }



  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };

    console.log('Entro ListaPerfilesComponent');
    const datosConsultarPerfil = new DatosConsultarPerfil();
    datosConsultarPerfil.IdTipoPerfil = 0;
    datosConsultarPerfil.NombrePerfil = '';
    this.listarPerfilesGrilla('', 0);

    this.perfilService.listarTipoPerfil().subscribe(
      s => { console.log(s);
        this.listatipoperfil = s
      },
      e => { console.log(e); });

  }


  showForEdit(idPerfil, nombrePerfil, descripcionPerfil) {
    console.log(idPerfil);
    // tslint:disable-next-line:max-line-length
    this.config.data = {VcNombrePerfil: nombrePerfil, VcDescripcion: descripcionPerfil, Titulo: 'Editar perfil', listaTipoPerfil: this.listatipoperfil, idPerfil: idPerfil};
    const dialogRef = this.dialog.open(DialogPerfilComponent, this.config);
    dialogRef.afterClosed().subscribe(
      val => {
        if ( val === 'A') {
        this.listarPerfilesGrilla('', 0);
        }
      });

  }

  addUser(id: number) {
    // this.employeeService.selectedEmployee = Object.assign({}, emp);;
    this.configUsuarioPerfil.data = {id};
    const dialogRef = this.dialog.open(DialogUsuariosPerfilComponent, this.configUsuarioPerfil);

    dialogRef.afterClosed().subscribe(
      val => {
        this.listarPerfilesGrilla('', 0);
      });
  }

  onDelete(id: number) {

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: {
        message: 'Esta seguro que quiere borrar este registro?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if ( result === true ) {
        const datosRecursoPerfil = new RecursoProceso();
        datosRecursoPerfil.IdPerfil = id;
        datosRecursoPerfil.VcUsuariocreacion = JSON.parse(localStorage.getItem('currentUser')).username;
        this.perfilService.deletePerfil(datosRecursoPerfil)
        .subscribe(x => {
          // this.perfilService.getListaPerfiles();
          this.toastr.success('Eliminado Correctamente', 'Mantenimiento de Perfiles');
          this.listarPerfilesGrilla('', 0);
        })
      }
    });
  }

  listarPerfilesGrilla(nombrePerfil, idTipoPerfilSeleccionado) {
    const datosConsultarPerfil = new DatosConsultarPerfil();
    datosConsultarPerfil.IdTipoPerfil = idTipoPerfilSeleccionado;
    datosConsultarPerfil.NombrePerfil = nombrePerfil;
    console.log(datosConsultarPerfil);
    this.loading = true;
    this.perfilService.BuscarPerfiles(datosConsultarPerfil).subscribe(
      s => {
              console.log(s);
              this.listaPerfil = s;
              this.dataSourcePerfil = new MatTableDataSource<PerfilResultado>(this.listaPerfil);
              this.dataSourcePerfil.paginator = this.paginator;
              console.log(this.dataSourcePerfil.data);
              this.loading  =  false;
      },
      e => {
         console.log(e);
        }
    );
  }

  onExportar() {
          this.serviceExporta.exportAsExcelFile( this.listaPerfil, 'Perfiles');
          this.toastr.success('Se exportó la información', 'Mantenimiento de Perfiles');
}

}
