import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/contacts.model';

@Injectable({
  providedIn: 'root'
})
export class ContactsDataService {

  private http = inject(HttpClient);
  private apiUrl = `http://localhost:3000/api`

  addContact(contact: Contact): Observable<Contact[]> {
    return this.http.post<Contact[]>(`${this.apiUrl}/contacts`, contact)
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.apiUrl}/contacts`)
  }

  updateContact(contact: Contact): Observable<Contact[]> {
    return this.http.patch<Contact[]>(`${this.apiUrl}/contacts`, contact)
  }

  deleteContact(_id: string): Observable<Contact[]> {
    return this.http.post<Contact[]>(`${this.apiUrl}/delete`, {_id})
  }
}
