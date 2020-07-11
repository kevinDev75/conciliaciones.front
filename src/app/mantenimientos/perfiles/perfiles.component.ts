import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material';
import { PerfilService } from '../../_services/perfil.service';
import { TipoPerfil } from '../../_models/entidad.model';
import { PerfilResultado, DatosConsultarPerfil } from '../../_models/perfil.model';
import { DialogPerfilComponent } from '../dialog-perfil/dialog-perfil.component';
import { ListaPerfilesComponent } from '../lista-perfiles/lista-perfiles.component';
@Component({
  selector: 'app-perfiles',
  templateUrl: './perfiles.component.html',
  styleUrls: ['./perfiles.component.scss'],
  providers: [ListaPerfilesComponent]
})
export class PerfilesComponent implements OnInit {
  rows = [];
  count = 0;
  offset = 0;
  limit = 10;
  closeResult: string;
  public listatipoperfil: TipoPerfil[] = [];
  public idTipoPerfilSeleccionado = 0;
  public nombrePerfil = '';
  perfil: PerfilResultado;
  lastCloseResult: string;
  config: MatDialogConfig = {
    disableClose: false,
    autoFocus: true,
    width: '900px',
    height: '700px'
    // data: {VcNombrePerfil: '', VcDescripcion: '', Titulo: 'Registro de un nuevo perfil', listaTipoPerfil: this.listatipoperfil}
  };
  @Input() listaPerfiles: ListaPerfilesComponent;

  constructor(private dialog: MatDialog
              , private perfilService: PerfilService
              , private comp: ListaPerfilesComponent) {

              }

  ngOnInit() {
    this.perfilService.listarTipoPerfil().subscribe(
      s => { console.log(s); this.listatipoperfil = s
        this.config.data = {VcNombrePerfil: '', VcDescripcion: '', Titulo: 'Registro de un nuevo perfil', listaTipoPerfil: s, idPerfil: 0};
      },
      e => { console.log(e); });
    this.perfilService.listarTipoPerfil();

  }

  openDialogNuevoRegistro() {

    const dialogRef = this.dialog.open(DialogPerfilComponent, this.config);

    dialogRef.afterClosed().subscribe(
      val => {
        if ( val === 'R') {
        console.log('entro openDialogNuevoRegistro Dialog output:', val);
        document.getElementById('buscarPerfiles').click();
        }
    }
  );

  }

   limpiarRegistros() {
    this.idTipoPerfilSeleccionado = 0;
    this.nombrePerfil = '';
}

}
