import { Component } from '@angular/core';
import { AdminService } from 'src/services';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  coverPreview: string | ArrayBuffer | null = null;
  profilePreview: string | ArrayBuffer | null = null;
  isEditing: boolean = false;
  user: any = {};
  orignalUser: any = {};
  isLoading = false;
  constructor(private adminService: AdminService) {}

  ngOnInit() {
    const storedUser = localStorage.getItem('user_details');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
      this.orignalUser = { ...this.user };
    }
  }
  onEdit() {
    this.isEditing = true;
  }
  onCancel() {
    this.isEditing = false;
    this.user = { ...this.orignalUser };
  }
  OnSave() {
  this.isLoading = true;

  const payload = {
    _id: this.user._id,
    user_name: this.user.user_name,
    password: this.user.password,
    email: this.user.email,
    phone: this.user.phone,
    app_link: this.user.app_link,
  };

  this.adminService.updateUser(payload).subscribe({
    next: (res: any) => {
      console.log('User updated:', res);
      localStorage.setItem('user_details', JSON.stringify(this.user));
      this.orignalUser = { ...this.user };
      this.isEditing = false;
    },
    error: (err) => {
      console.error('Update failed:', err);
    },
    complete: () => {
      this.isLoading = false;
    },
  });
}
  uploadCover(file: File) {
    const reader = new FileReader();
    reader.onload = () => (this.coverPreview = reader.result);
    reader.readAsDataURL(file);

    // yahan apna backend / firebase upload ka code call karo
    // this.yourService.uploadCover(file).subscribe(...)
  }
  uploadProfile(file: File) {
    const reader = new FileReader();
    reader.onload = () => (this.profilePreview = reader.result);
    reader.readAsDataURL(file);

    // yahan bhi apna backend / firebase upload logic call karo
  }
  triggerFileInput(id: string) {
    const fileInput = document.getElementById(id) as HTMLInputElement;
    fileInput?.click();
  }
  onCoverSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadCover(file);
    }
  }
  onProfileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadProfile(file);
    }
  }
}
