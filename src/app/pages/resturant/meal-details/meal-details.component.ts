import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
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
  public optionForm = new FormGroup({
    options: new FormArray([]),
  });
  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private resturantService: ResturantService,
    private cartService: CartService,
    public translate: TranslateService,
    public cookieService: CookieService
  ) {
    route.params.subscribe((params) => {
      this.getItem(params['id']);
    });
  }

  ngOnInit(): void { }
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
    const optionPrices = this.optionForm.value.options.map((option) => {
      if (option.price) {
        return option.price;
      } else {
        return 0;
      }
    });
    var sum = optionPrices.reduce(function (a, b) {
      return a + b;
    }, 0);
    meal['newPrice'] = meal.price + sum;
    this.cartService.checkResturant(meal, this.optionForm.value.options);
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

  onCheckChange(event, option) {
    const formArray: FormArray = this.optionForm.get('options') as FormArray;

    /* Selected */
    if (event.target.checked) {
      // Add a new control in the arrayForm
      formArray.push(new FormControl(option));
    } else {
      /* unselected */
      // find the unselected element
      let i: number = 0;

      formArray.controls.forEach((ctrl: FormControl) => {
        if (ctrl.value.id == option.id) {
          // Remove the unselected element from the arrayForm
          formArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
}
