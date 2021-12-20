import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RoutesRecognized,
} from '@angular/router';
import { BarcodeFormat } from '@zxing/library';
import { QrScannerComponent } from 'angular2-qrscanner';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
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

  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;

  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;

  availableDevices: MediaDeviceInfo[];
  deviceCurrent: MediaDeviceInfo;
  deviceSelected: string;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];
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
    // this.scanQrCode();
  }

  // scanQrCode() {
  //   this.qrScannerComponent.getMediaDevices().then((devices) => {
  //     const videoDevices: MediaDeviceInfo[] = [];
  //     for (const device of devices) {
  //       if (device.kind.toString() === 'videoinput') {
  //         videoDevices.push(device);
  //       }
  //     }
  //     if (videoDevices.length > 0) {
  //       let choosenDev;
  //       for (const dev of videoDevices) {
  //         if (dev.label.includes('back')) {
  //           choosenDev = dev;
  //           break;
  //         }
  //       }
  //       if (choosenDev) {
  //         this.qrScannerComponent.chooseCamera.next(choosenDev);
  //       } else {
  //         this.qrScannerComponent.chooseCamera.next(videoDevices[1]);
  //       }
  //     }
  //   });

  //   this.qrScannerComponent.capturedQr.subscribe((result) => {
  //     const splitingArr = result.split('tableId=');
  //     this.cartService.tableNumber = result.split('?table=')[1].split('&')[0];
  //     this.cartService.tableId = splitingArr[1];
  //     this.cartService.resturantId = result.split('details/')[1].split('?')[0];
  //     this.cookieService.set('tableId', this.cartService.tableId, 1);
  //     this.cookieService.set('tableNumber', this.cartService.tableNumber, 1);
  //     this.cookieService.set('resturantId', this.cartService.resturantId, 1);
  //     if (this.previousUrl) {
  //       this.router.navigate([this.previousUrl]);
  //     } else {
  //       if (result.includes('https://')) {
  //         window.location.href = result;
  //       } else {
  //         window.location.href = `https://${result}`;
  //       }
  //     }
  //   });
  // }

  onDeviceChange(device: MediaDeviceInfo) {
    const selectedStr = device?.deviceId || '';
    if (this.deviceSelected === selectedStr) {
      return;
    }
    this.deviceSelected = selectedStr;
    this.deviceCurrent = device || undefined;
  }

  onCodeResult(resultString: string) {
    // this.qrResultString = resultString;
    const splitingArr = resultString.split('tableId=');
    this.cartService.tableNumber = resultString
      .split('?table=')[1]
      .split('&')[0];
    this.cartService.tableId = splitingArr[1];
    this.cartService.resturantId = resultString
      .split('details/')[1]
      .split('?')[0];
    this.cookieService.set('tableId', this.cartService.tableId, 1, '/');
    this.cookieService.set('tableNumber', this.cartService.tableNumber, 1, '/');
    this.cookieService.set('resturantId', this.cartService.resturantId, 1, '/');
    if (this.previousUrl) {
      this.router.navigate([this.previousUrl]);
    } else {
      if (resultString.includes('https://')) {
        window.location.href = resultString;
      } else {
        window.location.href = `https://${resultString}`;
      }
    }
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
    console.log(has);
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }
}
