import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { SockCreatorService } from './sock-creator.service';

@Component({
  selector: 'app-sock-creator',
  templateUrl: './sock-creator.component.html',
  styleUrls: ['./sock-creator.component.scss'],
})
export class SockCreatorComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasContainer')
  canvasContainer: ElementRef<HTMLCanvasElement> | undefined;

  public isNoTepmlate: boolean = true;

  constructor(private sockCreatorService: SockCreatorService) {}

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    if (this.canvasContainer) {
      this.sockCreatorService.createCanvas(this.canvasContainer.nativeElement);
    }
  }

  public async showResultBeforeSave(): Promise<any> {
    const canvas: any = this.canvasContainer?.nativeElement.children[0];
    const blob = await this.sockCreatorService.getBlobFromCanvas(canvas);

    this.sockCreatorService.showConfirmModal(blob);
  }

  public onFileSelected(evt: any): void {
    const fileObject = evt.target.files[0];
    this.isNoTepmlate = false;
    this.sockCreatorService.loadDaeTemplate(fileObject);
  }

  public loadTemplate(fileInput: HTMLElement): void {
    fileInput.click();
  }

  public clearCanvas(): void {
    this.sockCreatorService.clearScene();
    this.isNoTepmlate = true;
  }
}
