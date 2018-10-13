import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { fakeBackendProvider } from './fake-backend';

import { AppComponent } from './app.component';
import { FirstComponent } from './first/first.component';
import { TakewhileComponent } from './takewhile/takewhile.component';
import { TakeuntilComponent } from './takeuntil/takeuntil.component';
import { UnsubscribeComponent } from './unsubscribe/unsubscribe.component';


@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    TakewhileComponent,
    TakeuntilComponent,
    UnsubscribeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [fakeBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
