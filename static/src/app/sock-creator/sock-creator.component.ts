import { Component } from '@angular/core';

import { CanvasService } from '../components/canvas/canvas.service';
import { SockCreatorService } from './sock-creator.service';

@Component({
  selector: 'app-sock-creator',
  templateUrl: './sock-creator.component.html',
  styleUrls: ['./sock-creator.component.scss'],
})
export class SockCreatorComponent {
  public isNoTepmlate: boolean = true;

  constructor(private sockCreatorService: SockCreatorService, private canvasService: CanvasService) {}

  public async showResultBeforeSave(): Promise<any> {
    const blob = await this.canvasService.getBlobFromCanvas();

    this.sockCreatorService.showConfirmModal(blob);
  }

  public onFileSelected(evt: any): void {
    const fileObject = evt.target.files[0];
    this.isNoTepmlate = false;
    this.canvasService.loadDaeTemplate(fileObject);
  }

  public loadTemplate(fileInput: HTMLElement): void {
    fileInput.click();
  }

  public clearCanvas(): void {
    this.canvasService.clearScene();
    this.isNoTepmlate = true;
  }
}
