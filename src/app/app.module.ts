import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FamilyComponent, PersonComponent } from './components';
import { PersonTracking } from './services';

@NgModule({
  declarations: [AppComponent, FamilyComponent, PersonComponent],
  imports: [BrowserModule],
  providers: [PersonTracking],
  bootstrap: [AppComponent],
})
export class AppModule {}
