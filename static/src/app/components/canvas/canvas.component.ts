import { ViewChild, ElementRef, AfterViewInit, Component, OnInit, OnDestroy } from '@angular/core';

import { CanvasService } from './canvas.service';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss'],
})
export class CanvasComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('canvasContainer')
  canvasContainer!: ElementRef<HTMLCanvasElement>;

  constructor(private canvasService: CanvasService) {}

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    this.canvasService.createCanvas(this.canvasContainer.nativeElement);
  }

  public ngOnDestroy(): void {
    this.canvasService.clearScene();
  }

}
