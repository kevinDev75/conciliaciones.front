import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html'
})
export class DialogConfirmComponent  implements OnInit {

  ngOnInit(): void {
  }
  constructor(@Inject(MAT_DIALOG_DATA) public  data:  any) {
  }
}
