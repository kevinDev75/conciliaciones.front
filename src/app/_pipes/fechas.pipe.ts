import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common'; 
@Pipe({
  name: 'fechaPipe'
})
export class FechasPipe implements PipeTransform {
   datePipe = new DatePipe('en-US');
  transform(value: any, args?: any): any {
    return null;
  }

  formatoFecha(fechaString:string){    
    console.log(fechaString.length);
    if(fechaString.length !=8){
      fechaString=this.datePipe.transform(fechaString, 'dd/MM/yyyy');
    }else{    
      fechaString = fechaString.substr(0, 4) + '/' + fechaString.substr(4,2)+ '/' + fechaString.substr(6,7) ;
      fechaString=this.datePipe.transform(fechaString, 'dd/MM/yyyy');
    }
    return fechaString;
  }
}
