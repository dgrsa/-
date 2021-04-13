import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from 'src/environments/environment';

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
    public translate: TranslateService
  ) {}

  ngOnInit(): void {}
}
