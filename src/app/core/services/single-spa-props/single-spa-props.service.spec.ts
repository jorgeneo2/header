import { TestBed } from '@angular/core/testing';

import { SingleSpaPropsService } from './single-spa-props.service';

describe('SingleSpaPropsService', () => {
  let service: SingleSpaPropsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingleSpaPropsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
