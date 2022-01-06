import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { EndpointService } from '@services/endpoint/endpoint.service';
import { ParametersService } from '@services/parameters/parameters.service';
import { SingleSpaPropsService } from '@services/single-spa-props/single-spa-props.service';
import { Observable } from 'rxjs';

import { ItauPjInterceptor } from './itau-pj.interceptor';

describe('ItauPjInterceptor', () => {

  const routerSpy = { navigate: jasmine.createSpy('navigate') };
  let client: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ItauPjInterceptor,
        {
          provide: SingleSpaPropsService,
          useValue: {
            singleSpaProps: {
              CallBackSessionExpired: () => true
            }
          }
        }, {
          provide: ParametersService,
          useValue: {
            parametersData: {
              propsNames: {
                CallBackSessionExpired: 'CallBackSessionExpired'
              }
            }
          }
        }, {
          provide: EndpointService,
          useValue: {
            urls: {
              '3scale': {
                BASE: 'https://apis-dev.itau.co/api-pj',
              },
            }
          }
        },
        { provide: Router, useValue: routerSpy },
      ]
    });

    TestBed.configureTestingModule({
      providers: [
        ItauPjInterceptor,
        {
          provide: HTTP_INTERCEPTORS,
          useClass: ItauPjInterceptor,
          multi: true,
        },
      ],
    });
    client = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    const interceptor: ItauPjInterceptor = TestBed.inject(ItauPjInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('test 200 response', () => {
    client.get('https://apis-dev.itau.co/api-pj/authentication/v1/user/').subscribe((response) => {
      expect(response).toEqual(expect.any(Observable));
    });
  });

  it('test 200 response', fakeAsync(() => {
    client.get('https://apis.itau.co/api-pj/authentication/v1/user/').subscribe((response) => {
      expect(response).toEqual(expect.any(Observable));
    });
  }));
});
