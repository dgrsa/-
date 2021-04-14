import { Component, OnInit, ViewChild } from '@angular/core';
import { QrScannerComponent } from 'angular2-qrscanner';

@Component({
  selector: 'app-scan-code',
  templateUrl: './scan-code.component.html',
  styleUrls: ['./scan-code.component.scss'],
})
export class ScanCodeComponent implements OnInit {
  @ViewChild(QrScannerComponent, { static: true })
  qrScannerComponent: QrScannerComponent;
  constructor() {}

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
      // window.location.href = result;
      console.log(result);
    });
  }
}
