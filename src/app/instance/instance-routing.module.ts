import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { InstanceMainComponent } from './instance-main/instance-main.component';

const instancesRoutes: Routes = [
  { path: 'instances', component: InstanceMainComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(instancesRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class InstanceRoutingModule { }
