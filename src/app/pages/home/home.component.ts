import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { GeneralService } from 'src/app/shared/services/general.service';
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
  constructor(
    private spinner: NgxSpinnerService,
    private generalService: GeneralService
  ) {}

  ngOnInit(): void {
    this.getBanners();
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
}
