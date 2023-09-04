import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import {AuthenticateComponent} from './pages/authenticate/authenticate.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { authGuard } from './guards/auth.guard';
import { ProductComponent } from './pages/product/product.component';
import { HomeComponent } from './pages/home/home.component';
import { DashBoardComponent } from './pages/dash-board/dash-board.component';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { SplitBillComponent } from './pages/split-bill/split-bill.component';
import { BillsComponent } from './pages/bills/bills.component';


const routes: Routes = [
  {
    path:'',
    component:LandingComponent,
    
  },
  {
    path:'authenticate',
    component:AuthenticateComponent,
  },
  {
    path:'product',
    component:ProductComponent,
    canActivate:[authGuard],
    canActivateChild:[authGuard],
    children:[
      {
        path:'transactions',
        component:TransactionsComponent
      },
      {
        path:'',
        component:HomeComponent
      },
      {
        path:'dashboard',
        component:DashBoardComponent
      },
      {
        path:'collaborativerooms',
        component:RoomsComponent
      },
      {
        path:'splitbill',
        component:SplitBillComponent
      },
      {
        path:'billstopay',
        component:BillsComponent
      }
    ]
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
