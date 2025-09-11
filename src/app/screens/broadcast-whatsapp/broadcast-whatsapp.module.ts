import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BroadcastWhatsappComponent } from './broadcast-whatsapp.component';

const broadcastWhatsapp: Routes = [
    {
        path: '',
        component: BroadcastWhatsappComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(broadcastWhatsapp)],
    exports: [RouterModule],
})
export class broadcastWhatsappModule { }