import { Injectable, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Scenario } from './scenario.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class ScenarioService {
  private scenarioUrl = environment.scenarioUrl;

  constructor(private http: Http) { }

  createScenario(scenario: any) {
    const scenarioUrl = `${this.scenarioUrl}/sds/scenarios`;
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    return this.http.post(scenarioUrl, (scenario), { headers })
      .toPromise()
      .then(res => {

        const data = res.json() as any;
        if (data) {
          const scenarioRes = Scenario.load(data);
          console.log('scenarioRes', scenarioRes);
          return scenarioRes;
        } else {
          throw new Error('Invalid Response : expect an object as response');
        }

      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  getScenarios() {
    const scenarioUrl = `${this.scenarioUrl}/sds/scenarios`;
    return this.http.get(scenarioUrl)
      .toPromise()
      .then(res => {
        const data: any[] = res.json();
        if (Array.isArray(data)) {
          const scenarios = data.map(item => Scenario.load(item));
          return scenarios;
        } else {
          throw new Error('Invalid Response : expect an array as response');
        }
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  updateScenario(scenario: Scenario) {
    const updateUrl = `${this.scenarioUrl}/sds/scenarios/${scenario.id}`;
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    return this.http.patch(updateUrl, JSON.stringify(scenario), { headers })
      .toPromise()
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(this.handleError);
  }

  deleteScenario(scenarioId: string) {
    const deleteUrl = `${this.scenarioUrl}/sds/scenarios/${scenarioId}`;
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    return this.http.delete(deleteUrl, { headers })
      .toPromise()
      .then(res => {
        return res;
      })
      .catch(this.handleError);
  }

  runScenario(scenarioId: string) {
    const runUrl = `${this.scenarioUrl}/sds/scenarios/${scenarioId}/run?user_id=${scenarioId}`;

    return this.http.get(runUrl)
      .toPromise()
      .then(res => {
        const data = res.json() as Scenario;
        console.log('data', data);
        if (data) {
          return data;
        } else {
          throw new Error('Invalid Response : expect data as response');
        }
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred: ', error);
    return Promise.reject(error.message || error);
  }
}
