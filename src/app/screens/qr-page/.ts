// import { CommonModule } from '@angular/common';
// import { Component, ViewChild } from '@angular/core';
// import {
//   CornerDotType,
//   CornerSquareType,
//   DotType,
//   NgxQrcodeStylingComponent,
//   Options,
//   ShapeType,
// } from 'ngx-qrcode-styling';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-home',
//   standalone: true,
//   imports: [CommonModule, NgxQrcodeStylingComponent, FormsModule],
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.scss'],
// })
// export class HomeComponent {
//   @ViewChild(NgxQrcodeStylingComponent)
//   qrCodeComponent!: NgxQrcodeStylingComponent;

//   public qrText: string = 'https://www.facebook.com/';
//   public width: number = 300;
//   public height: number = 300;
//   public margin: number = 0;
//   public image: string =
//     'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg';

//   public dotsColorType: string = '#000000';
//   public singleColor: string = '#000000';
//   public startColor: string = '#2BE531';
//   public endColor: string = '#F31D23';
//   public shape: ShapeType = 'circle';
//   public selectedShape: string = 'square';

//   public imageSize: number = 30; // New Image Size Option
//   public imagePosition: string = 'center';

//   // Corners Square Options
//   public cornersSquareType: CornerSquareType = 'square';
//   public cornersSquareColorType: string = 'single';
//   public cornersSquareSingleColor: string = '#000000';
//   public cornersSquareStartColor: string = '#FF12FF';
//   public cornersSquareEndColor: string = '#E09515';

//   // Rounded & Rotation
//   public cornersSquareRoundedType: string = 'radial';
//   public cornersSquareRotation: number = 0;

//   // Corners Dots Options
//   public cornersDotsType: string = 'square';
//   public cornersDotsColorType: string = 'single';
//   public cornersDotsSingleColor: string = '#000000';
//   public cornersDotsStartColor: string = '#34C3FF';
//   public cornersDotsEndColor: string = '#E02323';

//   // Background Options
//   public bgColorType: string = 'single';
//   public bgSingleColor: string = '#ffffff';
//   public bgStartColor: string = '#FFFF00';
//   public bgEndColor: string = '#333333';

//   public config: Options = {
//     width: this.width,
//     height: this.height,
//     data: this.qrText,
//     margin: this.margin,
//     image: this.image,
//     shape: this.shape,
//     dotsOptions: {
//       type: this.selectedShape as DotType,
//       color: this.singleColor,
//     },
//     cornersSquareOptions: {
//       type: this.cornersSquareType as CornerSquareType,
//       color: this.cornersSquareSingleColor,
//     },
//     cornersDotOptions: {
//       type: this.cornersDotsType as CornerDotType,
//       color: this.cornersDotsSingleColor,
//     },
//     backgroundOptions: {
//       color: this.bgSingleColor,
//     },
//     imageOptions: {
//       crossOrigin: 'anonymous',
//       margin: 0,
//       imageSize: this.imageSize / 100,
//     },
//   };

//   updateQRCode() {
//     let dotsOptions: any = { type: this.selectedShape };

//     if (this.dotsColorType === 'single') {
//       dotsOptions.color = this.singleColor;
//     } else {
//       dotsOptions.gradient = {
//         type: 'linear',
//         colorStops: [
//           { offset: 0, color: this.startColor },
//           { offset: 1, color: this.endColor },
//         ],
//       };
//     }

//     let cornersSquareOptions: any = { type: this.cornersSquareType };
//     if (this.cornersSquareColorType === 'single') {
//       cornersSquareOptions.color = this.cornersSquareSingleColor;
//     } else {
//       cornersSquareOptions.gradient = {
//         type: 'linear',
//         colorStops: [
//           { offset: 0, color: this.cornersSquareStartColor },
//           { offset: 1, color: this.cornersSquareEndColor },
//         ],
//       };
//     }
//     let cornersDotsOptions: any = { type: this.cornersDotsType };
//     if (this.cornersDotsColorType === 'single') {
//       cornersDotsOptions.color = this.cornersDotsSingleColor;
//     } else {
//       cornersDotsOptions.gradient = {
//         type: 'linear',
//         colorStops: [
//           { offset: 0, color: this.cornersDotsStartColor },
//           { offset: 1, color: this.cornersDotsEndColor },
//         ],
//       };
//     }

//     let backgroundOptions: any = {};
//     if (this.bgColorType === 'single') {
//       backgroundOptions.color = this.bgSingleColor;
//     } else {
//       backgroundOptions.gradient = {
//         type: 'linear',
//         colorStops: [
//           { offset: 0, color: this.bgStartColor },
//           { offset: 1, color: this.bgEndColor },
//         ],
//       };
//     }

//     this.config = {
//       ...this.config,
//       width: this.width,
//       height: this.height,
//       margin: this.margin,
//       data: this.qrText,
//       shape: this.shape,
//       dotsOptions: dotsOptions,
//       cornersSquareOptions: cornersSquareOptions,
//       cornersDotOptions: cornersDotsOptions,
//       backgroundOptions: backgroundOptions,
//       imageOptions: {
//         ...this.config.imageOptions,
//         imageSize: this.imageSize / 100,
//       },
//     };

//     if (this.qrCodeComponent) {
//       this.qrCodeComponent.update(this.config, this.config);
//     }
//   }

//   onFileSelected(event: any) {
//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e: any) => {
//         this.image = e.target.result;

//         this.config = {
//           ...this.config,
//           image: this.image,
//         };

//         this.qrCodeComponent.update(this.config, this.config);
//       };
//       reader.readAsDataURL(file);
//     }
//   }

//   downloadQrCode(format: 'svg' | 'png') {
//     if (this.qrCodeComponent) {
//       this.qrCodeComponent.download(format);
//     }
//   }
// }
