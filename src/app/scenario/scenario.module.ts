import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { ScenarioMainComponent } from './scenario-main/scenario-main.component';
import { ScenarioDialogComponent } from './scenario-dialog/scenario-dialog.component';
import { PropertiesConfigurationComponent } from './properties-configuration/properties-configuration.component';
import { ScenarioCardComponent } from './scenario-card/scenario-card.component';
import { AfterhandlerComponent } from './afterhandler/afterhandler.component';
import { SelectedAfterhandlerComponent } from './selected-afterhandler/selected-afterhandler.component';
import { EmailAfterhandlerComponent } from './shared/email-afterhandler.component';
import { ScenarioTestsuiteComponent } from './scenario-testsuite/scenario-testsuite.component';

// Services
import { MatSnackBar, MatDialog } from '@angular/material';
import { AfterhandlerService } from './shared/afterhandler.service';
import { ScenarioPredefinedService } from './shared/scenario-predefined.service';
import { ScenarioService } from './shared/scenario.service';

// Directives
import { AfterhandlerDirective } from './shared/afterhandler.directive';

// Modules
import { ScenarioRoutingModule } from './scenario-routing.module';

// Material modules
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatInputModule,
  MatSidenavModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
  MatIconModule,
  MatTooltipModule,
  MatGridListModule,
  MatButtonToggleModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ScenarioRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatSelectModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatGridListModule,
    MatButtonToggleModule
  ],

  declarations: [
    ScenarioMainComponent,
    ScenarioDialogComponent,
    PropertiesConfigurationComponent,
    ScenarioCardComponent,
    AfterhandlerComponent,
    SelectedAfterhandlerComponent,
    EmailAfterhandlerComponent,
    ScenarioTestsuiteComponent,

    AfterhandlerDirective,
  ],

  exports: [
    ScenarioMainComponent,
    ScenarioDialogComponent,
    PropertiesConfigurationComponent,
    ScenarioCardComponent,
    AfterhandlerComponent,
    SelectedAfterhandlerComponent,
    EmailAfterhandlerComponent
  ],

  providers: [
    AfterhandlerService,
    ScenarioPredefinedService,
    ScenarioService],

  entryComponents: [
    ScenarioDialogComponent,
    EmailAfterhandlerComponent
  ]
})

export class ScenarioModule {
  constructor() { }
}
