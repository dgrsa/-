import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isOpen: boolean = false;
  sidebarFlag: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  toggleNav(e: any) {
    if (e == 'open') {
      this.isOpen = true;
      this.sidebarFlag = true;
    } else if (e == 'close') {
      this.isOpen = false;
      this.sidebarFlag = false;
    }
  }

  onClickedOutside(e: Event, type: any) {
    if (type) {
      this.sidebarFlag = false;
    } else {
      this.toggleNav('close');
    }
  }
}
