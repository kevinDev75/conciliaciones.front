import { Component, OnInit, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource, MatPaginator, MatDialog} from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import { RecursosPerfilResultado, RecursoProceso } from '../../_models/perfil.model';
import { TipoPerfil } from '../../_models/entidad.model';
import {SelectionModel} from '@angular/cdk/collections';
import { PerfilService } from '../../_services/perfil.service';
import { DialogConfirmComponent } from '../../dialog-confirm/dialog-confirm.component';



@Component({
  selector: 'app-dialog-perfil',
  templateUrl: './dialog-perfil.component.html',
  styleUrls: ['./dialog-perfil.component.scss']
})
export class DialogPerfilComponent implements OnInit {

  model: any = {};
  public mensaje = '';
  listaRecurso: RecursosPerfilResultado[];
  selectedRecurso = '';
  listatipoperfil: TipoPerfil[] = [];
  public idTipoPerfilSeleccionado = 0;
  form: FormGroup;
  titulo: string;
  idPerfil: number;
  loading =  true;
  /** Grillas */
  displayedColumnsRecurso = ['select', 'idRecurso', 'modulo', 'opcion', 'descripcion'];
  dataSourceRecurso = new MatTableDataSource<RecursosPerfilResultado>(this.listaRecurso);
  selectionRecurso = new SelectionModel<RecursosPerfilResultado>(true, []);
  @ViewChild(MatPaginator) paginatorRecurso: MatPaginator;



  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<DialogPerfilComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private service: PerfilService,
              private dialog: MatDialog,
              private toastr: ToastrService) {
                this.titulo = data.Titulo;
                this.listatipoperfil = data.listaTipoPerfil;
                this.idPerfil = data.idPerfil;
                this.form = fb.group({
                  nombrePerfil:  [data.VcNombrePerfil, Validators.required],
                  listatipoperfil: [data.listaTipoPerfil, Validators.required],
                  descripcionPerfil: [data.VcDescripcion, Validators.required]
              });

             }

  ngOnInit() {
    this.onConsultarRecursos(this.idPerfil);
    this.dataSourceRecurso.paginator = this.paginatorRecurso;
  }


    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
    const numSelected = this.selectionRecurso.selected.length;
    const numRows = this.dataSourceRecurso.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    console.log(this.selectionRecurso.hasValue());
    console.log(this.isAllSelected());
    this.isAllSelected() ?
        this.selectionRecurso.clear() :
        this.dataSourceRecurso.data.forEach(row => this.selectionRecurso.select(row));
  }

  onSubmit(): void {

    const dialogConfirm = this.dialog.open(DialogConfirmComponent, {
      data: {
        message: '¿ Está seguro que quiere grabar?'}
    });

    this.mensaje = '';
    dialogConfirm.afterClosed().subscribe(result => {
      console.log(`Dialog result onSubmit: ${result}`);

      if ( result === true ) {
        const datosRecursoPerfil = new RecursoProceso();
        const recursosProceso = this.selectionRecurso.selected;
        datosRecursoPerfil.IdPerfil = this.idPerfil;
        datosRecursoPerfil.IdTipoPerfil = this.idTipoPerfilSeleccionado;
        datosRecursoPerfil.VcNombrePerfil = this.form.get('nombrePerfil').value;
        datosRecursoPerfil.VcDescripcion = this.form.get('descripcionPerfil').value;
        datosRecursoPerfil.VcUsuariocreacion = JSON.parse(localStorage.getItem('currentUser')).username;
        datosRecursoPerfil.IdRecursos = '';
        datosRecursoPerfil.IdRecursos = this.selectedRecurso;
        console.log(datosRecursoPerfil);
          if ( this.idPerfil === 0) {

            for (let i = 0; i < recursosProceso.length; i++) {
              datosRecursoPerfil.IdRecursos += recursosProceso[i]['idRecurso'] + ',';
            }

            this.service.RegistrarPerfil(datosRecursoPerfil).subscribe(
              s => {
                    console.log('Entro RegistrarPerfil');
                    if (s.mensaje) {
                      this.mensaje = s.mensaje;
                      this.toastr.success(this.mensaje, 'Mantenimiento de Perfiles');
                    } else {
                      this.mensaje = 'Hubo un error al crear nuevo perfil';
                      this.toastr.warning(this.mensaje, 'Mantenimiento de Perfiles');
                    }
                    this.dialogRef.close('R');
                },
              e => {
                console.log(e);
                this.toastr.warning('Error al generar nuevo perfil', 'Mantenimiento de Perfiles');
              }
              );
          } else if ( this.idPerfil !== 0 ) {
            this.dataSourceRecurso.data.forEach(row => {

              if ( (row['flag'] === 'S' && this.selectionRecurso.isSelected(row) === false ) ||
                    ( row['flag'] === '' && this.selectionRecurso.isSelected(row) === true )) {
                this.selectedRecurso += row['idRecurso'] + ',';
              }
               console.log(this.selectedRecurso);
            });
            datosRecursoPerfil.IdRecursos = this.selectedRecurso;

            this.service.ActualizarPerfil(datosRecursoPerfil).subscribe(
              s => {
                console.log('Entro ActualizarPerfil');
                    if (s.mensaje) {
                      this.mensaje = s.mensaje;
                      this.toastr.success(this.mensaje, 'Mantenimiento de Perfiles');
                    } else {
                      this.mensaje = 'Hubo un error al realizar la actualización del perfil';
                      this.toastr.warning(this.mensaje, 'Mantenimiento de Perfiles');
                    }
                    this.dialogRef.close('A');
                },
              e => {
                console.log(e);
                this.toastr.warning('Error al actualizar perfil', 'Mantenimiento de Perfiles');
              }
              );
          }
      }
    });
  }

close() {
    this.dialogRef.close();
}

onConsultarRecursos(idPerfil: number) {
  this.loading  =  true;
  this.service.BuscarRecursosPerfil(idPerfil).subscribe(
      s => { console.log(s);
              this.listaRecurso = s;
              this.dataSourceRecurso = new MatTableDataSource<RecursosPerfilResultado>(this.listaRecurso);
              this.dataSourceRecurso.paginator = this.paginatorRecurso;
              console.log(this.dataSourceRecurso.data);
            },
      e => { console.log(e); });
      this.loading  =  false;
}
}
