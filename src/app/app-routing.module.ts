import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UrlPermission} from './services/url-permission/url-permission.service';
import {AuthModule} from './auth/auth.module';
import {MainModule} from './main/main.module';

// Определение маршрутов
const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: 'main', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routing = RouterModule.forRoot(routes);
