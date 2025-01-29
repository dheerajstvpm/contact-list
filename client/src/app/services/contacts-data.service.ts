import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export type Contact = {
  name: string,
  phone: string,
  email: string,
  address: string
}

@Injectable({
  providedIn: 'root'
})
export class ContactsDataService {

  private http = inject(HttpClient);
  private apiUrl = `http://localhost:3000/api`

  addContact(contact: Contact): Observable<Contact[]> {
    console.warn(contact);
    return this.http.post<Contact[]>(`${this.apiUrl}/contacts`, contact)
  }

  getContacts() {
    this.http.get<Contact[]>(`${this.apiUrl}/contacts`).subscribe(res => {
      console.log(res);
    });
  }
}
