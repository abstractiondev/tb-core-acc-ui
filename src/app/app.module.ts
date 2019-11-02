import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {CoreModule} from "./core/core.module";
import {MainviewComponent} from "./account/mainview/mainview.component";
import {MatSidenavModule} from "@angular/material";
import {SidenavComponent} from "./shared/sidenav.component";
import {GrouplistComponent} from "./account/grouplist/grouplist.component";
import {AccountService} from "./account/shared/account.service";
import {TBHttpService} from "./core/tbhttp.service";
import {TheBallInterfaceService} from "./tbinterface/TheBallInterface.nggen";
import {TheBallService} from "./tbinterface/theball.service";
import {AlertModule} from "ng2-bootstrap"

@NgModule({
  declarations: [
    AppComponent,
    MainviewComponent,
    SidenavComponent,
    GrouplistComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CoreModule,
    MatSidenavModule,
    AlertModule.forRoot()
  ],
  providers: [
    AccountService,
    TBHttpService,
    TheBallInterfaceService,
    TheBallService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
