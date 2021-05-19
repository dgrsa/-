import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationsRoutingModule } from './notifications-routing.module';
import { NotificationsComponent } from './notifications.component';
import { TranslateModule } from '@ngx-translate/core';
import { MomentModule } from 'ngx-moment';

@NgModule({
  declarations: [NotificationsComponent],
  imports: [
    CommonModule,
    NotificationsRoutingModule,
    TranslateModule.forChild(),
    MomentModule
  ],
})
export class NotificationsModule {}
