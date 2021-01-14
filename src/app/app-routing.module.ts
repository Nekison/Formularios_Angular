import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from './pages/template/template.component';
import { ReactiveComponent } from './pages/reactive/reactive.component';
import { Reactive2Component } from './pages/reactive2/reactive2.component';

const routes: Routes = [
  { path: 'template', component: TemplateComponent },
  { path: 'reactive', component: ReactiveComponent },
  { path: 'reactive2', component: Reactive2Component },
  { path: '**', pathMatch: 'full', redirectTo: 'reactive2' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
