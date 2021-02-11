import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProviderModule} from './provider/provider.module';
import {FavoritesModule} from './favorites/favorites.module';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./provider/provider.module').then((m: { ProviderModule: ProviderModule }) => m.ProviderModule)
  },
  {
    path: 'favorites',
    loadChildren: () => import('./favorites/favorites.module').then((m: { FavoritesModule: FavoritesModule }) => m.FavoritesModule)
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
