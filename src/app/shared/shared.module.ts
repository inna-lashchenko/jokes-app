import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSortModule} from '@angular/material/sort';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {HeaderComponent} from './components/header/header.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {SpinnerComponent} from './components/spinner/spinner.component';

const modules = [
  MatIconModule,
  MatSortModule,
  MatTabsModule,
  MatTableModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatProgressSpinnerModule
];

@NgModule({
  declarations: [
    HeaderComponent,
    NotFoundComponent,
    SpinnerComponent],
  imports: [
    CommonModule,
    modules,
    RouterModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [
    HeaderComponent,
    FormsModule,
    modules,
    HttpClientModule,
    SpinnerComponent
  ]
})
export class SharedModule {
}
