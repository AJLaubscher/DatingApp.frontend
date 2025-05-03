import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { inject, Injectable } from '@angular/core';
import { ConfirmDialogComponent } from '../modals/confirm-dialog/confirm-dialog.component';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  BsModalRef?: BsModalRef;
  private modalService = inject(BsModalService);

  confirm(
    title = 'Confirmation',
    message = 'Are you sure you want to do this?',
    btnOkText = 'Ok',
    btnCancelText = 'Cancel'
  ) {
    const config: ModalOptions = {
      initialState: {
        title,
        message,
        btnOkText,
        btnCancelText,
      },
    };
    this.BsModalRef = this.modalService.show(ConfirmDialogComponent, config);
    return this.BsModalRef.onHidden?.pipe(
      map(() => {
        if (this.BsModalRef?.content) {
          return this.BsModalRef.content.result;
        } else return false;
      })
    );
  }
}
