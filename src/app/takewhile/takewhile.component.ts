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
