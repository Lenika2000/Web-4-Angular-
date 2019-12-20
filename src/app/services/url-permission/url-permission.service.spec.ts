import { TestBed, inject } from '@angular/core/testing';

import { UrlPermissionService } from './url-permission.service';

describe('UrlPermissionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrlPermissionService]
    });
  });

  it('should be created', inject([UrlPermissionService], (service: UrlPermissionService) => {
    expect(service).toBeTruthy();
  }));
});
