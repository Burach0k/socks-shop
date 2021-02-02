import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = req.clone();

    return next.handle(authReq).pipe(
      tap(
        (err) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 401)
                this.router.navigate(['/login']);
          }
        }
      )
    )
  }
}