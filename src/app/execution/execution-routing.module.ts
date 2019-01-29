import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { ExecutionMainComponent } from './execution-main/execution-main.component';

const executionsRoutes: Routes = [
  { path: 'executions', component: ExecutionMainComponent },
  { path: 'executions/:executionId', component: ExecutionMainComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(executionsRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ExecutionRoutingModule { }
