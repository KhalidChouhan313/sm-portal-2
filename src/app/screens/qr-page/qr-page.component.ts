import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';
import { QrcodeService } from 'src/services/qrcode/qrcode.service';
import {
  CornerDotType,
  CornerSquareType,
  DotType,
  ErrorCorrectionLevel,
  NgxQrcodeStylingComponent,
  Options,
  ShapeType,
  TypeNumber,
} from 'ngx-qrcode-styling';
import { Router } from '@angular/router';
@Component({
  selector: 'app-qr-page',
  templateUrl: './qr-page.component.html',
  styleUrls: ['./qr-page.component.css'],
})
export class QrPageComponent {
  @ViewChild(NgxQrcodeStylingComponent)
  qrCodeComponent!: NgxQrcodeStylingComponent;

  public qrText: string = 'https://www.facebook.com/';
  public width: number = 300;
  public height: number = 300;
  public margin: number = 0;
  public image: string =
    'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg';

  public dotsColorType: string = '#000000';
  public singleColor: string = '#000000';
  public startColor: string = '#2BE531';
  public endColor: string = '#F31D23';
  public shape: ShapeType = 'circle';
  public selectedShape: string = 'square';

  public imageSize: number = 30;
  public imagePosition: string = 'center';

  public cornersSquareType: CornerSquareType = 'square';
  public cornersSquareColorType: string = 'single';
  public cornersSquareSingleColor: string = '#000000';
  public cornersSquareStartColor: string = '#FF12FF';
  public cornersSquareEndColor: string = '#E09515';

  // Rounded & Rotation
  public cornersSquareRoundedType: string = 'radial';
  public cornersSquareRotation: number = 0;

  // Corners Dots Options
  public cornersDotsType: string = 'square';
  public cornersDotsColorType: string = 'single';
  public cornersDotsSingleColor: string = '#000000';
  public cornersDotsStartColor: string = '#34C3FF';
  public cornersDotsEndColor: string = '#E02323';

  // Background Options
  public bgColorType: string = 'single';
  public bgSingleColor: string = '#ffffff';
  public bgStartColor: string = '#FFFF00';
  public bgEndColor: string = '#333333';

  public config: Options = {
    width: this.width,
    height: this.height,
    data: this.qrText,
    margin: this.margin,
    image: this.image,
    shape: this.shape,
    dotsOptions: {
      type: this.selectedShape as DotType,
      color: this.singleColor,
    },
    cornersSquareOptions: {
      type: this.cornersSquareType as CornerSquareType,
      color: this.cornersSquareSingleColor,
    },
    cornersDotOptions: {
      type: this.cornersDotsType as CornerDotType,
      color: this.cornersDotsSingleColor,
    },
    backgroundOptions: {
      color: this.bgSingleColor,
    },
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: 0,
      imageSize: this.imageSize / 100,
    },
  };

  constructor(private qrcodeService: QrcodeService, private router: Router) {}

  currentUser: any;
  allQrCodes: any = null;
  pagination: any = null;
  currentPage: any = 1;
  totalPage: any = 0;
  activeQrDetails: any = null;
  showUniversalQrGenerator = false;

  isQrListTitleEditable = true;
  isQrListDescriptionEditable = true;
  isQrListPickupLocationEditable = true;
  qrListTitle: string = '';
  qrListDescription: string = '';
  qrListPickupLocation: string = '';

  isDeleteModalOpen = false;
  deleteIndex: any;
  isChecked = false;

  isNotCustomizable = true;

  currentQrId = '';

  ngOnInit() {
    let user = JSON.parse(localStorage.getItem('user_details'));
    this.currentUser = user;
    // console.log(user);
    if (!user) {
      this.router.navigateByUrl('login');
    } else {
      this.fetchQrList();
    }
  }
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPage) {
      this.currentPage = page;
      this.fetchQrList();
    }
  }

  fetchQrList() {
    this.qrcodeService
      .getAllQrCodes(this.currentUser._id, this.currentPage)
      .subscribe((res) => {
        // console.log(res);
        this.allQrCodes = res.data.location.records.concat(
          res.data.text.records
        );
        let locationPagination = [
          res.data.location.totalPages,
          res.data.location.currentPage,
        ];

        let textPagination = [
          res.data.text.totalPages,
          res.data.text.currentPage,
        ];
        this.pagination = {
          location: locationPagination,
          text: textPagination,
        };
        // console.log(this.pagination);
        this.updateFilteredQrCodes();
        // console.log({
        //   currentPage: this.currentPage,
        //   pages: this.totalPage,
        // });
        // console.log(this.allQrCodes);
        if (res.length == 0) {
          this.showUniversalQrGenerator = true;
        }
      });
  }
  filteredQrCodes = [];
  updateFilteredQrCodes(): void {
    if (this.activeButton === 'smart') {
      this.filteredQrCodes = this.allQrCodes.filter(
        (item) => item.type === 'location'
      );
      this.totalPage = this.pagination.location[0];
      this.currentPage = this.pagination.location[1];
    } else if (this.activeButton === 'universal') {
      this.filteredQrCodes = this.allQrCodes.filter(
        (item) => item.type === 'text'
      );
      this.totalPage = this.pagination.text[0];
      this.currentPage = this.pagination.text[1];
    } else {
      this.filteredQrCodes = this.allQrCodes;
    }
  }

  showLoader: boolean = true;

  activeModalIndex = 0; // Initially, first tab is active

  setModalActive(index: number) {
    this.activeModalIndex = index;
  }

  activeButton: string = 'universal';

  inputUniversalTitleName: string = '';
  inputUniversalPreferenceText: string = '';
  universalQrData: string = '';
  universalQrString: any = '';
  openUniversalQrCustomize = false;
  openUniversalQrCustomizeFromDetails = false;

  inputSmartTitleName: string = '';
  inputSmartPickup: string = '';
  inputSmartPickupLat: any;
  inputSmartPickupLng: any;
  inputSmartPrefilledText = '';
  smartQrData: string = '';
  smartQrString = '';

  qrString: any;

  haveUniversal = true;
  haveSmart = true;

  @ViewChild('qrCanvas') qrCanvas!: ElementRef;

  setActive(buttonType: string) {
    this.activeButton = buttonType;
  }

  // universal qr code

  generateUniversalQRCode() {
    this.isNotCustomizable = true;
    const dataObject = {
      name: this.inputUniversalTitleName,
      type: 'text',
      text: this.inputUniversalPreferenceText,
      userId: this.currentUser._id,
    };
    this.universalQrData = JSON.stringify(dataObject);

    this.qrcodeService.generateCode(dataObject).subscribe((res) => {
      // console.log(res);
      this.universalQrString = `${res.URL}`;
      this.qrString = `${res.URL}`;
      this.smartQrString = null;
      this.currentQrId = res._id;

      setTimeout(() => {
        const qrElement = document.querySelector(
          'ngx-qrcode-styling'
        ) as HTMLElement;

        if (qrElement) {
          html2canvas(qrElement)
            .then((canvas) => {
              const qrImgBase64 = canvas.toDataURL('image/png');

              // Convert Base64 to Blob
              const qrBlob = this.base64ToBlob(qrImgBase64, 'image/png');

              // Create FormData
              const formData = new FormData();
              formData.append('qrCodeImage', qrBlob, 'qrcode.png');

              // console.log('FormData:', formData);

              // Send to backend
              this.qrcodeService.updateQrImg(res._id, formData).subscribe(
                (qrRes) => {
                  // console.log(qrRes);
                  this.selectedItemIndex = null;
                  this.fetchQrList();
                },
                (qrErr) => {}
              );
            })
            .catch((err) => {});
        } else {
          console.error('QR element not found!');
        }
        this.showLoader = false;
        this.isNotCustomizable = false;
      }, 4000);
    });
  }

  // Function to convert Base64 to Blob
  base64ToBlob(base64: string, contentType: string): Blob {
    const byteCharacters = atob(base64.split(',')[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);

      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      byteArrays.push(new Uint8Array(byteNumbers));
    }

    return new Blob(byteArrays, { type: contentType });
  }

  downloadUniversalQRCode() {
    setTimeout(() => {
      const canvas = document.querySelector(
        'qrcode canvas'
      ) as HTMLCanvasElement;
      if (canvas) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'qr-code.png';
        link.click();
      } else {
        console.error('Canvas not found.');
      }
    }, 500); // Ensure QR code is rendered before downloading
  }

  // Smart location qr code

  generateSmartQRCode() {
    this.isNotCustomizable = true;
    const dataObject = {
      name: this.inputSmartTitleName,
      type: 'location',
      text: this.inputSmartPrefilledText,
      userId: this.currentUser._id,
      pickupDetails: {
        address: this.inputSmartPickup,
        lat: this.inputSmartPickupLat,
        lng: this.inputSmartPickupLng,
      },
    };
    this.smartQrData = JSON.stringify(dataObject);

    this.qrcodeService.generateCode(dataObject).subscribe((res) => {
      this.smartQrString = `${res.URL}`;
      this.qrString = `${res.URL}`;
      // console.log(this.qrString);
      this.universalQrString = null;
      this.currentQrId = res._id;
      // console.log('smart qr link', res);

      setTimeout(() => {
        const qrElement = document.querySelector(
          'ngx-qrcode-styling'
        ) as HTMLElement;

        if (qrElement) {
          html2canvas(qrElement)
            .then((canvas) => {
              const qrImgBase64 = canvas.toDataURL('image/png');

              // Convert Base64 to Blob
              const qrBlob = this.base64ToBlob(qrImgBase64, 'image/png');

              // Create FormData
              const formData = new FormData();
              formData.append('qrCodeImage', qrBlob, 'qrcode.png');

              // console.log('FormData:', formData);

              // Send to backend
              this.qrcodeService.updateQrImg(res._id, formData).subscribe(
                (qrRes) => {
                  let user = JSON.parse(localStorage.getItem('user_details'));
                  this.currentUser = user;
                  // console.log(qrRes);
                  this.selectedItemIndex = null;
                  this.fetchQrList();
                },
                (qrErr) => {}
              );
            })
            .catch((err) => {});
        } else {
          console.error('QR element not found!');
        }
        this.showLoader = false;
        this.isNotCustomizable = false;
      }, 4000);
    });
  }

  private timeout: any;
  locations = [];
  locationLoader = false;
  getLocations() {
    // console.log(this.inputSmartPickup);
    this.locationLoader = true;
    this.locations = [];

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      const obj = {
        qry: this.inputSmartPickup,
        botAdmin: {
          pickup_point_latitude: 24.8607,
          pickup_point_longitude: 67.0011,
          pickup_radius: 100,
        },
      };
      this.qrcodeService.getPickupLocations(obj).subscribe((res) => {
        this.locations = res.addresses;
        this.locationLoader = false;
        // console.log(res);
      });
    }, 1500);
  }

  private timeoutFromDetails: any;
  locationsFromDetails = [];
  locationLoaderFromDetails = false;
  getLocationsFromDetails() {
    // console.log('working');
    this.locationLoaderFromDetails = true;
    this.locationsFromDetails = [];
    clearTimeout(this.timeoutFromDetails);
    this.timeout = setTimeout(() => {
      const obj = {
        qry: this.qrListPickupLocation,
        botAdmin: {
          pickup_point_latitude: 24.8607,
          pickup_point_longitude: 67.0011,
          pickup_radius: 100,
        },
      };
      this.qrcodeService.getPickupLocations(obj).subscribe((res) => {
        this.locationsFromDetails = res.addresses;
        this.locationLoaderFromDetails = false;
        // console.log(res);
      });
    }, 1500);
  }

  selectLocation(i) {
    this.inputSmartPickup = this.locations[i].title;
    this.inputSmartPickupLat = this.locations[i].lat;
    this.inputSmartPickupLng = this.locations[i].lng;

    this.locations = [];
  }

  selectLocationFromDetails(i) {
    this.inputSmartPickup = this.locationsFromDetails[i].title;
    this.qrListPickupLocation = this.locationsFromDetails[i].title;
    this.inputSmartPickupLat = this.locationsFromDetails[i].lat;
    this.inputSmartPickupLng = this.locationsFromDetails[i].lng;

    this.locationsFromDetails = [];
  }

  downloadSmartQRCode() {
    setTimeout(() => {
      const canvas = document.querySelector(
        'qrcode canvas'
      ) as HTMLCanvasElement;
      if (canvas) {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'qr-code.png';
        link.click();
      } else {
        console.error('Canvas not found.');
      }
    }, 500); // Ensure QR code is rendered before downloading
  }

  selectedItemIndex: number | null = null;
  currentQr = null;
  activeQrId = null;

  qrDetailImgLoader = false;
  toggleDetails(index: number): void {
    this.qrDetailImgLoader = true;
    this.currentQr = '';
    const selectedItem = this.filteredQrCodes[index]; // ✅ filtered list, not all

    if (!selectedItem) return;

    if (this.selectedItemIndex !== index) {
      let qrCodeId = selectedItem.id;
      this.qrcodeService.getQrCodeDetails(qrCodeId).subscribe((res) => {
        this.activeQrDetails = res;

        this.qrListTitle = this.activeQrDetails.recordWithoutPublicId[0].name;

        this.qrListDescription =
          this.activeQrDetails.recordWithoutPublicId[0].text;

        this.qrListPickupLocation =
          this.activeQrDetails.recordWithoutPublicId[0].pickupDetails
            ?.address || '';

        this.currentQr = this.activeQrDetails.recordWithoutPublicId[0].url;
        this.isStatusChecked =
          this.activeQrDetails.recordWithoutPublicId[0].status;

        this.activeQrId = this.activeQrDetails.recordWithoutPublicId[0]._id;
        this.qrDetailImgLoader = false;
        // console.log(res);
        if (index === this.filteredQrCodes.length - 1) {
          setTimeout(() => {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: 'smooth',
            });
          }, 200);
        }
      });
    }

    this.selectedItemIndex = this.selectedItemIndex === index ? null : index;
    this.isQrListTitleEditable = true;
    this.isQrListDescriptionEditable = true;
    this.isQrListPickupLocationEditable = true;
  }

  deleteQr(index: number = this.deleteIndex) {
    let qrCodeId = this.filteredQrCodes[index].id;
    this.qrcodeService.deleteQrCode(qrCodeId).subscribe((res) => {
      // console.log(res);
      this.filteredQrCodes.splice(index, 1); // Remove the deleted QR code from the list
      // this.toggleDetails(index);
      this.selectedItemIndex = null;
      this.fetchQrList();
      if (this.allQrCodes.length == 0) {
        this.showUniversalQrGenerator = true;
      }
    });
  }

  updateQrTitle(index) {
    let qrCodeId = this.activeQrDetails.recordWithoutPublicId[0]._id;
    // console.log(qrCodeId);

    const dataObject = {
      name: this.qrListTitle,
      text: this.activeQrDetails.recordWithoutPublicId[0].text,
      // pickupDetails: {
      //   address: this.activeQrDetails.pickupDetails.address,
      //   lat: this.activeQrDetails.pickupDetails.lat,
      //   lng: this.activeQrDetails.pickupDetails.lng,
      // },
    };
    this.qrcodeService.updateQrCode(qrCodeId, dataObject).subscribe((res) => {
      // console.log(res);
      alert('Updated Successfully');
      this.activeQrDetails.recordWithoutPublicId[0].name = this.qrListTitle;
      this.activeQrDetails.recordWithoutPublicId[0].text =
        this.qrListDescription;
      if (this.activeQrDetails.recordWithoutPublicId[0]?.pickupDetails) {
        this.activeQrDetails.recordWithoutPublicId[0].pickupDetails.address =
          this.qrListPickupLocation;
      }

      this.isQrListTitleEditable = true;
      this.fetchQrList();
    });
  }

  cancelQrTitle(index) {
    this.qrListTitle = this.activeQrDetails.recordWithoutPublicId[0].name;
    this.isQrListTitleEditable = true;
  }

  updateQrText(index) {
    let qrCodeId = this.activeQrDetails.recordWithoutPublicId[0]._id;

    const dataObject = {
      name: this.activeQrDetails.recordWithoutPublicId[0].name,
      text: this.qrListDescription,
      // pickupDetails: {
      //   address: this.activeQrDetails.pickupDetails.address,
      //   lat: this.activeQrDetails.pickupDetails.lat,
      //   lng: this.activeQrDetails.pickupDetails.lng,
      // },
    };
    this.qrcodeService.updateQrCode(qrCodeId, dataObject).subscribe((res) => {
      // console.log(res);
      alert('Updated Successfully');

      this.activeQrDetails.recordWithoutPublicId[0].title = this.qrListTitle;
      this.activeQrDetails.recordWithoutPublicId[0].text =
        this.qrListDescription;
      if (this.activeQrDetails.recordWithoutPublicId[0]?.pickupDetails) {
        this.activeQrDetails.recordWithoutPublicId[0].pickupDetails.address =
          this.qrListPickupLocation;
      }

      this.isQrListDescriptionEditable = true;
      this.fetchQrList();
    });
  }

  cancelQrText(index) {
    this.qrListDescription = this.activeQrDetails.recordWithoutPublicId[0].text;
    this.isQrListDescriptionEditable = true;
  }

  updateQrPickupLocation(index) {
    let qrCodeId = this.activeQrDetails.recordWithoutPublicId[0]._id;
    alert('Updated Successfully');

    const dataObject = {
      name: this.activeQrDetails.recordWithoutPublicId[0].name,
      text: this.activeQrDetails.recordWithoutPublicId[0].text,
      pickupDetails: {
        address: this.qrListPickupLocation,
        lat: this.activeQrDetails.recordWithoutPublicId[0].pickupDetails.lat,
        lng: this.activeQrDetails.recordWithoutPublicId[0].pickupDetails.lng,
      },
    };
    this.qrcodeService.updateQrCode(qrCodeId, dataObject).subscribe((res) => {
      // console.log(res);
      this.activeQrDetails.recordWithoutPublicId[0].title = this.qrListTitle;
      this.activeQrDetails.recordWithoutPublicId[0].text =
        this.qrListDescription;
      this.activeQrDetails.recordWithoutPublicId[0].pickupDetails.address =
        this.qrListPickupLocation;

      this.isQrListPickupLocationEditable = true;
      this.fetchQrList();
    });
  }

  cancelQrPickupLocation(index) {
    this.qrListPickupLocation = this.activeQrDetails.pickupDetails.address;
    this.isQrListPickupLocationEditable = true;
  }
  isStatusChecked: any;
  updateQrStatus(index: number, status: string) {
    let qrCodeId = this.activeQrDetails.recordWithoutPublicId[0]._id;
    // this.filteredQrCodes[index].status = !this.filteredQrCodes[index].status;
    const dataObject = {
      status: status,
    };

    this.qrcodeService
      .updateQrCodeStatus(qrCodeId, dataObject)
      .subscribe((res) => {
        // console.log(res);
        this.filteredQrCodes[index].status = status;
      });
  }

  downloadQrCode(url: string, filename: string = 'image.jpg') {
    // Fetch the image as a blob to avoid CORS issues
    fetch(url, { mode: 'cors' })
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link); // Required for Firefox
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl); // Clean up
      })
      .catch((error) => console.error('Download failed:', error));
  }

  downloadGenQrCode() {
    fetch(this.allQrCodes[this.allQrCodes.length - 1].qrCodeImage, {
      mode: 'cors',
    })
      .then((response) => response.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'image.jpg';
        document.body.appendChild(link); // Required for Firefox
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl); // Clean up
      })
      .catch((error) => console.error('Download failed:', error));
  }

  directToQrStats(index: number) {
    this.qrcodeService
      .getQrCodeDetails(this.filteredQrCodes[index].id)
      .subscribe((res) => {
        this.router.navigate(['chatbot/QR-code/QR-stats'], {
          queryParams: {
            qrId: this.filteredQrCodes[index].id,
            qrURL: res.recordWithoutPublicId[0].url,
            title: this.filteredQrCodes[index].title,
          },
        });
      });
  }

  copyToClipboard() {
    navigator.clipboard
      .writeText(this.activeQrDetails?.recordWithoutPublicId[0].url)
      .then(() => {
        alert('URL copied to clipboard!');
      });
  }

  copyQrLink() {
    navigator.clipboard
      .writeText(this.allQrCodes[this.allQrCodes.length - 1].qrCodeImage)
      .then(() => {
        alert('URL copied to clipboard!');
      });
  }

  toggleDeleteModal(i) {
    if (!this.isDeleteModalOpen) {
      this.isDeleteModalOpen = true;
      this.deleteIndex = i;
    } else {
      this.isDeleteModalOpen = false;
      this.deleteIndex = null;
    }
  }

  showScrollButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.pageYOffset > 200;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  qrShouldRender = true;
  cShowQrLoader = false;

  dotStyle: DotType = 'rounded';
  selectedDotStyle: DotType = 'rounded';

  dotColor = 'black';
  selectedDotColor = 'black';

  dotGradient1 = '';
  dotGradient2 = '';

  eyeExternal: CornerSquareType = 'square';
  selectedEyeExternal: CornerSquareType = 'square';
  eyeInternal: CornerDotType = 'square';
  selectedEyeInternal: CornerDotType = 'square';

  eyeColor = 'black';

  eyeGradient1 = '';
  eyeGradient2 = '';

  bgColor = 'white';

  bgGradient1 = '';
  bgGradient2 = '';

  typeNum: TypeNumber = 0;

  errorCorrection: ErrorCorrectionLevel = 'Q';

  logoDataUrl = '';

  isGradient: boolean = false;
  isQrChanged: boolean = false;
  regenQr() {
    this.isQrChanged = true;
    this.qrShouldRender = false;
    // this.cShowQrLoader = true;

    setTimeout(() => {
      // this.cShowQrLoader = false;
      this.qrShouldRender = true;
    }, 0); // 1.5 seconds
  }

  resetQr() {
    this.dotStyle = 'rounded';
    this.selectedDotStyle = 'rounded';

    this.dotColor = 'black';
    this.selectedDotColor = 'black';

    this.dotGradient1 = '';
    this.dotGradient2 = '';

    this.eyeExternal = 'square';
    this.selectedEyeExternal = 'square';
    this.eyeInternal = 'square';
    this.selectedEyeInternal = 'square';

    this.eyeColor = 'black';

    this.eyeGradient1 = '';
    this.eyeGradient2 = '';

    this.bgColor = 'white';

    this.bgGradient1 = '';
    this.bgGradient2 = '';

    this.errorCorrection = 'Q';

    this.logoDataUrl = '';

    this.isGradient = false;

    // this.universalQrData = '';
    // this.universalQrString = '';
    this.showUniversalQrGenerator = false;
  }

  // qrCombo to cover all possible combinations for dot and corner styles
  qrCombo:
    | 'dotSolid_cornerSolid_solidBg'
    | 'dotSolid_cornerSolid_gradientBg'
    | 'dotSolid_cornerGradient_solidBg'
    | 'dotSolid_cornerGradient_gradientBg'
    | 'dotGradient_cornerSolid_solidBg'
    | 'dotGradient_cornerSolid_gradientBg'
    | 'dotGradient_cornerGradient_solidBg'
    | 'dotGradient_cornerGradient_gradientBg' = 'dotSolid_cornerSolid_solidBg';

  // Function to set QR style based on dot and corner styles
  setQRStyle(
    dotGradient: boolean,
    cornerGradient: boolean,
    bgGradient: boolean
  ) {
    if (dotGradient && cornerGradient && bgGradient) {
      this.qrCombo = 'dotGradient_cornerGradient_gradientBg';
    } else if (dotGradient && cornerGradient && !bgGradient) {
      this.qrCombo = 'dotGradient_cornerGradient_solidBg';
    } else if (dotGradient && !cornerGradient && bgGradient) {
      this.qrCombo = 'dotGradient_cornerSolid_gradientBg';
    } else if (dotGradient && !cornerGradient && !bgGradient) {
      this.qrCombo = 'dotGradient_cornerSolid_solidBg';
    } else if (!dotGradient && cornerGradient && bgGradient) {
      this.qrCombo = 'dotSolid_cornerGradient_gradientBg';
    } else if (!dotGradient && cornerGradient && !bgGradient) {
      this.qrCombo = 'dotSolid_cornerGradient_solidBg';
    } else if (!dotGradient && !cornerGradient && bgGradient) {
      this.qrCombo = 'dotSolid_cornerSolid_gradientBg';
    } else {
      this.qrCombo = 'dotSolid_cornerSolid_solidBg';
    }
    this.regenQr();
  }

  cErrorCorrection(c: ErrorCorrectionLevel) {
    this.errorCorrection = c;
    this.regenQr();
  }

  // Function for selecting dot style
  cDotStyle(s: DotType) {
    this.dotStyle = s;
    this.selectedDotStyle = s;
    this.regenQr();
  }

  // Function for selecting dot color (solid)
  cDotColor(color: string) {
    this.dotColor = color;
    this.selectedDotColor = color;

    const cornerGradient = this.qrCombo.includes('cornerGradient');
    const bgGradient = this.qrCombo.includes('gradientBg');
    this.setQRStyle(false, cornerGradient, bgGradient);
    this.regenQr();
  }

  // Function for selecting dot gradient
  cDotGradient(c1: string, c2: string) {
    this.dotGradient1 = c1;
    this.dotGradient2 = c2;

    const cornerGradient = this.qrCombo.includes('cornerGradient');
    const bgGradient = this.qrCombo.includes('gradientBg');
    this.setQRStyle(true, cornerGradient, bgGradient);
    this.regenQr();
  }

  pDotGradient() {
    const cornerGradient = this.qrCombo.includes('cornerGradient');
    const bgGradient = this.qrCombo.includes('gradientBg');
    this.setQRStyle(true, cornerGradient, bgGradient);
    this.regenQr();
  }

  // Function for selecting eye (corner) color (solid)
  cEyeColor(color: string) {
    this.eyeColor = color;

    const dotGradient = this.qrCombo.includes('dotGradient');
    const bgGradient = this.qrCombo.includes('gradientBg');
    this.setQRStyle(dotGradient, false, bgGradient);
    this.regenQr();
  }

  // Function for selecting eye (corner) gradient
  cEyeGradient(c1: string, c2: string) {
    // this.eyeColor = '';
    this.eyeGradient1 = c1;
    this.eyeGradient2 = c2;

    const dotGradient = this.qrCombo.includes('dotGradient');
    const bgGradient = this.qrCombo.includes('gradientBg');
    this.setQRStyle(dotGradient, true, bgGradient);
    this.regenQr();
  }

  pEyeGradient() {
    const dotGradient = this.qrCombo.includes('dotGradient');
    const bgGradient = this.qrCombo.includes('gradientBg');
    this.setQRStyle(dotGradient, true, bgGradient);
    this.regenQr();
    // console.log(this.eyeGradient1, this.eyeGradient2);
  }

  // Function for selecting internal eye shape
  cEyeInternal(s: CornerDotType) {
    this.eyeInternal = s;
    this.selectedEyeInternal = s;
    this.regenQr();
  }

  // Function for selecting external eye shape
  cEyeExternal(s: CornerSquareType) {
    this.eyeExternal = s;
    this.selectedEyeExternal = s;
    this.regenQr();
  }

  // Function for selecting background color (solid)
  cBgColor(color: string) {
    this.bgColor = color;
    this.setQRStyle(
      this.qrCombo.includes('dotGradient'),
      this.qrCombo.includes('cornerGradient'),
      false
    );
    this.regenQr();
  }

  // Function for selecting background gradient
  cBgGradient(c1: string, c2: string) {
    // console.log(c1, c2);
    this.bgGradient1 = c1;
    this.bgGradient2 = c2;
    this.setQRStyle(
      this.qrCombo.includes('dotGradient'),
      this.qrCombo.includes('cornerGradient'),
      true
    );
    this.regenQr();
  }

  pBgGradient() {
    this.setQRStyle(
      this.qrCombo.includes('dotGradient'),
      this.qrCombo.includes('cornerGradient'),
      true
    );
    this.regenQr();
  }

  // Function for uploading a logo
  cImg(event: Event): void {
    const target = event.target as HTMLInputElement;
    const file: File | null = target.files?.[0] || null;

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.logoDataUrl = reader.result as string;
        this.regenQr(); // ✅ Now it runs AFTER logoDataUrl is set
      };
      reader.readAsDataURL(file);
    } else {
      this.regenQr(); // Fallback if no file selected
    }
  }

  cRemoveLogo(): void {
    this.logoDataUrl = null;
    this.regenQr(); // Regenerate QR without the logo
  }

  saveBtnText = 'Save Changes';

  cSaveQr() {
    this.saveBtnText = 'Saving...';
    const qrElement = document.querySelector(
      'ngx-qrcode-styling'
    ) as HTMLElement;

    setTimeout(() => {
      if (qrElement) {
        html2canvas(qrElement)
          .then((canvas) => {
            const qrImgBase64 = canvas.toDataURL('image/png');

            // Convert Base64 to Blob
            const qrBlob = this.base64ToBlob(qrImgBase64, 'image/png');

            // Create FormData
            const formData = new FormData();
            formData.append('qrCodeImage', qrBlob, 'qrcode.png');

            // console.log('FormData:', formData);

            // Send to backend
            this.qrcodeService
              .updateQrImg(this.currentQrId, formData)
              .subscribe(
                (qrRes) => {
                  let user = JSON.parse(localStorage.getItem('user_details'));
                  this.currentUser = user;
                  // console.log(qrRes);

                  this.openUniversalQrCustomize = false;
                  this.saveBtnText = 'Save Changes';
                  // this.qrcodeService
                  //   .getAllQrCodes(this.currentUser._id)
                  //   .subscribe((res) => {
                  //     this.allQrCodes = res.data.location.concat(res.data.text);
                  //     this.updateFilteredQrCodes();
                  //   });
                  // this.fetchQrList();
                  this.selectedItemIndex = null;
                },
                (qrErr) => {}
              );
          })
          .catch((err) => {});
      } else {
        // console.error('QR element not found!');
      }
    }, 4000);
    this.resetQr();
  }

  cSaveQrFromDetails() {
    this.saveBtnText = 'Saving...';
    const qrElement = document.querySelector(
      'ngx-qrcode-styling'
    ) as HTMLElement;

    setTimeout(() => {
      if (qrElement) {
        html2canvas(qrElement)
          .then((canvas) => {
            const qrImgBase64 = canvas.toDataURL('image/png');

            // Convert Base64 to Blob
            const qrBlob = this.base64ToBlob(qrImgBase64, 'image/png');

            // Create FormData
            const formData = new FormData();
            formData.append('qrCodeImage', qrBlob, 'qrcode.png');

            // console.log('FormData:', formData);

            // Send to backend
            this.qrcodeService.updateQrImg(this.activeQrId, formData).subscribe(
              (qrRes) => {
                let user = JSON.parse(localStorage.getItem('user_details'));
                this.currentUser = user;
                // console.log(qrRes);

                this.openUniversalQrCustomizeFromDetails = false;
                this.saveBtnText = 'Save Changes';
                // this.qrcodeService
                //   .getAllQrCodes(this.currentUser._id)
                //   .subscribe((res) => {
                //     this.allQrCodes = res.data.location.concat(res.data.text);
                //     this.updateFilteredQrCodes();
                //   });
                // this.selectedItemIndex = null;
                // this.fetchQrList();
              },
              (qrErr) => {}
            );
          })
          .catch((err) => {});
      } else {
        // console.error('QR element not found!');
      }
    }, 4000);
    this.resetQr();
  }

  cDownloadQr() {
    const qrElement = document.querySelector(
      'ngx-qrcode-styling'
    ) as HTMLElement;

    const canvas = qrElement.querySelector('canvas') as HTMLCanvasElement;
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'qr-code.png';
      link.click();
    } else {
      console.error('Canvas not found in QR element.');
    }
  }

  searchQrQry = '';
  searchQr() {
    this.qrcodeService
      .getQrCodeByTitle(this.currentUser._id, this.searchQrQry)
      .subscribe((res) => {
        // console.log(res);
        res.qrCodeData.map((item) => {
          item.title = item.name;
        });
        this.allQrCodes = res.qrCodeData;
        this.updateFilteredQrCodes();
      });
  }
}
