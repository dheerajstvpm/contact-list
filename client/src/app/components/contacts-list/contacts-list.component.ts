import { AfterViewInit, ChangeDetectionStrategy, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ContactsService } from '../../services/contacts.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteContactDialogComponent } from '../delete-contact-dialog/delete-contact-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Contact, ContactListItem } from '../../models/contacts.model';

@Component({
  selector: 'app-contacts-list',
  imports: [MatButtonModule, MatIconModule, MatPaginatorModule, MatFormFieldModule, MatInputModule,
    MatTableModule, MatSortModule, MatDialogModule, MatTooltipModule],
  templateUrl: './contacts-list.component.html',
  styleUrl: './contacts-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsListComponent implements OnInit, AfterViewInit {
  private contactsService = inject(ContactsService);
  private dialog = inject(MatDialog);

  displayedColumns: string[] = ['name', 'phone', 'email', 'address', 'action'];
  dataSource: MatTableDataSource<ContactListItem> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  contacts: Contact[] = [];

  ngOnInit() {
    this.contactsService.resetSelectedContact();
    this.contactsService.getContacts();
  }

  ngAfterViewInit() {
    this.contactsService.contacts.subscribe((contacts) => {
      this.dataSource.data = contacts;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addNewContact() {
    this.contactsService.addNewContact()
  }

  editContact(row: ContactListItem) {
    this.contactsService.editContact(row._id);
  }

  deleteContact(row: ContactListItem) {
    this.contactsService.deleteContact(row._id)
  }

  openDialog(row: ContactListItem) {
    const dialogRef = this.dialog.open(DeleteContactDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteContact(row);
      }
    });
  }

  downloadCsv(){
    this.contactsService.downloadCsv()
  }
}
