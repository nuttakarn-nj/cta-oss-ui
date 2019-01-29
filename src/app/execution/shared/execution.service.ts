import { Injectable, Inject } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';

@Injectable()
export class ExecutionService {
  private executionUrl = environment.executionUrl;

  constructor(private http: Http) { }

  getExecutions() {
    const getExecutionsUrl = `${this.executionUrl}/eds/executions`;
    return this.http.get(getExecutionsUrl)
      .toPromise()
      .then(res => {
        const data: any[] = res.json();
        if (Array.isArray(data)) {
          return data;
        } else {
          throw new Error('Invalid Response : expect an array as response');
        }
      })
      .catch(error => {
        return this.handleError(error);
      });
  }

  getExecution(executionId) {
    const getExecutionUrl = `${this.executionUrl}/eds/executions/${executionId}`;

    return this.http.get(getExecutionUrl)
      .toPromise()
      .then(res => {
        const data: any[] = res.json();
        return data;
      })
      .catch(this.handleError);
  }

  getResults(executionId) {
    const getResultsUrl = `${this.executionUrl}/eds/results?executionId=${executionId}`;

    return this.http.get(getResultsUrl)
      .toPromise()
      .then(res => {
        const data: any[] = res.json();
        return data;
      })
      .catch(this.handleError);
  }

  getResultsByTestId(stage) {
    const getResultsUrl = `${this.executionUrl}/eds/results?executionId=${stage.executionId}&testId=${stage.testId}`;

    return this.http.get(getResultsUrl)
      .toPromise()
      .then(res => {
        const data: any[] = res.json();
        return data;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred: ', error);
    return Promise.reject(error.message || error);
  }
}
