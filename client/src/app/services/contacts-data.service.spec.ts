import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ContactsDataService } from './contacts-data.service';
import { Contact } from '../models/contacts.model';

describe('ContactsDataService', () => {
  let service: ContactsDataService;
  let httpTesting: HttpTestingController;
  const apiUrl = `http://localhost:3000/api`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ContactsDataService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addContact', () => {
    it('should return new contact list on successful add', () => {
      const mockContact = {} as Contact;
      const mockResponse: Contact[] = [mockContact];
      service.addContact(mockContact).subscribe({
        next: (res) => {
          expect(res).toEqual(mockResponse);
        }
      });
      const req = httpTesting.expectOne({
        method: 'POST',
        url: `${apiUrl}/contacts`,
      }, 'Request to add the contact');
      req.flush(mockResponse);
    });

    it('should throw error on add failure', () => {
      const mockContact = {} as Contact;
      service.addContact(mockContact).subscribe({
        next: () => {},
        error: (error) => {
          expect(error.message).toContain('test 404 error');
        },
      });
      const req = httpTesting.expectOne({
        method: 'POST',
        url: `${apiUrl}/contacts`,
      }, 'Request to add the contact');
      req.flush('Failed!', { status: 404, statusText: 'test 404 error' });
    });
  });

  describe('getContacts', () => {
    it('should return list of contacts', () => {
      const mockResponse: Contact[] = [];
      service.getContacts().subscribe({
        next: (res) => {
          expect(res).toEqual(mockResponse);
        }
      });
      const req = httpTesting.expectOne({
        method: 'GET',
        url: `${apiUrl}/contacts`,
      }, 'Request to get contacts');
      req.flush(mockResponse);
    });

    it('should throw error on get failure', () => {
      service.getContacts().subscribe({
        next: () => {},
        error: (error) => {
          expect(error.message).toContain('test 404 error');
        },
      });
      const req = httpTesting.expectOne({
        method: 'GET',
        url: `${apiUrl}/contacts`,
      }, 'Request to get contacts');
      req.flush('Failed!', { status: 404, statusText: 'test 404 error' });
    });
  });

  describe('updateContact', () => {
    it('should return new contact list on successful update', () => {
      const mockContact = {} as Contact;
      const mockResponse: Contact[] = [mockContact];
      service.updateContact(mockContact).subscribe({
        next: (res) => {
          expect(res).toEqual(mockResponse);
        }
      });
      const req = httpTesting.expectOne({
        method: 'PATCH',
        url: `${apiUrl}/contacts`,
      }, 'Request to update the contact');
      req.flush(mockResponse);
    });

    it('should throw error on update failure', () => {
      const mockContact = {} as Contact;
      service.updateContact(mockContact).subscribe({
        next: () => {},
        error: (error) => {
          expect(error.message).toContain('test 404 error');
        },
      });
      const req = httpTesting.expectOne({
        method: 'PATCH',
        url: `${apiUrl}/contacts`,
      }, 'Request to add the contact');
      req.flush('Failed!', { status: 404, statusText: 'test 404 error' });
    });
  });

  describe('deleteContact', () => {
    it('should return new contact list on successful delete', () => {
      const _id = '';
      const mockResponse: Contact[] = [];
      service.deleteContact(_id).subscribe({
        next: (res) => {
          expect(res).toEqual(mockResponse);
        }
      });
      const req = httpTesting.expectOne({
        method: 'POST',
        url: `${apiUrl}/delete`,
      }, 'Request to delete the contact');
      req.flush(mockResponse);
    });
  
    it('should throw error on delete failure', () => {
      const _id = '';
      service.deleteContact(_id).subscribe({
        next: () => {},
        error: (error) => {
          expect(error.message).toContain('test 404 error');
        },
      });
      const req = httpTesting.expectOne({
        method: 'POST',
        url: `${apiUrl}/delete`,
      }, 'Request to delete the contact');
      req.flush('Failed!', { status: 404, statusText: 'test 404 error' });
    });
  });
});
