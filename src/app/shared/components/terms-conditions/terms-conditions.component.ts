import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
  styleUrls: ['./terms-conditions.component.scss'],
})
export class TermsConditionsComponent implements OnInit {
  settings = {} as any;
  constructor(
    private generalService: GeneralService,
    public transalte: TranslateService
  ) {
    this.generalService.changeEmitted$.subscribe((data) => {
      this.settings = data;
    });
    this.settings = environment.settings;
  }

  ngOnInit(): void {}
}
