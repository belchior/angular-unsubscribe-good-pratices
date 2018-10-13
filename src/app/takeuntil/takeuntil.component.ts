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
