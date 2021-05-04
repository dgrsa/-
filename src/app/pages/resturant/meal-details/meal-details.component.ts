import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { CartService } from 'src/app/shared/services/cart.service';
import { ResturantService } from 'src/app/shared/services/resturant.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.scss'],
})
export class MealDetailsComponent implements OnInit {
  imageBaseUrl = environment.imageBaseUrl;
  meal = {} as any;
  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private resturantService: ResturantService,
    private cartService: CartService,
    public translate: TranslateService
  ) {
    route.params.subscribe((params) => {
      this.getItem(params['id']);
    });
  }

  ngOnInit(): void {}
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

  getItem(id): void {
    this.spinner.show();
    this.resturantService.getItemById(id).subscribe(
      (data) => {
        if (data['success']) {
          this.spinner.hide();
          this.meal = data['data'];
          this.meal['selectedQuantity'] = 1;
        }
      },
      (err) => {
        console.error(err);
        this.spinner.hide();
      }
    );
  }

  addToCart(meal) {
    this.cartService.addToCart(meal);
  }

  changeQuantity(event): void {
    if (event == '+') {
      this.meal['selectedQuantity'] =
        1 + parseInt(this.meal['selectedQuantity']);
    } else {
      this.meal['selectedQuantity'] =
        this.meal['selectedQuantity'] == 1
          ? 1
          : parseInt(this.meal['selectedQuantity']) - 1;
    }
  }
}
