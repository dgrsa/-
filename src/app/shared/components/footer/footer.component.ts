import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  settings = {} as any;
  constructor(
    private generalService: GeneralService,
    public transalte: TranslateService
  ) {}

  ngOnInit(): void {
    this.getSittings();
  }

  getSittings(): void {
    this.generalService.getSettings().subscribe(
      (data) => {
        if (data['success']) {
          this.settings = data['data'];
          this.generalService.emitChange(data['data']);
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
