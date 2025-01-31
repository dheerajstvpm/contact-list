import { inject, Injectable } from '@angular/core';
import { ContactsDataService } from './contacts-data.service';
import { BehaviorSubject, finalize, map, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Contact, ContactListItem } from '../models/contacts.model';
import { HttpErrorResponse } from '@angular/common/http';
import { mkConfig, generateCsv, download } from "export-to-csv";

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private contactsDataService = inject(ContactsDataService);
  private route = inject(Router);
  private _snackBar = inject(MatSnackBar);
  private $contacts = new BehaviorSubject<Contact[]>([]);
  private $loadingStatus = new BehaviorSubject<boolean>(false);
  csvConfig = mkConfig({ useKeysAsHeaders: true });

  get loadingStatus(): Observable<boolean> {
    return this.$loadingStatus.asObservable()
  }

  get contacts(): Observable<ContactListItem[]> {
    return this.$contacts.pipe(
      map(contacts => this.convertToContactListItem(contacts))
    )
  }

  get selectedContact(): Contact | undefined {
    try {
      const selectedContact = localStorage.getItem(`selectedContact`);
      return selectedContact ? JSON.parse(selectedContact) : undefined;
    } catch (error) {
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
      console.warn(error);
    }
  }

  addNewContact() {
    this.route.navigate(['/details']);
  }

  editContact(_id: string) {
    this.selectedContact = this.$contacts.value.find(contact => _id === contact._id);
    this.route.navigate(['/details']);
  }

  resetSelectedContact() {
    this.selectedContact = undefined;
  }

  convertToContactListItem(contacts: Contact[]): ContactListItem[] {
    return contacts.map(contact => {
      const { _id, name, phone, email, address } = contact;
      const { street, city, state, zip } = address;
      const addressString = `${street && city ? street + ', ' : street}${city && state ? city + ', ' : city}${state && zip ? state + ', ' : state}${zip}`;
      return { _id, name, phone, email, address: addressString };
    });
  }

  convertToDownloadableFormat(contacts: Contact[]): Omit<ContactListItem, '_id'>[] {
    return contacts.map(contact => {
      const { name, phone, email, address } = contact;
      const { street, city, state, zip } = address;
      const addressString = `${street && city ? street + ', ' : street}${city && state ? city + ', ' : city}${state && zip ? state + ', ' : state}${zip}`;
      return { name, phone, email, address: addressString };
    });
  }

  openToast(err: HttpErrorResponse) {
    this._snackBar.open(err.error, 'X', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
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
          this.$contacts.next(res)
          this.route.navigate(['/']);
        },
        error: (err) => {
          this.openToast(err);
        }
      });
  }

  getContacts() {
    this.contactsDataService.getContacts()
      .subscribe({
        next: (res) => {
          this.$contacts.next(res)
        },
        error: (err) => {
          this.openToast(err);
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
          this.openToast(err);
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
          this.openToast(err);
        }
      });
  }

  downloadCsv() {
    const csv = generateCsv(this.csvConfig)(this.convertToDownloadableFormat(this.$contacts.value));
    download(this.csvConfig)(csv)
  }
}
