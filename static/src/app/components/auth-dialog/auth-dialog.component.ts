import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss'],
})
export class AuthDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AuthDialogComponent>) {}

  ngOnInit(): void {}

  public close(): void {
    this.dialogRef.close();
  }
}
