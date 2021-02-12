import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {ProviderModule} from './provider/provider.module';
import {appEffects, appReducer} from './store/store.interface';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducer),
    EffectsModule.forRoot(appEffects),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    BrowserAnimationsModule,
    SharedModule,
    ProviderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
