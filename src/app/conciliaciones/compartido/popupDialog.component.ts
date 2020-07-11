import { Component, Inject, OnInit } from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './popupDialog.component.html',
  styleUrls: ['./popupDialog.component.scss'],
})
export class DialogControl {
popup
  public tipoDialogo: string ="";
  public ocultarLoad: boolean = true;
  public ocultarConfirmar: boolean = true;
  public ocultarMensaje: boolean = true;
  public bMensajeDefault : boolean= true; 
  public mensajeMostrarConfirmar: string=""; 
  public respuestaOk: string = "Ok";
  public respuestaCancel: string = "Cancel" ;

  public tipoDialogoConfirmar: string = "Confirmar";
  public tipoDialogoLoad: string = "Load";
  public tipoDialogoMensaje: string = "Mensaje";

  public mensajeMostrar: string = "";

  constructor(
    public dialogRef: MatDialogRef<DialogControl>,
    @Inject(MAT_DIALOG_DATA) public data: any)
    {
      this.tipoDialogo = data.tipoDialogo;
      if(data.bMensajeDefault!= undefined && data.bMensajeDefault !=null)
            {
              this.bMensajeDefault =data.bMensajeDefault;
              this.mensajeMostrarConfirmar= data.mensajeMostrarConfirmar
            }
            

      if(this.tipoDialogo == this.tipoDialogoConfirmar)
      {
        this.ocultarConfirmar = false;
        console.log('muestra el mensaje');
        console.log(this.bMensajeDefault);
        //this.bMensajeDefault=false;
      }

      if(this.tipoDialogo == this.tipoDialogoLoad)
      {
        this.ocultarLoad = false;
      }

      if(this.tipoDialogo == this.tipoDialogoMensaje)
      {
        this.mensajeMostrar = data.mensajeDialogo;
        this.ocultarMensaje = false;
      }
    }

  ngOnInit() {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOk(): void
  {
    if(this.data.respuestaOkCancelDialog!=null)
    {
      this.data.respuestaOkCancelDialog = this.respuestaOk;
    }

    this.dialogRef.close(this.data);
  }

  onCancel(): void{

    if(this.data.respuestaOkCancelDialog!=null)
    {
      this.data.respuestaOkCancelDialog = this.respuestaCancel;
    }
    this.dialogRef.close(this.data);
  }

  onAceptar(): void{

    this.dialogRef.close();
  }
}