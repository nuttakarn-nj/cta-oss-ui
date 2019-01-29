import { Injectable, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Instance } from './instance.model';
import { environment } from '../../../environments/environment';

@Injectable()
export class InstanceService {
  private instanceUrl = environment.instanceUrl;

  constructor(private http: Http) { }

  getInstances() {
    const instanceUrl = `${this.instanceUrl}/ids/instances`;
    return this.http.get(instanceUrl)
      .toPromise()
      .then(res => {
        const data: any = res.json();
        if (data) {
          const instance = data.result.map(item => Instance.load(item));
          return instance;
        } else {
          throw new Error('Invalid Response : expect an object as response');
        }

      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  updateInstance(instance: Instance) {
    const updateUrl = `${this.instanceUrl}/ids/instances/${instance.id}`;
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');

    return this.http.patch(updateUrl, JSON.stringify(instance), { headers })
      .toPromise()
      .then(res => {
        return res;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred: ', error);
    return Promise.reject(error.message || error);
  }

}
