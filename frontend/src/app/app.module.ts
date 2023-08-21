import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { HeroComponent } from './sections/hero/hero.component';

import { ServicesComponent } from './sections/services/services.component';
import { ServiceCardComponent } from './components/service-card/service-card.component';
import { AboutComponent } from './sections/about/about.component';
import { FooterComponent } from './sections/footer/footer.component';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { SplitBillComponent } from './pages/split-bill/split-bill.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ButtonComponent } from './components/button/button.component';
import { FormsModule } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { AuthenticateComponent } from './pages/authenticate/authenticate.component';
import { FormComponentComponent } from './components/form-component/form-component.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from  '@angular/common/http';
import { TokenInterceptor } from './HttpInterCeptors/token-interceptor.interceptor';
import { HomeComponent } from './pages/home/home.component';
import { ProductComponent } from './pages/product/product.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BillsComponent } from './pages/bills/bills.component';
import { NavlinkComponent } from './components/navlink/navlink.component';
import { TransactioncardComponent } from './components/transactioncard/transactioncard.component';
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HeroComponent,
    ServicesComponent,
    ServiceCardComponent,
    AboutComponent,
    FooterComponent,
    DashBoardComponent,
    SplitBillComponent,
    RoomsComponent,
    UserProfileComponent,
    ButtonComponent,
    AuthenticateComponent,
    FormComponentComponent,
    HomeComponent,
    ProductComponent,
    NavBarComponent,
    BillsComponent,
    NavlinkComponent,
    TransactioncardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory })
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
