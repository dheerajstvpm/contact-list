import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ContactsDataService } from '../../services/contacts-data.service';

@Component({
  selector: 'app-contact-details',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './contact-details.component.html',
  styleUrl: './contact-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDetailsComponent {
  private formBuilder = inject(FormBuilder)
  private contactsDataService = inject(ContactsDataService);
  contactForm = this.formBuilder.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^[6-9][\d]{9}$/)]],
    email: ['', Validators.email],
    addressForm: this.formBuilder.group({
      street: [''],
      city: [''],
      state: [''],
      zip: ['', Validators.pattern(/^[1-9][\d]{5}$/)],
    }),
  });

  onSubmit() {
    const { name, phone, email = '', addressForm } = this.contactForm.value;
    if (!name || !phone || email === null) {
      return;
    }
    const address = `${addressForm?.street, addressForm?.city, addressForm?.state, addressForm?.zip}`
    this.contactsDataService.addContact({ name, phone, email, address }).subscribe(res => {
      console.log(res);
    });
  }
}
