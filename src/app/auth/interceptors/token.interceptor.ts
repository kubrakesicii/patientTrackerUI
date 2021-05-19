import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoaderService } from 'src/app/shared-components/services/loader.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService : AuthService, public loaderService : LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: { Authorization: `Bearer ${this.authService.getToken()}` },
    });
    return next.handle(request);
  }

  
  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   request = request.clone({
  //     setHeaders: { Authorization: `Bearer ${this.authService.getToken()}` },
  //   });
  //   this.loaderService.isLoading.next(true);

  //   return next.handle(request).pipe(
  //     finalize(
  //       () => {
  //         this.loaderService.isLoading.next(false);
  //       }
  //     )
  //   );
  // }
}
