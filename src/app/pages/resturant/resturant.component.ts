import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneralService } from 'src/app/shared/services/general.service';
import { ResturantService } from 'src/app/shared/services/resturant.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-resturant',
  templateUrl: './resturant.component.html',
  styleUrls: ['./resturant.component.scss'],
})
export class ResturantComponent implements OnInit {
  offset = 1;
  resturants = [];
  Specialresturants = [];
  counter;
  page;
  imageBaseURL = environment.imageBaseUrl;
  name;
  constructor(
    private spinner: NgxSpinnerService,
    private resturantService: ResturantService,
    private route: ActivatedRoute,
    public translate: TranslateService
  ) {
    route.queryParams.subscribe((params) => {
      if (params['special'] == 'true') {
        this.getSpecialResturant();
      } else {
        if (params['name']) {
          this.name = params['name'];
          this.getResturants();
        } else {
          this.getResturants();
        }
      }
    });
  }

  ngOnInit(): void {}

  getSpecialResturant(): void {
    this.spinner.show();
    this.resturantService.getResturant(this.offset - 1, true).subscribe(
      (data) => {
        if (data['success']) {
          this.spinner.hide();
          this.counter = data['data']['count'];
          this.Specialresturants = data['data']['rows'];
        }
      },
      (err) => {
        this.spinner.hide();
        console.error(err);
      }
    );
  }

  getResturants(): void {
    console.log(this.name);
    this.spinner.show();
    this.resturantService
      .getResturant(this.offset - 1, undefined, this.name)
      .subscribe(
        (data) => {
          if (data['success']) {
            this.spinner.hide();
            this.counter = data['data']['count'];
            this.resturants = data['data']['rows'];
          }
        },
        (err) => {
          this.spinner.hide();
          console.error(err);
        }
      );
  }

  loadMore(event, type): void {
    this.offset = event;
    this.page = event;
    if (type == 'special') {
      this.getSpecialResturant();
    } else {
      this.getResturants();
    }
  }
}
