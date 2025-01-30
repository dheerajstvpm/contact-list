import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ContactsDataService } from './contacts-data.service';

describe('ContactsDataService', () => {
  let service: ContactsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ provideHttpClient(), provideHttpClientTesting() ],
    });
    service = TestBed.inject(ContactsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
