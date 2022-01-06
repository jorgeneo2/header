import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { MessagesAppService } from './messages-app.service';

// Global webpack_public_path
global.__webpack_public_path__ = 'http://localhost:4200/';

describe('MessagesAppService', () => {
  let service: MessagesAppService;
  let httpMock: HttpTestingController;
  const LABELS = {
    data: {
        copies: {
            paymentsHome: {
                title: 'Pagos a terceros',
                description: 'Prueba Header.'
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
    service = TestBed.inject(MessagesAppService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('loadMessages() should http GET LABELS', () => {
    service.loadMessages();
    const req = httpMock.expectOne('http://localhost:4200/assets/resources/copies.json');
    expect(req.request.method).toEqual('GET');
    req.flush(LABELS);
    httpMock.verify();
  });
});


describe('MessagesAppService -- dont load metadata from ConfigMapService', () => {
  let service: MessagesAppService;
  let httpMock: HttpTestingController;
  const LABELS = {
    data: {
        copies: {
            paymentsHome: {
              title: 'Pagos a terceros',
              description: 'Prueba Footer.'
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
    service = TestBed.inject(MessagesAppService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('loadMessages() should http GET LABELS', () => {
    service.loadMessages();
    const req = httpMock.expectOne('http://localhost:4200/assets/resources/copies.json');
    expect(req.request.method).toEqual('GET');
    req.flush(LABELS);
    httpMock.verify();
  });
});
