import { TestBed, async, inject } from '@angular/core/testing';
import {
  HttpModule,
  Http,
  RequestMethod,
  Response,
  ResponseOptions,
  XHRBackend,
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { ScenarioService } from './scenario.service';
import { environment } from '../../../environments/environment';
import { Scenario } from './scenario.model';
import { TestSuite } from './test-suite.model';

describe('ScenarioService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ScenarioService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should be created', inject([ScenarioService], (service: ScenarioService) => {
    // arranges

    // acts

    // asserts
    expect(service).toBeTruthy();
  }));

  describe('getScenarios()', () => {
    it('should get scenarios', async(inject([ScenarioService, XHRBackend], (service: ScenarioService, mockBackend) => {
      // arranges
      const mockResponse = [
        {
          'id': '59e48a6c0a83e7000f30d58c',
          'name': 'testSCN1',
          'description': 'testSCN',
          'testSuiteId': '59e48a7ac6ad4b435cb0009e',
          'testSuite': {
            'id': '59e48a7ac6ad4b435cb0009e'
          },
          'configuration': {
            'properties': {}
          },
          'pendingTimeout': 30000,
          'runningTimeout': 30000,
          'afterHandlers': []
        },
        {
          'id': '59e48a890a83e7000f30d58e',
          'name': 'testSCN2',
          'description': 'testSCN',
          'testSuiteId': '59e48a9dc6ad4b435cb000a0',
          'testSuite': {
            'id': '59e48a9dc6ad4b435cb000a0'
          },
          'configuration': {
            'properties': {}
          },
          'pendingTimeout': 30000,
          'runningTimeout': 30000,
          'afterHandlers': []
        }
      ];

      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      // acts
      const act = () => service.getScenarios();

      // asserts
      act().then(res => {
        expect(res.length).toBe(mockResponse.length);
        expect(res[0].id).toBe(mockResponse[0].id);
        expect(res[1].id).toBe(mockResponse[1].id);
      });
    })));

    it('should reject error message when invalid response',
      async(inject([ScenarioService, XHRBackend], (service: ScenarioService, mockBackend) => {
        // arranges
        const mockResponse = 'expected error';

        mockBackend.connections.subscribe(connection => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        // acts
        const act = () => service.getScenarios();

        // asserts
        act().catch(err => {
          expect(err).toEqual('Invalid Response : expect an array as response');
        });
      })));

  });

  describe('createScenario(scenario: Scenario)', () => {
    it('should create scenario with correctly url,httpBody,headers and method',
      async(inject([ScenarioService, XHRBackend], (service: ScenarioService, mockBackend) => {
        // arranges
        let mockResponse = {
          name: 'example-test',
          configuration: {
            'properties': {}
          },
          afterHandlers: [],
          testSuite: {
            tests: [],
            id: '59f8980818710bad170196da'
          },
          testSuiteId: '59f8980818710bad170196da',
          pendingTimeout: 10000,
          runningTimeout: 10000,
        };

        mockResponse = Scenario.load(mockResponse);

        let request;
        let createUrl;
        let headers;
        let method;

        mockBackend.connections.subscribe(connection => {

          request = connection.request;
          createUrl = connection.request.url;
          headers = connection.request.headers.get('Content-Type');
          method = connection.request.method;

          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        const scenario: Scenario = Scenario.load(mockResponse);
        const expectedCreateUrl = 'http://localhost:3005/sds/scenarios';

        // acts
        const act = () => service.createScenario(scenario);

        // asserts
        act().then(() => {
          expect(createUrl).toBe(expectedCreateUrl);
          const httpBody = JSON.parse(request.getBody());
          expect(Scenario.load(httpBody)).toEqual(mockResponse);
          expect(headers).toEqual('application/json');
          expect(method).toBe(RequestMethod.Post);
        });
      })));

    it('should create scenario (response)', async(inject([ScenarioService, XHRBackend], (service: ScenarioService, mockBackend) => {
      // arranges
      const mockResponse = {
        name: 'example-test',
        configuration: {
          'properties': {}
        },
        afterHandlers: [],
        testSuite: {
          tests: [],
          id: '59f8980818710bad170196da'
        },
        testSuiteId: '59f8980818710bad170196da',
        pendingTimeout: 10000,
        runningTimeout: 10000,
      };

      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      const scenario: Scenario = Scenario.load(mockResponse);

      // acts
      const act = () => service.createScenario(scenario);

      // asserts
      act().then(res => {
        expect(res).not.toEqual([]);
        expect(Array.isArray(scenario)).toBe(false);
      });

    })));

    it('should reject error message when invalid response',
      async(inject([ScenarioService, XHRBackend], (service: ScenarioService, mockBackend) => {
        // arranges
        const mockResponse = null;

        mockBackend.connections.subscribe(connection => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        const scenario = mockResponse;

        // acts
        const act = () => service.createScenario(scenario);

        // asserts
        act().catch(err => {
          expect(err).toEqual('Invalid Response : expect an object as response');
        });
      })));

  });

  describe('updateScenario(scenario: Scenario)', () => {
    it('should update scenario with correctly url,httpBody,headers and method',
      async(inject([ScenarioService, XHRBackend], (service: ScenarioService, mockBackend) => {
        // arranges
        let mockResponse = {
          // update existing scenario.id
          'id': '59e48a6c0a83e7000f30d58c',
          'name': 'edit-scenario',
          'description': 'edit-scenario',
          'testSuiteId': '59e48a7ac6ad4b435cb0009e',
          'testSuite': {
            'tests': [],
            'id': '59e48a7ac6ad4b435cb0009e'
          },
          'configuration': {
            'properties': {},
            'runMode': 'mono',
            'targetMode': 'normal',
            'type': 'physical',
            'name': 'edit-scenario'
          },
          'pendingTimeout': 30000,
          'runningTimeout': 30000,
          'afterHandlers': []
        };

        mockResponse = Scenario.load(mockResponse);

        let request;
        let updateUrl;
        let headers;
        let method;

        mockBackend.connections.subscribe(connection => {
          request = connection.request;
          updateUrl = connection.request.url;
          headers = connection.request.headers.get('Content-Type');
          method = connection.request.method;

          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse),
          })));
        });

        const scenario: Scenario = Scenario.load(mockResponse);
        const expectedCreateUrl = 'http://localhost:3005/sds/scenarios/59e48a6c0a83e7000f30d58c';

        // acts
        const act = () => service.updateScenario(scenario);

        act().then(res => {
          expect(updateUrl).toBe(expectedCreateUrl);
          const httpBody = JSON.parse(request.getBody());
          expect(Scenario.load(httpBody)).toEqual(mockResponse);
          expect(headers).toEqual('application/json');
          expect(method).toBe(RequestMethod.Patch);
        });

      })));

  });

  describe('deleteScenario(scenarioId: string)', () => {
    it('should delelete scenario with correctly url, headers and method',
      async(inject([ScenarioService, XHRBackend], (service: ScenarioService, mockBackend) => {
        // arranges
        const mockResponse = {
          // update existing scenario.id
          'id': '59e48a6c0a83e7000f30d58c',
          'name': 'edit-scenario',
          'description': 'edit-scenario',
          'testSuiteId': '59e48a7ac6ad4b435cb0009e',
          'testSuite': {
            'tests': [],
            'id': '59e48a7ac6ad4b435cb0009e'
          },
          'configuration': {
            'properties': {},
            'runMode': 'mono',
            'targetMode': 'normal',
            'type': 'physical',
            'name': 'edit-scenario'
          },
          'pendingTimeout': 30000,
          'runningTimeout': 30000,
          'afterHandlers': []
        };

        let request;
        let deleteUrl;
        let headers;
        let method;

        mockBackend.connections.subscribe(connection => {
          request = connection.request;
          deleteUrl = connection.request.url;
          headers = connection.request.headers.get('Content-Type');
          method = connection.request.method;

          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse),
          })));
        });

        const scenario: Scenario = Scenario.load(mockResponse);
        const scenarioId = scenario.id;
        const expectedDeleteUrl = 'http://localhost:3005/sds/scenarios/59e48a6c0a83e7000f30d58c';

        // acts
        const act = () => service.deleteScenario(scenarioId);

        act().then(res => {
          expect(deleteUrl).toBe(expectedDeleteUrl);
          expect(headers).toEqual('application/json');
          expect(method).toBe(RequestMethod.Delete);
        });

      })));

  });

  describe('runScenario(scenarioId: string)', () => {
    it('should run scenario with correctly Url and method',
      async(inject([ScenarioService, XHRBackend], (service: ScenarioService, mockBackend) => {
        // arranges
        const mockResponse = {
          // update existing scenario.id
          'id': '59e48a6c0a83e7000f30d58c',
          'name': 'edit-scenario',
          'description': 'edit-scenario',
          'testSuiteId': '59e48a7ac6ad4b435cb0009e',
          'testSuite': {
            'tests': [],
            'id': '59e48a7ac6ad4b435cb0009e'
          },
          'configuration': {
            'properties': {},
            'runMode': 'mono',
            'targetMode': 'normal',
            'type': 'physical',
            'name': 'edit-scenario'
          },
          'pendingTimeout': 30000,
          'runningTimeout': 30000,
          'afterHandlers': []
        };

        let request;
        let runUrl;
        let method;

        mockBackend.connections.subscribe(connection => {
          request = connection.request;
          runUrl = connection.request.url;
          method = connection.request.method;

          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse),
            // status: 200,
            // statusText: "OK",
          })));
        });

        const scenario: Scenario = Scenario.load(mockResponse);
        const scenarioId = scenario.id;
        const expectedRunUrl = 'http://localhost:3005/sds/scenarios/59e48a6c0a83e7000f30d58c/run?user_id=59e48a6c0a83e7000f30d58c';

        // acts
        const act = () => service.runScenario(scenarioId);

        act().then(res => {
          expect(runUrl).toBe(expectedRunUrl);
          expect(method).toBe(RequestMethod.Get);
        });

      })));

    it('should reject error message when invalid response',
      async(inject([ScenarioService, XHRBackend], (service: ScenarioService, mockBackend) => {
        // arranges
        const mockResponse = null;
        const scenarioId = '59e48a6c0a83e7000f30d58c';

        mockBackend.connections.subscribe(connection => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        // acts
        const act = () => service.runScenario(scenarioId);

        // asserts
        act().catch(err => {
          expect(err).toEqual('Invalid Response : expect data as response');
        });
      })));

  });


});
