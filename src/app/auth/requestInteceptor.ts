import { Injectable , Injector} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IdentityService } from './identity.service';


@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(public identityService: IdentityService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const loginaccess = '/auth/signup';
        // Exclude interceptor for login request:
        if (req.url.search(loginaccess) === -1) {
            req = req.clone({
                setHeaders: {
                  Authorization: "Bearer " + localStorage.getItem('token')
                }
            });
        }


        return new Observable<HttpEvent<any>>(subscriber => {
            next.handle(req)
                .subscribe((event: HttpEvent<any>) => {
                        if (event instanceof HttpResponse) {
                            subscriber.next(event);
                            subscriber.complete();
                        }
                    },
                    error => {
                        alert("error called" + error.status);
                        if (localStorage.getItem('token') != null && (error.status === 401 || error.status === 200)) {
                            this.logout();
                        }
                        subscriber.error(error);
                    });
        });

    }

    logout() {
        this.identityService.deleteAuthTokens();
    }

  
}