import { TestBed, async, inject } from '@angular/core/testing';

import { IsSignedInGuardGuard } from './is-signed-in-guard.guard';

describe('IsSignedInGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IsSignedInGuardGuard]
    });
  });

  it('should ...', inject([IsSignedInGuardGuard], (guard: IsSignedInGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
