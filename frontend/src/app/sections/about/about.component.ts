import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';


@Component({
  selector: 'About',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  options:AnimationOptions = {
    path:'../../../assets/track_expenses.json'
  }

  title:string = "Organized Transactions";
  about:string = "Credence is a user-friendly financial tool designed to simplify your money management. With Credence, you can effortlessly input and organize your transactions, gaining clear visibility of your financial activities. Keep track of your expenses, monitor your spending patterns, and make informed decisions to achieve your financial goals. Take control of your finances with Credence today.";
}
