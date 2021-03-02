import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MeshNormalMaterial, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Collada, ColladaLoader } from 'three/examples/jsm/loaders/ColladaLoader';

import { environment } from 'src/environments/environment';
import { Sock } from '../types/sock.dto';
import { SaveSockModalComponent } from './save-sock-modal/save-sock-modal.component';

@Injectable({
  providedIn: 'root',
})
export class SockCreatorService {
  private renderer = new WebGLRenderer({ antialias: true });
  private camera: PerspectiveCamera = new PerspectiveCamera();
  private daeFile: Blob = new Blob();
  private controls: OrbitControls | undefined;
  private scene = new Scene();

  constructor(private http: HttpClient, public dialog: MatDialog) {}

  public createCanvas(canvasContainer: HTMLElement): void {
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

  public getBlobFromCanvas(canvas: HTMLCanvasElement): Promise<Blob> {
    return new Promise((responce: any) => {
      this.controls?.update();
      this.renderer.render(this.scene, this.camera);

      canvas.toBlob(responce);
    });
  }

  public showConfirmModal(blob: Blob) {
    this.dialog
      .open(SaveSockModalComponent, { data: { blob } })
      .afterClosed()
      .subscribe(this.saveIfConfirm.bind(this));
  }

  private animation(time: number): void {
    this.controls?.update();
    this.renderer.render(this.scene, this.camera);
  }

  private saveIfConfirm(sock: Sock) {
    if (sock) {
      this.save(sock);
    }
  }

  private save(sock: Sock): void {
    const formData = new FormData();

    formData.append('screenshot', sock.screenshot);
    formData.append('daeFile', this.daeFile);
    formData.append('name', sock.name);
    this.saveSock(formData).subscribe(console.log);
  }

  public saveSock(formData: FormData): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiUrl}/sock-creator/save`, formData);
  }
}
