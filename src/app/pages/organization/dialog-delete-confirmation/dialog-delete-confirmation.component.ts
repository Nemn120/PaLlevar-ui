import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrganizationListComponent } from '../organization-list/organization-list.component';

@Component({
  selector: 'app-dialog-delete-confirmation',
  templateUrl: './dialog-delete-confirmation.component.html',
  styleUrls: ['./dialog-delete-confirmation.component.scss']
})
export class DialogDeleteConfirmationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<OrganizationListComponent>,
    @Inject (MAT_DIALOG_DATA) public message: string ) {}

  ngOnInit(): void {
  }

  cerrarDialogo(): void {
    this.dialogRef.close(false);
  }
  confirmado(): void {

    this.dialogRef.close(true);
  }
}
