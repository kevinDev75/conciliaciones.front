import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControlName, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { DialogConfirmComponent } from 'app/dialog-confirm/dialog-confirm.component';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from '../../_services/producto.service';
import { Producto } from '../../_models/producto.model';
import { DatosFacturaAbonos } from '../../_models/documentoabono.model';
import { DocumentoAbonoService } from '../../_services/documentoabono.service';

@Component({
  selector: 'generacionfactura',
  templateUrl: './generacionfactura.component.html',
  styleUrls: ['./generacionfactura.component.scss']
})
export class GeneracionFacturaComponent implements OnInit {
 
  facturaForm: FormGroup;
  ListaProducto: Producto[] = [];
  productoSeleccionado: number = 0; 
  respuesta : string = "";
  mensaje : string = "";
  isRequired : boolean;
  editable: boolean;
ngOnInit(): void {
  this.getListaProducto();

}

constructor(private fb: FormBuilder,
            private dialog: MatDialog,
            private toastr: ToastrService,
            private Productoservice: ProductoService,
            private DocumentoAbonoservice : DocumentoAbonoService,
            private dialogUsuario: MatDialogRef<GeneracionFacturaComponent>,
            @Inject(MAT_DIALOG_DATA) public data: any) {    
              this.facturaForm = this.fb.group({
                productoSeleccionado:  ['', Validators.required],
                numerofacturaGenerado: ['', Validators.required]
              });
            }
  
  getListaProducto() {
    this.Productoservice.listarProductos().subscribe(
        s => { console.log(s); this.ListaProducto = s },
        e => { console.log(e); }); 
  }   

  onSubmit(): void {  

    const datosFacturaAbonos = new DatosFacturaAbonos();
    datosFacturaAbonos.idProducto = this.productoSeleccionado;
    datosFacturaAbonos.usuario = JSON.parse(localStorage.getItem('currentUser')).username;

    this.DocumentoAbonoservice.generarFacturaAbonos(datosFacturaAbonos).subscribe(
      r => { 
        console.log(r);         
        this.respuesta = r;
        //this.facturaForm.patchValue({ numerofacturaGenerado: this.respuesta}); 

        if (this.respuesta != "0" && this.respuesta != "1")
        {
          this.facturaForm.patchValue({ numerofacturaGenerado: this.respuesta}); 
          this.mensaje = "";
        }
        else if (this.respuesta == "0")
        {
          this.mensaje = "El proceso no puede generar la factura porque no existen abonos pendientes.";           
        }
        else 
        {
          this.mensaje = "Hubo error al generar la factura de abonos.";       
        }
      },
      e => { 
          console.log(e); 
        }
    ); 

  };

}
