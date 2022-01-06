import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { BusinessRulesService } from './business-rules.service';

// Global webpack_public_path
global.__webpack_public_path__ = 'http://localhost:4200/';

describe('BusinessRulesService', () => {
  let service: BusinessRulesService;
  let httpMock: HttpTestingController;
  const BUSINESS_RULES = {
    data: {
      businessRules : {
          testConfigMaps: 'ValorConfigMaps'
      }
  }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
      ]
    });
    service = TestBed.inject(BusinessRulesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loadBusinessRules() should http GET BUSINESS_RULES', () => {
    service.loadBusinessRules();
    const req = httpMock.expectOne('http://localhost:4200/assets/resources/business_rules.json');
    expect(req.request.method).toEqual('GET');
    req.flush(BUSINESS_RULES);
    httpMock.verify();
  });
});


describe('BusinessRulesService -- dont load metadata from ConfigMapService', () => {
  let service: BusinessRulesService;
  let httpMock: HttpTestingController;
  const BUSINESS_RULES = {
    data: {
      businessRules : {
          testConfigMaps: 'ValorConfigMaps'
      }
  }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
      ]
    });
    service = TestBed.inject(BusinessRulesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('loadBusinessRules() should http GET BUSINESS_RULES', () => {
    service.loadBusinessRules();
    const req = httpMock.expectOne('http://localhost:4200/assets/resources/business_rules.json');
    expect(req.request.method).toEqual('GET');
    req.flush(BUSINESS_RULES);
    httpMock.verify();
  });
});
