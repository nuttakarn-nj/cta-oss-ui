import { Injectable } from '@angular/core';
import { ScenarioPredefined } from '../shared/scenario-predefined.model';

@Injectable()
export class ScenarioPredefinedService {

  load() {
    return Promise.resolve(ScenarioPredefined);
  }
}
