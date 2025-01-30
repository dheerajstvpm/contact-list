import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ContactsService } from '../../services/contacts.service';
import { MatButtonModule } from '@angular/material/button';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-contact-details',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, AsyncPipe],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDetailsComponent implements OnInit {
  private formBuilder = inject(FormBuilder)
  private contactsService = inject(ContactsService);
  contactForm = this.formBuilder.group({
    _id: [''],
    name: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^[6-9][\d]{9}$/)]],
    email: ['', Validators.email],
    address: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['', Validators.pattern(/^[1-9][\d]{5}$/)],
    }),
  });
  showAddButton = true;
  loadingStatus: Observable<boolean> = this.contactsService.loadingStatus;

  ngOnInit(): void {
    if (this.contactsService.selectedContact) {
      this.contactForm.patchValue(this.contactsService.selectedContact)
      this.showAddButton = false;
    }
  }

  onSubmit() {
    const { _id = '', name, phone, email = '', address } = this.contactForm.value;
    if (_id === null || !name || !phone || email === null) {
      return;
    }
    const addressBody = {
      street: address?.street ?? '',
      city: address?.city ?? '',
      state: address?.state ?? '',
      zip: address?.zip ?? ''
    }
    if (this.showAddButton) {
      this.contactsService.createContact({ _id, name, phone, email, address: addressBody })
    } else {
      this.contactsService.updateContact({ _id, name, phone, email, address: addressBody })
    }
  }
}
