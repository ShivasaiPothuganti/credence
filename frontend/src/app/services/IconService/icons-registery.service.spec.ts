import { TestBed } from '@angular/core/testing';

import { IconsRegisteryService } from './icons-registery.service';

describe('IconsRegisteryService', () => {
  let service: IconsRegisteryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IconsRegisteryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
