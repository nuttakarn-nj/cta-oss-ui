import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { ExecutionMainComponent } from './execution-main/execution-main.component';
import { ExecutionHostnameContentComponent } from './execution-hostname-content/execution-hostname-content.component';
import { ExecutionTestContentComponent } from './execution-test-content/execution-test-content.component';
import { ExecutionStageContentComponent } from './execution-stage-content/execution-stage-content.component';
import { ExecutionTestSuiteContentComponent } from './execution-test-suite-content/execution-test-suite-content.component';

// Services
import { ExecutionService } from './shared/execution.service';

// Modules
import { ExecutionRoutingModule } from './execution-routing.module';

// Material modules
import {
  MatButtonModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatToolbarModule,
  MatChipsModule,
  MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatToolbarModule,
    MatChipsModule,
    MatTooltipModule,

    ExecutionRoutingModule
  ],

  declarations: [
    ExecutionMainComponent,
    ExecutionHostnameContentComponent,
    ExecutionTestContentComponent,
    ExecutionStageContentComponent,
    ExecutionTestSuiteContentComponent
  ],

  exports: [
    ExecutionMainComponent
  ],

  providers: [
    ExecutionService
  ]

})
export class ExecutionModule { }

