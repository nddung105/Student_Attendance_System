import { TestBed } from '@angular/core/testing';

import { ServerHttpService } from './server.http.service';

describe('HttpService', () => {
  let service: ServerHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
