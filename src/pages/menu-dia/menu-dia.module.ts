import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuDiaPage } from './menu-dia';

@NgModule({
  declarations: [
    MenuDiaPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuDiaPage),
  ],
})
export class MenuDiaPageModule {}
