import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProviderComponent} from './provider.component';
import {JokesTableComponent} from './jokes-table/jokes-table.component';
import {ProviderRoutingModule} from './provider-routing.module';
import {SharedModule} from '../shared/shared.module';



@NgModule({
  declarations: [
    ProviderComponent,
    JokesTableComponent,
  ],
  imports: [
    CommonModule,
    ProviderRoutingModule,
    SharedModule
  ]
})
export class ProviderModule {
}
