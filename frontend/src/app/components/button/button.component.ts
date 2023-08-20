import { Component,Input } from '@angular/core';

@Component({
  selector: 'styledButton',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() value!:string;
  @Input() onClick!:Function;
  
  constructor(){

  }

}
