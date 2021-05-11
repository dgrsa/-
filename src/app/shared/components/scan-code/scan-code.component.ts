import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RoutesRecognized,
} from '@angular/router';
import { QrScannerComponent } from 'angular2-qrscanner';
import { CookieService } from 'ngx-cookie-service';
import { filter, pairwise } from 'rxjs/operators';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-scan-code',
  templateUrl: './scan-code.component.html',
  styleUrls: ['./scan-code.component.scss'],
})
export class ScanCodeComponent implements OnInit {
  @ViewChild(QrScannerComponent, { static: true })
  qrScannerComponent: QrScannerComponent;
  previousUrl: string;
  constructor(
    private router: Router,
    private cartService: CartService,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {
    route.queryParams.subscribe((params) => {
      if (params['checkout']) {
        this.previousUrl = '/order/checkout';
      }
    });
  }

  ngOnInit(): void {
    this.scanQrCode();
  }

  scanQrCode() {
    this.qrScannerComponent.getMediaDevices().then((devices) => {
      const videoDevices: MediaDeviceInfo[] = [];
      for (const device of devices) {
        if (device.kind.toString() === 'videoinput') {
          videoDevices.push(device);
        }
      }
      if (videoDevices.length > 0) {
        let choosenDev;
        for (const dev of videoDevices) {
          if (dev.label.includes('back')) {
            choosenDev = dev;
            break;
          }
        }
        if (choosenDev) {
          this.qrScannerComponent.chooseCamera.next(choosenDev);
        } else {
          this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
        }
      }
    });

    this.qrScannerComponent.capturedQr.subscribe((result) => {
      const splitingArr = result.split('tableId=');
      this.cookieService.set('tableId', splitingArr[1]);
      if (this.previousUrl) {
        this.cartService.tableNumber = result.split('?table=', 2);
        this.cartService.tableNumber = this.cartService.tableNumber[1].slice(
          0,
          1
        );
        this.router.navigate([this.previousUrl]);
      } else {
        if (result.includes('https://')) {
          window.location.href = result;
        } else {
          window.location.href = `https://${result}`;
        }
      }
    });
  }
}
