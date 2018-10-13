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
