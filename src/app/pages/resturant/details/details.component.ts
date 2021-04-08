import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ResturantService } from 'src/app/shared/services/resturant.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  resturant = {} as any;
  categories = [];
  subCats = [] as any;
  constructor(
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private resturantService: ResturantService
  ) {
    this.route.params.subscribe((params) => {
      this.getResturantById(params['id']);
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
    centeredSlides: true,
    breakpoints: {
      576: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
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
    this.resturantService.getCategory().subscribe(
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
    this.getSubCategory(event.target.value);
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
}
