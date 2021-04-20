import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { QrScannerComponent } from 'angular2-qrscanner';
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
  constructor(private router: Router, private cartService: CartService) {
    this.router.events
      .pipe(
        filter((evt: any) => evt instanceof RoutesRecognized),
        pairwise()
      )
      .subscribe((events: RoutesRecognized[]) => {
        if (events[0].urlAfterRedirects == '/order/checkout') {
          this.previousUrl = events[0].urlAfterRedirects;
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
          if (dev.label.includes('front')) {
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
      if (this.previousUrl) {
        this.cartService.tableNumber = result.split('?table=', 2);
        this.router.navigate([this.previousUrl]);
      } else {
        window.location.href = result;
      }
    });
  }
}
