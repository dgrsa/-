import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
})
export class PrivacyComponent implements OnInit {
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
