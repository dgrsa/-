import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { GeneralService } from 'src/app/shared/services/general.service';
import { ResturantService } from 'src/app/shared/services/resturant.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  allBanners = [];
  imageBaseURL = environment.imageBaseUrl;
  editedBanner: string[] = [];
  offset = 1;
  resturants = [];
  Specialresturants = [];
  constructor(
    private spinner: NgxSpinnerService,
    private generalService: GeneralService,
    private resturantService: ResturantService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.getBanners();
    this.getSpecialResturant();
    this.getResturants();
  }

  config: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    navigation: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    // autoplay: true,
    keyboard: true,
    scrollbar: false,
    loop: true,
    speed: 700,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
  };

  getBanners() {
    this.spinner.show();
    this.generalService.getBanners().subscribe(
      (data) => {
        if (data['success']) {
          this.spinner.hide();
          this.allBanners = data['data']['rows'];
          const arr: string[] = this.allBanners.map((banner) => {
            return `${this.imageBaseURL}/${banner['image']['for']}/${banner['image']['name']}`;
          });
          this.editedBanner = arr;
        }
      },
      (err) => {
        this.spinner.hide();
        console.error(err);
      }
    );
  }

  getSpecialResturant(): void {
    this.spinner.show();
    this.resturantService.getResturant(this.offset - 1, true).subscribe(
      (data) => {
        if (data['success']) {
          this.spinner.hide();
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
    this.spinner.show();
    this.resturantService.getResturant(this.offset - 1, undefined).subscribe(
      (data) => {
        if (data['success']) {
          this.spinner.hide();
          this.resturants = data['data']['rows'];
        }
      },
      (err) => {
        this.spinner.hide();
        console.error(err);
      }
    );
  }
}
