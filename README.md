# Boas práticas para _unsubscribe_

_Unsubscribe_ é um tema importante que deve ser pensando quando são desenvolvidas aplicações grandes e escaláveis. Sua utilização é abrangente em projetos Angular e existe diversas abordagens para lidar com os _Observables_ abaixo está listada as mais populares e consolidadas pela comunidade.

Alguns autores [7][8] advogam que não é necessário desligar _Observables_ criados pelo _HttpClient_ dado que esta tarefa é feita automaticamente pelo Angular, entretanto não é explicado "como" e não possuem referências oficiais.

Até a data da confecção deste material não há um posicionamento oficial do time do Angular sobre o assunto e considerando que desligar _Observables_ não compromete a estabilidade ou a performance de aplicações Angular o que predomina é a boa prática do rxjs de desligar os _Observables_.


### Desligando _Observables_ com `first`
```js
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-first',
  template: '<section><h1>First</h1><div>{{ users | json }}</div></section>'
})
export class FirstComponent implements OnInit {
  constructor(private http: HttpClient) { }
  public users: any;

  getUsers(): Observable<any> {
    return this.http.get('/users');
  }

  ngOnInit() {
    this.getUsers().pipe(first()).subscribe(users => this.users = users);
  }

}
```


### Desligando _Observables_ com `takeWhile`
```js
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-takewhile',
  template: '<section><h1>takeUntil</h1><div>{{ users | json }}</div></section>'
})
export class TakewhileComponent implements OnInit {
  constructor(private http: HttpClient) { }
  public users: any;
  private alive = true;

  getUsers(): Observable<any> {
    return this.http.get('/users');
  }

  ngOnInit() {
    const predicate = () => this.alive;
    this.getUsers().pipe(takeWhile(predicate)).subscribe(users => this.users = users);
  }

  ngOnDestroy() {
    this.alive = false;
  }

}
```


### Desligando _Observables_ com `takeUntil`
```js
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-takeuntil',
  template: '<section><h1>takeUntil</h1><div>{{ users | json }}</div></section>'
})
export class TakeuntilComponent implements OnInit {
  constructor(private http: HttpClient) { }
  public users: any;
  private unsubscribe = new Subject();

  getUsers(): Observable<any> {
    return this.http.get('/users');
  }

  ngOnInit() {
    this.getUsers().pipe(takeUntil(this.unsubscribe)).subscribe(users => this.users = users);
  }

  ngOnDestroy() {
    this.unsubscribe.next();
  }

}
```


### Desligando _Observables_ com `unsubscribe`
```js
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-unsubscribe',
  template: '<section><h1>unsubscribe</h1><div>{{ users | json }}</div><div>{{ products | json }}</div></section>'
})
export class UnsubscribeComponent {
  constructor(private http: HttpClient) { }
  public users: any;
  public products: any;
  private subscriptions = [];

  getUsers(): Observable<any> {
    return this.http.get('/users');
  }

  getProducts(): Observable<any> {
    return this.http.get('/products');
  }

  ngOnInit() {
    const usersSubscription = this.getUsers().subscribe(users => this.users = users);
    const productsSubscription = this.getProducts().subscribe(products => this.products = products);

    this.subscriptions.push(usersSubscription, productsSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
```


## Referências

[1] RxJS first - https://rxjs-dev.firebaseapp.com/api/operators/first

[2] RxJS takeWhile - https://rxjs-dev.firebaseapp.com/api/operators/takeWhile

[3] RxJS takeUntil - https://rxjs-dev.firebaseapp.com/api/operators/takeUntil

[4] RxJS Subscription - https://rxjs-dev.firebaseapp.com/api/index/class/Subscription

[5] Angular: Don't forget to unsubscribe() - https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

[6] RxJS: Don’t Unsubscribe - https://medium.com/@benlesh/rxjs-dont-unsubscribe-6753ed4fda87

[7] When to Unsubscribe in Angular - https://netbasal.com/when-to-unsubscribe-in-angular-d61c6b21bad3

[8] Remember to unsubscribe() from streams in your Angular components- https://medium.com/@maciekprzybylski/remember-to-unsubscribe-from-streams-in-your-angular-components-caf0bedd6ac2

[9] RxJS: Avoiding takeUntil Leaks - https://blog.angularindepth.com/rxjs-avoiding-takeuntil-leaks-fb5182d047ef

[10] Why It’s Important to Unsubscribe from RxJS Subscription - https://netbasal.com/why-its-important-to-unsubscribe-from-rxjs-subscription-a7a6455d6a02

[11] Podcast: RxJS with Ben Lesh, Tracy Lee, and Jay Phelps - https://devchat.tv/adv-in-angular/aia-199-rxjs-with-ben-lesh-tracy-lee-and-jay-phelps/

[12] Angular/RxJS When should I unsubscribe from Subscription - https://stackoverflow.com/questions/38008334/angular-rxjs-when-should-i-unsubscribe-from-subscription/41177163#41177163


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
