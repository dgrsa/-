// import swl, { SweetAlertType } from 'sweetalert2';
import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
// import { NgxSpinnerService } from 'ngx-spinner';
@Injectable({
  providedIn: 'root',
})
export class HelperToolsService {
  constructor(
    private translate: TranslateService,
    // private SpinnerService: NgxSpinnerService,\01'];
    private http: HttpClient
  ) {}

  showAlertWithTranslation(titleKey, MessageKey, icon) {
    this.translate.get([titleKey, MessageKey]).subscribe(
      (keys) => {
        Swal.fire({
          title: keys[titleKey],
          text: keys[MessageKey],
          icon: icon,
          showConfirmButton: false,
          timer: 3000,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  showConfirmAlert(titleKey, MessageKey) {
    return new Promise((resolve, reject) => {
      this.translate.get([titleKey, MessageKey, 'Confirm', 'Cancel']).subscribe(
        (keys) => {
          Swal.fire({
            title: keys[titleKey],
            text: keys[MessageKey],
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: keys['Confirm'],
            cancelButtonText: keys['Cancel'],
          }).then((result) => {
            if (result.value) {
              resolve('done');
            } else {
              reject('error');
            }
          });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
}
