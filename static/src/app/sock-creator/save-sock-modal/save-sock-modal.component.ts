import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-save-sock-modal',
  templateUrl: './save-sock-modal.component.html',
  styleUrls: ['./save-sock-modal.component.scss'],
})
export class SaveSockModalComponent {
  public imageSrc: string = '';
  public name: string = '';

  constructor(public dialogRef: MatDialogRef<SaveSockModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.loadImage(data.blob);
  }

  public save(): void {
    this.dialogRef.close({
      name: this.name,
      screenshot: this.data.blob,
    });
  }

  public close(): void {
    this.dialogRef.close();
  }

  public loadImage(blob: Blob): void {
    const reader = new FileReader();
    reader.readAsDataURL(blob);

    reader.onload = () => {
      this.imageSrc = reader.result as string;
    };
  }
}
