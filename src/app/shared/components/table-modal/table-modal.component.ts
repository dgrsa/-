import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-table-modal',
  templateUrl: './table-modal.component.html',
  styleUrls: ['./table-modal.component.scss'],
})
export class TableModalComponent implements OnInit {
  constructor(
    public bsModalRef: BsModalRef,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {}
}
