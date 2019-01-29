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

import { ExecutionService } from './execution.service';

describe('ExecutionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        ExecutionService,
        { provide: XHRBackend, useClass: MockBackend }]
    });
  });

  it('should be created', inject([ExecutionService], (service: ExecutionService) => {
    expect(service).toBeTruthy();
  }));

  describe('getExecutions()', () => {
    it('should get executions', async(inject([ExecutionService, XHRBackend], (service: ExecutionService, mockBackend) => {
      // arranges
      const mockResponse =
        [
          {
            'id': '5a43285432b4ed000f8de0d3',
            'scenarioId': '5848e4e4f6523cbab4d2d4e5',
            'scenarioData': {
              'name': 'nuttakarn-test',
              'description': 'test scenario',
              'testSuiteId': '57e0e3ff7f256e3368cc4ecb',
              'testSuite': {
                'id': '57e0e3ff7f256e3368cc4ecb',
                'name': 'sleep suite',
                'tests': [
                  {
                    'id': '57e0e3ff7f256e3368cc4ecb',
                    'name': 'self test',
                    'description': 'self test',
                    'type': 'commandLine',
                    'stages': [
                      {
                        'name': 'agent',
                        'run': 'sssss',
                        'stop': 'echo self',
                        'cwd': '.',
                        'mandatory': true,
                        'timeout': 300000
                      }
                    ]
                  },
                  {
                    'id': '57e0e3ff7f256e3368cc4ecc',
                    'name': 'dream',
                    'description': 'services test',
                    'type': 'commandLine',
                    'stages': [
                      {
                        'name': 'sds',
                        'run': 'aaaa',
                        'stop': 'echo sds',
                        'cwd': '.',
                        'mandatory': true,
                        'timeout': 300000
                      },
                      {
                        'name': 'nos',
                        'run': 'res=`curl -I http://nos:3006 2>/dev/null | head -n 1 |',
                        'stop': 'echo nos',
                        'cwd': '.',
                        'mandatory': true,
                        'timeout': 300000
                      }
                    ]
                  }
                ]
              },
              'configuration': {
                'name': 'mono1',
                'targetMode': 'normal',
                'runMode': 'mono',
                'type': 'physical',
                'properties': {
                  'hostname': 'agt-docker'
                }
              },
              'pendingTimeout': 300000,
              'runningTimeout': 300000,
              'schedule': '*/10 * * * *',
              'scheduled': false,
              'afterHandlers': [
                {
                  'id': '5885f250f7ea75ea00071320',
                  'name': 'nitrus',
                  'type': 'email',
                  'enabled': true,
                  'properties': {
                    'emails': [
                      'phuttha.kusolkumbot@thomsonreuters.com;stephane.dubon@thomsonreuters.com;kiettisak.angkanawin@thomsonreuters.com'
                    ]
                  }
                }
              ],
              'id': '5848e4e4f6523cbab4d2d4e5'
            },
            'userId': '5848e4e4f6523cbab4d2d4e5',
            'requestTimestamp': 1514350613115,
            'updateTimestamp': 1514350699245,
            'completeTimestamp': 1514350699307,
            'pendingTimeout': 300000,
            'runningTimeout': 300000,
            'pendingTimeoutScheduleId': '5a4328543703c9000fa787f5',
            'result': 'ok',
            'ok': 2,
            'partial': 0,
            'inconclusive': 0,
            'failed': 0,
            'resultsCount': 7,
            'instances': [
              {
                'id': '5a3a1fda53b3e6000ff417c1',
                'hostname': 'agt-docker',
                'ip': '172.19.0.5',
                'properties': {
                  'platform': 'linux',
                  'hostname': 'agt-docker'
                },
                'executionId': null,
                'state': null
              }
            ],
            'commandsCount': 1,
            'state': 'finished',
            'cancelDetails': null
          },

        ];

      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      // acts
      const act = () => service.getExecutions();

      // asserts
      act().then(res => {
        expect(Array.isArray(res)).toBe(true);
        expect(res.length).toBe(mockResponse.length);
        expect(res[0].id).toBe(mockResponse[0].id);
      });
    })));

    it('should reject error message when invalid response',
      async(inject([ExecutionService, XHRBackend], (service: ExecutionService, mockBackend) => {
        // arranges
        const mockResponse = 'expected error';

        mockBackend.connections.subscribe(connection => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        // acts
        const act = () => service.getExecutions();

        // asserts
        act().catch(err => {
          expect(err).toEqual('Invalid Response : expect an array as response');
        });
      })));
  });

  describe('getExecution(executionId)', () => {
    it('should get an execution', async(inject([ExecutionService, XHRBackend], (service: ExecutionService, mockBackend) => {
      // arranges
      const mockResponse = {
        'id': '5a43285432b4ed000f8de0d3',
        'scenarioId': '5848e4e4f6523cbab4d2d4e5',
        'scenarioData': {
          'name': 'nuttakarn-test',
          'description': 'test scenario',
          'testSuiteId': '57e0e3ff7f256e3368cc4ecb',
          'testSuite': {
            'id': '57e0e3ff7f256e3368cc4ecb',
            'name': 'sleep suite',
            'tests': [
              {
                'id': '57e0e3ff7f256e3368cc4ecb',
                'name': 'self test',
                'description': 'self test',
                'type': 'commandLine',
                'stages': [
                  {
                    'name': 'agent',
                    'run': 'sssss',
                    'stop': 'echo self',
                    'cwd': '.',
                    'mandatory': true,
                    'timeout': 300000
                  }
                ]
              },
              {
                'id': '57e0e3ff7f256e3368cc4ecc',
                'name': 'dream',
                'description': 'services test',
                'type': 'commandLine',
                'stages': [
                  {
                    'name': 'sds',
                    'run': 'aaaa',
                    'stop': 'echo sds',
                    'cwd': '.',
                    'mandatory': true,
                    'timeout': 300000
                  },
                  {
                    'name': 'nos',
                    'run': 'res=`curl -I http://nos:3006 2>/dev/null | head -n 1 |',
                    'stop': 'echo nos',
                    'cwd': '.',
                    'mandatory': true,
                    'timeout': 300000
                  }
                ]
              }
            ]
          },
          'configuration': {
            'name': 'mono1',
            'targetMode': 'normal',
            'runMode': 'mono',
            'type': 'physical',
            'properties': {
              'hostname': 'agt-docker'
            }
          },
          'pendingTimeout': 300000,
          'runningTimeout': 300000,
          'schedule': '*/10 * * * *',
          'scheduled': false,
          'afterHandlers': [
            {
              'id': '5885f250f7ea75ea00071320',
              'name': 'nitrus',
              'type': 'email',
              'enabled': true,
              'properties': {
                'emails': [
                  'phuttha.kusolkumbot@thomsonreuters.com;stephane.dubon@thomsonreuters.com;kiettisak.angkanawin@thomsonreuters.com'
                ]
              }
            }
          ],
          'id': '5848e4e4f6523cbab4d2d4e5'
        },
        'userId': '5848e4e4f6523cbab4d2d4e5',
        'requestTimestamp': 1514350613115,
        'updateTimestamp': 1514350699245,
        'completeTimestamp': 1514350699307,
        'pendingTimeout': 300000,
        'runningTimeout': 300000,
        'pendingTimeoutScheduleId': '5a4328543703c9000fa787f5',
        'result': 'ok',
        'ok': 2,
        'partial': 0,
        'inconclusive': 0,
        'failed': 0,
        'resultsCount': 7,
        'instances': [
          {
            'id': '5a3a1fda53b3e6000ff417c1',
            'hostname': 'agt-docker',
            'ip': '172.19.0.5',
            'properties': {
              'platform': 'linux',
              'hostname': 'agt-docker'
            },
            'executionId': null,
            'state': null
          }
        ],
        'commandsCount': 1,
        'state': 'finished',
        'cancelDetails': null
      };

      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      // acts
      const act = () => service.getExecution(mockResponse.id);

      // asserts
      act().then(res => {
        expect(Array.isArray(res)).toBe(false);
        expect(res).toEqual(mockResponse);
      });
    })));

  });

  describe('getResults(executionId)', () => {
    it('should get an results', async(inject([ExecutionService, XHRBackend], (service: ExecutionService, mockBackend) => {
      // arranges
      const mockResponse = [
        {
          'id': '5a43286aaf236a000fe761af',
          'executionId': '5a43285432b4ed000f8de0d3',
          'testId': '57e0e3ff7f256e3368cc4ecb',
          'testName': null,
          'testDescription': null,
          'timestamp': 1514350697791,
          'status': 'ok',
          'index': 1,
          'ip': '172.19.0.6',
          'hostname': 'agt-docker',
          'type': null,
          'name': null,
          'description': null,
          'screenshot': null,
          'attachment': null,
          'build': null,
          'custom': null
        },
        {
          'id': '5a43286aaf236a000fe761b0',
          'executionId': '5a43285432b4ed000f8de0d3',
          'testId': '57e0e3ff7f256e3368cc4ecc',
          'testName': null,
          'testDescription': null,
          'timestamp': 1514350697995,
          'status': 'ok',
          'index': 2,
          'ip': '172.19.0.6',
          'hostname': 'agt-docker',
          'type': null,
          'name': null,
          'description': null,
          'screenshot': null,
          'attachment': null,
          'build': null,
          'custom': null
        }];

      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      // acts
      const act = () => service.getResults(mockResponse[0].id);

      // asserts
      act().then(res => {
        expect(Array.isArray(res)).toBe(true);
        // expect(res).toEqual(mockResponse);
      });
    })));

  });

  describe('getResultsByTestId(stage)', () => {
    it('should get an results by same testId and executionId ',
      async(inject([ExecutionService, XHRBackend], (service: ExecutionService, mockBackend) => {
        // arranges
        const mockResponse = [
          {
            'id': '5a43286aaf236a000fe761af',
            'executionId': '5a43285432b4ed000f8de0d3',
            'testId': '57e0e3ff7f256e3368cc4ecb',
            'testName': null,
            'testDescription': null,
            'timestamp': 1514350697791,
            'status': 'ok',
            'index': 1,
            'ip': '172.19.0.6',
            'hostname': 'agt-docker',
            'type': null,
            'name': null,
            'description': null,
            'screenshot': null,
            'attachment': null,
            'build': null,
            'custom': null
          }
        ];

        mockBackend.connections.subscribe(connection => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        const stage = {
          testId: '57e0e3ff7f256e3368cc4ecb',
          executionId: '5a43285432b4ed000f8de0d3'
        };

        // acts
        const act = () => service.getResultsByTestId(stage);

        // asserts
        act().then(res => {
          expect(Array.isArray(res)).toBe(true);
          expect(res).toEqual(mockResponse);
        });
      })));

  });

});
