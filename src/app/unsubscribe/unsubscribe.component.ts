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
