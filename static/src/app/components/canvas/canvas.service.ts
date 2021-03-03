import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MeshNormalMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
  public canvas!: HTMLCanvasElement;
  private renderer = new WebGLRenderer({ antialias: true });
  private camera: PerspectiveCamera = new PerspectiveCamera();
  private daeFile!: Blob;
  private controls!: OrbitControls;
  private scene = new Scene();

  constructor(public dialog: MatDialog) {}

  public createCanvas(canvasContainer: HTMLCanvasElement): void {
    this.canvas = canvasContainer;
    this.camera.position.z = 3;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setAnimationLoop(this.animation.bind(this));
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    canvasContainer.appendChild(this.renderer.domElement);
  }

  public loadDaeTemplate(fileObject: any) {
    const reader = new FileReader();

    reader.onload = this.readDaeFile.bind(this);
    reader.readAsText(fileObject);
  }

  private readDaeFile(file: ProgressEvent<FileReader>) {
    const element = document.createElement('a');
    const dataInBase64 = 'data:text/xml;charset=UTF-8,' + encodeURIComponent(file.target?.result as string);
    element.setAttribute('href', dataInBase64);

    this.setDaeFile(dataInBase64);

    const loader = new ColladaLoader();
    loader.load(element.href, (collada: any) => {
      this.camera.position.z = 2;
      this.camera.position.y = 0;
      this.camera.position.x = 0;

      collada.scene.children[0].position.set(0, 0, 0);
      collada.scene.children[0].material = new MeshNormalMaterial();
      collada.scene.position.set(0, 0, 0);

      this.scene.add(collada.scene);
    });
  }

  private setDaeFile(dataInBase64: string): void {
    const blobPart = this.createBlobPart(dataInBase64);
    this.daeFile = new Blob([blobPart], { type: 'text/xml' });
  }

  private createBlobPart(text: string): Uint8Array {
    const byteNumbers = new Array(text.length);

    for (let i = 0; i < text.length; i++) {
      byteNumbers[i] = text.charCodeAt(i);
    }

    return new Uint8Array(byteNumbers);
  }

  public clearScene(): void {
    this.scene.clear();
  }

  public getBlobFromCanvas(): Promise<Blob> {
    const canvas: any = this.canvas.children[0];

    return new Promise((responce: any) => {
      this.controls?.update();
      this.renderer.render(this.scene, this.camera);

      canvas.toBlob(responce);
    });
  }

  public getDaeFile(): Blob {
    return this.daeFile;
  }

  private animation(time: number): void {
    this.controls?.update();
    this.renderer.render(this.scene, this.camera);
  }
}
