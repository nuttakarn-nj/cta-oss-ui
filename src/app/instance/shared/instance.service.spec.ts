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

// service
import { InstanceService } from './instance.service';

// model
import { Instance } from './instance.model';

describe('InstanceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [
        InstanceService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
  });

  it('should be created', inject([InstanceService], (service: InstanceService) => {
    expect(service).toBeTruthy();
  }));

  describe('getInstances()', () => {
    it('should get instances', async(inject([InstanceService, XHRBackend], (service: InstanceService, mockBackend) => {
      // arranges
      const mockResponse = {
        result: [
          {
            'id': '5a39f0473bd555000fce952f',
            'hostname': 'Kiettisaks-MacBook-Pro.local1',
            'ip': '10.42.84.195',
            'properties': {
              'platform': 'darwin',
              'hostname': 'kiettisaks-macbook-pro.local'
            },
            'executionId': null,
            'state': null
          },
          {
            'id': '5a3a1fda53b3e6000ff417c1',
            'hostname': 'agt-docker',
            'ip': '172.19.0.5',
            'properties': {
              'platform': 'linux',
              'hostname': 'agt-dockerl'
            },
            'executionId': null,
            'state': null
          },
        ]
      };

      mockBackend.connections.subscribe(connection => {
        connection.mockRespond(new Response(new ResponseOptions({
          body: JSON.stringify(mockResponse)
        })));
      });

      // acts
      const result = service.getInstances();

      // asserts
      result.then(res => {
        expect(Array.isArray(res)).toBe(true);
        expect(res.length).toBe(mockResponse.result.length);
        expect(res[0].id).toBe(mockResponse.result[0].id);
      });
    })));

    it('should reject error message when invalid response',
      async(inject([InstanceService, XHRBackend], (service: InstanceService, mockBackend) => {
        // arranges
        const mockResponse = null;

        mockBackend.connections.subscribe(connection => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        // acts
        const act = () => service.getInstances();

        // asserts
        act().catch(err => {
          expect(err).toEqual('Invalid Response : expect an object as response');
        });
      })));
  });

  describe('updateInstance(instance: Instance)', () => {
    it('should update instance with correctly url,headers and method',
      async(inject([InstanceService, XHRBackend], (service: InstanceService, mockBackend) => {
        // arranges
        const mockResponse = {
          'id': '5a39f0473bd555000fce952f',
          'hostname': 'Kiettisaks-MacBook-Pro.local1',
          'ip': '10.42.84.195',
          'properties': {
            'platform': 'darwin',
            'hostname': 'kiettisaks-macbook-pro.local'
          },
          'executionId': null,
          'state': null
        };

        let updateUrl;
        let headers;
        let method;

        mockBackend.connections.subscribe(connection => {
          updateUrl = connection.request.url;
          headers = connection.request.headers.get('Content-Type');
          method = connection.request.method;

          connection.mockRespond(new Response(new ResponseOptions({
            body: JSON.stringify(mockResponse)
          })));
        });

        const instance: Instance = Instance.load(mockResponse);
        const expectedUpdateUrl = 'http://localhost:3000/ids/instances/5a39f0473bd555000fce952f';

        // acts
        const act = () => service.updateInstance(instance);

        // asserts
        act().then(res => {
          expect(updateUrl).toBe(expectedUpdateUrl);
          expect(headers).toEqual('application/json');
          expect(method).toBe(RequestMethod.Patch);
        });
      })));

  });

});

