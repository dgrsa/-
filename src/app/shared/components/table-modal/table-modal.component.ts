import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { GeneralService } from '../../services/general.service';
import { HelperToolsService } from '../../services/helper-tools.service';

@Component({
  selector: 'app-table-modal',
  templateUrl: './table-modal.component.html',
  styleUrls: ['./table-modal.component.scss'],
})
export class TableModalComponent implements OnInit {
  table = {} as any;
  imageBaseURL = environment.imageBaseUrl;
  constructor(
    public bsModalRef: BsModalRef,
    public translate: TranslateService,
    private spinner: NgxSpinnerService,
    private generalService: GeneralService,
    private helperTool: HelperToolsService
  ) {}

  ngOnInit(): void {}

  callWaiter(): void {
    this.spinner.show();
    this.generalService
      .callWaiter(this.table.resturant_id, this.table.id)
      .subscribe(
        (data) => {
          this.spinner.hide();
          if (data['success']) {
            console.log(data);
            this.helperTool.showAlertWithTranslation(
              '',
              'A notification has been sent to a waiter',
              'info'
            );
          }
        },
        (err) => {
          this.spinner.hide();
          console.error(err);
        }
      );
  }
}
