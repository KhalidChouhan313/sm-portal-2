import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockListComponent } from './block-list.component';

const blockListRoutes: Routes = [
  {
    path: '',
    component: BlockListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(blockListRoutes)],
  exports: [RouterModule],
})
export class BlockListModule {}