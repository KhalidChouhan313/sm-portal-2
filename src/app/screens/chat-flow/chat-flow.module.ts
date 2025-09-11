import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatFlowComponent } from './chat-flow.component';

const chatflowRoutes: Routes = [
    {
        path: '',
        component: ChatFlowComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(chatflowRoutes)],
    exports: [RouterModule],
})
export class ChatflowModule { }