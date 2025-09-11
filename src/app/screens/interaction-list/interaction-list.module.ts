import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InteractionListComponent } from './interaction-list.component';
import { InteractionFlowComponent } from '../interaction-flow/interaction-flow.component';
import { NgxGraphModule } from '@swimlane/ngx-graph';

const interactionFlowRoutes: Routes = [
  {
    path: '',
    component: InteractionListComponent,
  },
];

@NgModule({
  declarations: [InteractionListComponent, InteractionFlowComponent],
  imports: [RouterModule.forChild(interactionFlowRoutes), CommonModule, NgxGraphModule],
  exports: [RouterModule],
})
export class InteractionListModule { }
