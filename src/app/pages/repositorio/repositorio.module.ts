import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RepositorioPageRoutingModule } from './repositorio-routing.module';

import { RepositorioPage } from './repositorio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RepositorioPageRoutingModule
  ],
  declarations: [RepositorioPage]
})
export class RepositorioPageModule {}
