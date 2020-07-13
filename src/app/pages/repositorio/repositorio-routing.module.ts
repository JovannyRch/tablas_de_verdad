import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RepositorioPage } from './repositorio.page';

const routes: Routes = [
  {
    path: '',
    component: RepositorioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RepositorioPageRoutingModule {}
