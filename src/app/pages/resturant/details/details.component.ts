import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  constructor() {}

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
}
