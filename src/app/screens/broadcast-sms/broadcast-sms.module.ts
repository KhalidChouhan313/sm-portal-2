import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BroadcastSmsComponent } from './broadcast-sms.component';

const broadcastSms: Routes = [
    {
        path: '',
        component: BroadcastSmsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(broadcastSms)],
    exports: [RouterModule],
})
export class broadcastSmsModule { }