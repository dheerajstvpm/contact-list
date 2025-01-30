import { inject, Injectable } from '@angular/core';
import { ContactsDataService } from './contacts-data.service';
import { BehaviorSubject, finalize, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contact } from '../models/contacts.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private contactsDataService = inject(ContactsDataService);
  private route = inject(Router);
  private _snackBar = inject(MatSnackBar);
  private $contacts = new BehaviorSubject<Contact[]>([]);
  private $loadingStatus = new BehaviorSubject<boolean>(false);

  get loadingStatus(): Observable<boolean> {
    return this.$loadingStatus.asObservable()
  }

  get contacts(): Observable<Contact[]> {
    return this.$contacts.asObservable()
  }

  get selectedContact(): Contact | undefined {
    try {
      const selectedContact = localStorage.getItem(`selectedContact`);
      return selectedContact ? JSON.parse(selectedContact) : undefined;
    } catch (error) {
      console.log(error);
      return;
    }
  };

  private set selectedContact(contact: Contact | undefined) {
    if (!contact) {
      localStorage.removeItem(`selectedContact`);
      return;
    }
    try {
      localStorage.setItem(`selectedContact`, JSON.stringify(contact))
    } catch (error) {
      console.log(error);
    }
  }

  addNewContact() {
    this.route.navigate(['/details']);
  }

  editContact(contact: Contact | undefined) {
    this.selectedContact = contact;
    this.route.navigate(['/details']);
  }

  resetSelectedContact(){
    this.selectedContact = undefined;
  }

  convertToContactListItem(contacts: Contact[]) {
    return contacts.map(contact => {
      const { _id, name, phone, email, address } = contact;
      const { street, city, state, zip } = address;
      const addressString = `${street && city ? street + ', ' : street}${city && state ? city + ', ' : city}${state && zip ? state + ', ' : state}${zip}`;
      return { _id, name, phone, email, address: addressString };
    });
  }

  convertToDownloadableFormat(contacts: Contact[]) {
    return contacts.map(contact => {
      const { name, phone, email, address } = contact;
      const { street, city, state, zip } = address;
      const addressString = `${street && city ? street + ', ' : street}${city && state ? city + ', ' : city}${state && zip ? state + ', ' : state}${zip}`;
      return { name, phone, email, address: addressString };
    });
  }

  createContact(contact: Contact) {
    this.$loadingStatus.next(true);
    this.contactsDataService.addContact(contact)
      .pipe(
        finalize(() => {
          this.$loadingStatus.next(false);
        })
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          this.$contacts.next(res)
          this.route.navigate(['/']);
        },
        error: (err) => {
          this._snackBar.open(err.error, 'X', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      });
  }

  getContacts() {
    this.contactsDataService.getContacts()
      .subscribe({
        next: (res) => {
          console.log(res);
          this.$contacts.next(res)
        },
        error: (err) => {
          console.log(err.error);
        }
      });
  }

  updateContact(contact: Contact) {
    this.$loadingStatus.next(true);
    this.contactsDataService.updateContact(contact)
      .pipe(
        finalize(() => {
          this.$loadingStatus.next(false);
        })
      )
      .subscribe({
        next: (res) => {
          this.$contacts.next(res)
          this.route.navigate(['/']);
        },
        error: (err) => {
          this._snackBar.open(err.error, 'X', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      });
  }

  deleteContact(_id: string) {
    this.contactsDataService.deleteContact(_id)
      .subscribe({
        next: (res) => {
          this.$contacts.next(res)
        },
        error: (err) => {
          console.log(err.error);
        }
      });
  }
}
