import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ContactsService } from './contacts.service';
import { Contact, ContactListItem } from '../models/contacts.model';
import { of, throwError } from 'rxjs';
import { ContactsDataService } from './contacts-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

describe('ContactsService', () => {
  let service: ContactsService;
  const contactsDataServiceSpy = jasmine.createSpyObj('ContactsDataService', ['getContacts', 'addContact', 'updateContact', 'deleteContact']);
  const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ContactsDataService, useValue: contactsDataServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: Router, useValue: routerSpy },
        provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ContactsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createContact', () => {
    it('should create new contact and navigate', () => {
      const mockContact = {} as Contact;
      const mockContacts: Contact[] = [mockContact];
      contactsDataServiceSpy.addContact.and.returnValue(of(mockContacts));
      service.createContact(mockContact)
      service.contacts.subscribe((contacts) => {
        expect(contacts).toEqual(mockContacts);
      });
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should handle errors', () => {
      const mockContact = {} as Contact;
      const mockError = new Error('Error creating contact');
      contactsDataServiceSpy.addContact.and.returnValue(throwError(mockError));
      service.createContact(mockContact)
      expect(snackBarSpy.open).toHaveBeenCalled();
    });
  });

  describe('getContacts', () => {
    it('should get contacts', () => {
      const mockContacts: Contact[] = [];
      contactsDataServiceSpy.getContacts.and.returnValue(of(mockContacts));
      service.getContacts();
      service.contacts.subscribe(contacts => {
        expect(contacts).toEqual(mockContacts);
      });
    });

    it('should handle errors', () => {
      const mockError = new Error('Error creating contact');
      contactsDataServiceSpy.getContacts.and.returnValue(throwError(mockError));
      service.getContacts()
      expect(snackBarSpy.open).toHaveBeenCalled();
    });
  });

  describe('updateContact', () => {
    it('should update contact and navigate', () => {
      const mockContact = {} as Contact;
      const mockContacts: Contact[] = [mockContact];
      contactsDataServiceSpy.updateContact.and.returnValue(of(mockContacts));
      service.updateContact(mockContact)
      service.contacts.subscribe((contacts) => {
        expect(contacts).toEqual(mockContacts);
      });
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
    });

    it('should handle errors', () => {
      const mockContact = {} as Contact;
      const mockError = new Error('Error creating contact');
      contactsDataServiceSpy.updateContact.and.returnValue(throwError(mockError));
      service.updateContact(mockContact)
      expect(snackBarSpy.open).toHaveBeenCalled();
    });
  });

  describe('deleteContact', () => {
    it('should delete contact', () => {
      const _id = '';
      const mockContacts: Contact[] = [];
      contactsDataServiceSpy.deleteContact.and.returnValue(of(mockContacts));
      service.deleteContact(_id)
      service.contacts.subscribe((contacts) => {
        expect(contacts).toEqual(mockContacts);
      });
    });

    it('should handle errors', () => {
      const _id = '';
      const mockError = new Error('Error creating contact');
      contactsDataServiceSpy.deleteContact.and.returnValue(throwError(mockError));
      service.deleteContact(_id)
      expect(snackBarSpy.open).toHaveBeenCalled();
    });
  });

  describe('addNewContact', () => {
    it('should navigate to details', () => {
      service.addNewContact()
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/details']);
    });
  });

  describe('editContact', () => {
    it('should update selectedContact and navigate to details', () => {
      const mockContact = {} as Contact;
      service.editContact(mockContact)
      expect(service.selectedContact).toEqual(mockContact);
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/details']);
    });
  });

  describe('resetSelectedContact', () => {
    it('should update selectedContact to undefined', () => {
      service.resetSelectedContact()
      expect(service.selectedContact).toEqual(undefined);
    });
  });

  describe('convertToContactListItem', () => {
    it('should convert contacts array', () => {
      const mockContacts: Contact[] = [{
          _id: '001',
          name: 'Bob',
          phone: '9999999999',
          email: 'bob@gmail.com',
          address: {
              street: '123',
              city: 'Delhi',
              state: 'New Delhi',
              zip: '100000'
          }
      }];
      const expectedResponse: ContactListItem[] = [{ _id: '001', name: 'Bob', phone: '9999999999', email: 'bob@gmail.com', address: '123, Delhi, New Delhi, 100000' }]
      const response = service.convertToContactListItem(mockContacts)
      expect(response).toEqual(expectedResponse);
    });
  });

  describe('convertToDownloadableFormat', () => {
    it('should convert contacts array', () => {
      const mockContacts: Contact[] = [{
          _id: '001',
          name: 'Bob',
          phone: '9999999999',
          email: 'bob@gmail.com',
          address: {
              street: '123',
              city: 'Delhi',
              state: 'New Delhi',
              zip: '100000'
          }
      }];
      const expectedResponse = [{ name: 'Bob', phone: '9999999999', email: 'bob@gmail.com', address: '123, Delhi, New Delhi, 100000' }]
      const response = service.convertToDownloadableFormat(mockContacts)
      expect(response).toEqual(expectedResponse);
    });
  });
});
