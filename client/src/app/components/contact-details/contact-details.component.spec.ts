import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ContactDetailsComponent } from './contact-details.component';
import { ContactsService } from '../../services/contacts.service';

describe('ContactDetailsComponent', () => {
  let component: ContactDetailsComponent;
  let fixture: ComponentFixture<ContactDetailsComponent>;
  let contactsService: ContactsService;

  beforeEach(async () => {
    const contactsServiceSpy = jasmine.createSpyObj('ContactsService', ['createContact', 'updateContact']);

    await TestBed.configureTestingModule({
      providers: [{ provide: ContactsService, useValue: contactsServiceSpy }, provideHttpClient(), provideHttpClientTesting(), provideAnimationsAsync()],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactDetailsComponent);
    component = fixture.componentInstance;
    contactsService = TestBed.inject(ContactsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form correctly for new contact', () => {
    expect(component.showAddButton).toBe(true);
    expect(component.contactForm.get('_id')?.value).toBe('');
  });

  it('should initialize form with selected contact data', () => {
    const mockContact = {
      _id: '1',
      name: 'Test Contact',
      phone: '9876543210',
      email: 'test@example.com',
      address: { street: 'Test Street', city: 'Test City', state: 'Test State', zip: '123456' },
    };
    (contactsService.selectedContact as any) = mockContact;
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.contactForm.get('_id')?.value).toBe(mockContact._id);
    expect(component.contactForm.get('name')?.value).toBe(mockContact.name);
  });

  it('should call createContact on submit when showAddButton is true', () => {
    component.contactForm.patchValue({ name: 'New Contact', phone: '9999999999' });
    component.onSubmit();
    expect(contactsService.createContact).toHaveBeenCalled();
  });

  it('should call updateContact on submit when showAddButton is false', () => {
    const mockContact = {
      _id: '1',
      name: 'Test Contact',
      phone: '9876543210',
      email: 'test@example.com',
      address: { street: 'Test Street', city: 'Test City', state: 'Test State', zip: '123456' },
    };
    (contactsService.selectedContact as any) = mockContact;
    component.ngOnInit();
    fixture.detectChanges();
    component.contactForm.patchValue({ name: 'Updated Contact', phone: '8888888888' });
    component.onSubmit();
    expect(contactsService.updateContact).toHaveBeenCalled();
  });

  it('should not call service methods if form is invalid', () => {
    component.contactForm.patchValue({ name: '', phone: '' }); // Invalid form
    component.onSubmit();
    expect(contactsService.createContact).not.toHaveBeenCalled();
    expect(contactsService.updateContact).not.toHaveBeenCalled();
  });
});
