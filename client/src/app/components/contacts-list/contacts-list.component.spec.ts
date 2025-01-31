import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ContactsListComponent } from './contacts-list.component';
import { ContactsService } from '../../services/contacts.service';
import { of } from 'rxjs';

describe('ContactsListComponent', () => {
  let component: ContactsListComponent;
  let fixture: ComponentFixture<ContactsListComponent>;
  let contactsService: ContactsService;

  beforeEach(async () => {
    const contactsServiceSpy = jasmine.createSpyObj('ContactsService', ['resetSelectedContact','getContacts', 'createContact', 'updateContact'],{
      contacts: of([])
    });
    
    await TestBed.configureTestingModule({
      providers: [{ provide: ContactsService, useValue: contactsServiceSpy }, provideHttpClient(), provideHttpClientTesting(), provideAnimationsAsync()],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactsListComponent);
    component = fixture.componentInstance;
    contactsService = TestBed.inject(ContactsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get contacts on init', () => {
    expect(contactsService.getContacts).toHaveBeenCalled();
  });
});
