import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type Contact = {
  _id: string,
  name: string,
  phone: string,
  email: string,
  address: {
    street: string,
    city: string,
    state: string,
    zip: string
  }
}

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
