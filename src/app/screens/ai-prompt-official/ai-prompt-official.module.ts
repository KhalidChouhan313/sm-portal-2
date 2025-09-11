import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AiPromptOfficialComponent } from './ai-prompt-official.component';

const aiPromptOfficialRoutes: Routes = [
  {
    path: '',
    component: AiPromptOfficialComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(aiPromptOfficialRoutes)],
  exports: [RouterModule],
})
export class AiPromptOfficialModule {}
