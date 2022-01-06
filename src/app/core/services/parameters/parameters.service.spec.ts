import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ParametersService } from './parameters.service';

// Global webpack_public_path
global.__webpack_public_path__ = 'http://localhost:4200/';

describe('ParametersService', () => {
  let service: ParametersService;
  let httpMock: HttpTestingController;
  const PARAMETERS_APP = {
    data: {
      parameters: {
        headers: {
            application: 'Header PagosPJ'
        }
    }
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
      ]
    });
    service = TestBed.inject(ParametersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loadParameters() should http GET PARAMETERS_APP', () => {
    service.loadParameters();
    const req = httpMock.expectOne('http://localhost:4200/assets/resources/application_parameters.json');
    expect(req.request.method).toEqual('GET');
    req.flush(PARAMETERS_APP);
    httpMock.verify();
  });
});


describe('ParametersService -- dont load metadata from ConfigMapService', () => {
  let service: ParametersService;
  let httpMock: HttpTestingController;
  const PARAMETERS_APP = {
    data: {
      parameters: {
        headers: {
            application: 'Footer PagosPJ'
        }
    }
    }
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
      ]
    });
    service = TestBed.inject(ParametersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('loadParameters() should http GET PARAMETERS_APP', () => {
    service.loadParameters();
    const req = httpMock.expectOne('http://localhost:4200/assets/resources/application_parameters.json');
    expect(req.request.method).toEqual('GET');
    req.flush(PARAMETERS_APP);
    httpMock.verify();
  });
});
