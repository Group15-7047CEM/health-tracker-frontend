import { Component, OnInit, ViewChild, ElementRef,Inject  } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent  implements OnInit {
  public header: any;
  public mySite: any;
  @ViewChild('name', { static: true }) nameRef: ElementRef;
  @ViewChild('weight', { static: true }) weightRef: ElementRef;
  @ViewChild('height', { static: true }) heightRef: ElementRef;
  @ViewChild("myNameElem") myNameElem: ElementRef;
  @ViewChild("myNameFeetElem") myNameFeetElem: ElementRef;

  
 
  value;
  num1;
  num2;
  feets;
  Inches;
  cms;
  Pounds;
  Kgs;
  Ages;
  Males;
  Females;
  BMIS;
  Fats;
  document: any;
  constructor() { }

  ngOnInit() {
  }
  sum() {    
    this.num1 = document.getElementById('number1');
    this.num2 = document.getElementById('number2');
    if (this.num1.value !== '')
    {
        if (this.num2.value !== '') {
          var  a= parseInt(this.num1.value,0);
          var b= parseInt(this.num2.value,0);
           var sum = (a/(b*b))*10000;
         // document.getElementById('result').value  = sum ;
          this.myNameElem.nativeElement.value = sum;
          //parseFloat(<HTMLInputElement>document.getElementById('result')).value = sum;
        } 
      }
}

convert()
   {
     
     var feet = parseInt(this.feets);
     var inches = parseInt(this.Inches);
    var icm;
     var cm;
    icm=(feet*12)+inches;
    cm=icm*2.54;
    
     this.cms = cm;
   }
  pkconvert =function ()
  {
    var pound = parseInt(this.Pounds);
    var kg=0;
    kg=Math.floor( pound*0.452488688 ); 
 
 this.Kgs = kg;
  }

  check = function ()
  {

     var age = this.Ages;
     var bmi = this.BMIS;
  // var sex = parseInt(document.getElementById('male').checked ? 1 : 0);
   var sex = (<HTMLInputElement>document.getElementById('male')).checked ? 1 : 0 ;

  // var sex = (this.Males).checked ? 1 : 0 ;
     var fat;
    
     if(age<=15)
     {
       
        fat=((1.51*bmi)-(0.70*age)-(3.6*sex)+1.4);
       
      }
     else
     {
      
        fat=((1.20*bmi)+(0.23*age)-(10.8*sex)-5.4);
     
     }
     this.Fats = fat;
  }


    
    
  
   
   
 

}
