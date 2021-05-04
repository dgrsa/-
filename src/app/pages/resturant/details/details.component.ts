import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CookieService } from 'ngx-cookie-service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { TableModalComponent } from 'src/app/shared/components/table-modal/table-modal.component';
import { CartService } from 'src/app/shared/services/cart.service';
import { GeneralService } from 'src/app/shared/services/general.service';
import { HelperToolsService } from 'src/app/shared/services/helper-tools.service';
import { ResturantService } from 'src/app/shared/services/resturant.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  resturant = {} as any;
  categories = [];
  subCats = [];
  meals = [];
  imageBaseURL = environment.imageBaseUrl;
  resturant_id;
  subCatId;
  allBanners = [];
  editedBanners = [];
  bsModalRef: BsModalRef;
  tableData = {} as any;
  totalPrice;
  isSquares = true;
  isRectangles = false;
  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private resturantService: ResturantService,
    private cartService: CartService,
    private generalService: GeneralService,
    private modalService: BsModalService,
    private coockieService: CookieService,
    private helperTool: HelperToolsService,
    public translate: TranslateService
  ) {
    this.totalPrice = JSON.parse(
      localStorage.getItem('BrodoneCart')
    ).totalPrice;
    this.cartService.changeEmitted$.subscribe((value) => {
      this.totalPrice = environment.userCart.totalPrice;
    });
    this.route.params.subscribe((params) => {
      this.resturant_id = params['id'];
      this.getResturantById(params['id']);
      this.getBanners(params['id']);
      this.getItems();
    });

    this.route.queryParams.subscribe((params) => {
      if (params['tableId']) {
        this.coockieService.set('table', params['table'], 1);
        // this.coockieService.set('resturant_id', this.resturant_id);
        this.getTableById(this.resturant_id, params['tableId']);
      }
    });
  }

  ngOnInit(): void {
    this.getCategory();
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

  filterConfig: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 1,
    navigation: false,
    // autoplay: true,
    keyboard: true,
    scrollbar: false,
    loop: false,
    speed: 700,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    freeMode: true,
    spaceBetween: 20,
    breakpoints: {
      768: {
        slidesPerView: 4,
      },
      576: {
        slidesPerView: 3,
      },
      414: {
        slidesPerView: 3,
      },
      320: {
        slidesPerView: 2,
      },
    },
  };

  getResturantById(id): void {
    this.spinner.show();
    this.resturantService.getResturantById(id).subscribe(
      (data) => {
        if (data['success']) {
          this.spinner.hide();
          this.resturant = data['data'];
        }
      },
      (err) => {
        this.spinner.hide();
        console.error(err);
      }
    );
  }

  getCategory(): void {
    this.spinner.show();
    this.resturantService.getCategory(this.resturant_id).subscribe(
      (data) => {
        if (data['success']) {
          this.spinner.hide();
          this.categories = data['data']['rows'];
        }
      },
      (err) => {
        this.spinner.hide();
        console.error(err);
      }
    );
  }

  onCatChanges(event): void {
    if (event == '') {
      this.subCatId = undefined;
      this.subCats = [];
      this.getItems();
    } else {
      this.getSubCategory(event.target.value);
    }
  }

  onSubCatChanges(event): void {
    this.subCatId = event.target.value;
    this.getItems();
  }

  getSubCategory(id): void {
    this.spinner.show();
    this.resturantService.getSubCategory(id).subscribe(
      (data) => {
        if (data['success']) {
          this.spinner.hide();
          this.subCats = data['data']['rows'];
        }
      },
      (err) => {
        this.spinner.hide();
        console.error(err);
      }
    );
  }

  getItems(): void {
    this.spinner.show();
    this.resturantService
      .getResturantItems(this.resturant_id, this.subCatId)
      .subscribe(
        (data) => {
          if (data['success']) {
            this.spinner.hide();
            this.meals = data['data']['rows'];
            this.meals.map((meal) => {
              meal['selectedQuantity'] = 1;
            });
          }
        },
        (err) => {
          this.spinner.hide();
          console.error(err);
        }
      );
  }

  changeQuantity(event, index): void {
    if (event == '+') {
      this.meals[index]['selectedQuantity'] =
        1 + parseInt(this.meals[index]['selectedQuantity']);
    } else {
      this.meals[index]['selectedQuantity'] =
        this.meals[index]['selectedQuantity'] == 1
          ? 1
          : parseInt(this.meals[index]['selectedQuantity']) - 1;
    }
  }

  addToCart(meal) {
    this.cartService.addToCart(meal);
  }

  getBanners(id) {
    this.spinner.show();
    this.generalService.getBanners(id).subscribe(
      (data) => {
        if (data['success']) {
          this.spinner.hide();
          this.allBanners = data['data']['rows'];
          const arr: string[] = this.allBanners.map((banner) => {
            return `${this.imageBaseURL}/${banner['image']['for']}/${banner['image']['name']}`;
          });
          this.editedBanners = arr;
        }
      },
      (err) => {
        this.spinner.hide();
        console.error(err);
      }
    );
  }

  getTableById(id, table_id): void {
    this.spinner.show();
    this.resturantService.getTableById(id, table_id).subscribe(
      (data) => {
        if (data['success']) {
          this.tableData = data['data'];
          this.openTableModal();
          this.spinner.hide();
        }
      },
      (err) => {
        this.spinner.hide();
        if (err['status'] == 404) {
          this.helperTool.showAlertWithTranslation(
            '',
            'Inside this restaurant there is no table with this number',
            'error'
          );
        }
        console.error(err);
      }
    );
  }

  openTableModal() {
    const initialState = {
      table: this.tableData,
    } as any;
    this.bsModalRef = this.modalService.show(TableModalComponent, {
      initialState,
    });
  }

  changeMe(event): void {
    if (event == 'squares') {
      this.isSquares = true;
      this.isRectangles = false;
    } else {
      this.isSquares = false;
      this.isRectangles = true;
    }
  }
}
