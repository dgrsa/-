import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
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
}
