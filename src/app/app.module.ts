import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { ScenarioModule } from './scenario/scenario.module';
import { ExecutionModule } from './execution/execution.module';
import { InstanceModule } from './instance/instance.module';

import { AppComponent } from './app.component';

// Material Modules
import {
  MatSidenavModule,
} from '@angular/material';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    ScenarioModule,
    ExecutionModule,
    InstanceModule,
    AppRoutingModule,
    MatSidenavModule,
  ],
  declarations: [
    AppComponent,
  ],
  exports: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
