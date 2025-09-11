import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BotSettingsComponent } from './bot-settings.component';

const botSettingsRoutes: Routes = [
    {
        path: '',
        component: BotSettingsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(botSettingsRoutes)],
    exports: [RouterModule],
})
export class BotSettingsModule { }