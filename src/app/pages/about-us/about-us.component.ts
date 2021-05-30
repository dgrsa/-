import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { GeneralService } from 'src/app/shared/services/general.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {
  settings = {} as any;
  constructor(
    private generalService: GeneralService,
    public transalte: TranslateService
  ) {
    this.generalService.changeEmitted$.subscribe((data) => {
      this.settings = data;
    });
  }

  ngOnInit(): void {}
}
