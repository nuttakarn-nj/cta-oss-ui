import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ScenarioMainComponent } from './scenario-main/scenario-main.component';

const scenariosRoutes: Routes = [
  { path: 'scenarios', component: ScenarioMainComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(scenariosRoutes)
  ],
  exports: [
    RouterModule,
  ]
})
export class ScenarioRoutingModule {}
