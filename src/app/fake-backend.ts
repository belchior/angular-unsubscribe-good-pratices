import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url.endsWith('/users') && request.method === 'GET') {
      const users = [
        { id: 1, username: 'foo' }
      ];
      return Observable.of(new HttpResponse({ status: 200, body: users }));
    }

    if (request.url.endsWith('/products') && request.method === 'GET') {
      const products = [
        { id: 1, name: 'foo', price: 123.45 }
      ];
      return Observable.of(new HttpResponse({ status: 200, body: products }));
    }

    return Observable.of(new HttpResponse({ status: 404, body: 'not found' }));
  }

}

export let fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
