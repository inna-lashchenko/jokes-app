import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {ProviderModule} from './provider/provider.module';
import {FavoritesModule} from './favorites/favorites.module';
import {AuthModule} from './auth/auth.module';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {AuthGuard} from './shared/services/auth.guard.service';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () => import('./provider/provider.module').then((m: { ProviderModule: ProviderModule }) => m.ProviderModule)
  },
  {
    path: 'favorites',
    canActivate: [AuthGuard],
    loadChildren: () => import('./favorites/favorites.module').then((m: { FavoritesModule: FavoritesModule }) => m.FavoritesModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m: { AuthModule: AuthModule }) => m.AuthModule)
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
