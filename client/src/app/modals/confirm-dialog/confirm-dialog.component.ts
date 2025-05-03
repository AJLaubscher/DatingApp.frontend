import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css',
})
export class ConfirmDialogComponent {
  BsModalRef = inject(BsModalRef);
  title = '';
  message = '';
  btnOkText = '';
  btnCancelText = '';
  result = false;

  confirm() {
    this.result = true;
    this.BsModalRef.hide();
  }

  decline() {
    this.BsModalRef.hide();
  }
}
