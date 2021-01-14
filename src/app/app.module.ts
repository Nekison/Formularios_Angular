import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// esta importacion hace que la pagina no se recargue al presionar un boton ????
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateComponent } from './pages/template/template.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';
import { from } from 'rxjs';
import { Reactive2Component } from './pages/reactive2/reactive2.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    ReactiveComponent,
    Reactive2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
