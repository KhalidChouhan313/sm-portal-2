import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppSettingsComponent } from './app-settings.component';

const appSettingsRoutes: Routes = [
  {
    path: '',
    component: AppSettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(appSettingsRoutes)],
  exports: [RouterModule],
})
export class AppSettingsModule { }