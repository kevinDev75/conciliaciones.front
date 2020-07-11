import { Component, OnInit, Inject, Injectable} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA, MatDialog} from '@angular/material';

@Component({
  selector: 'app-dialog-error',
  templateUrl: './dialog-error.component.html',
  styleUrls: ['./dialog-error.component.scss']
})
export class DialogErrorComponent implements OnInit {
  constructor(private  dialogRef:  MatDialogRef<DialogErrorComponent>, @Inject(MAT_DIALOG_DATA) public  data:  any) {
  }
  public  closeDialog() {
      this.dialogRef.close();
  }

  ngOnInit() {
  }

}
