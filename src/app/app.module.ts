import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ViewClientComponent } from './page/view-client/view-client.component';
import { DatePipe } from '@angular/common';
import { FilterPipeUser } from './pipes/filterUser.pipe';
import { StorageService } from './service/storage.service';
import { HomeComponent } from './page/home/home.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { InfoProductComponent } from './page/info-product/info-product.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    FilterPipeUser,
    ViewClientComponent,
    HomeComponent,
    CarouselComponent,
    InfoProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    FormBuilder,
    StorageService,
    DatePipe,
    FilterPipeUser
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
