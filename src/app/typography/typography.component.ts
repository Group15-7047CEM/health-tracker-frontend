import { Component, OnInit, ViewChild, ElementRef,Inject  } from '@angular/core';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
  public header: any;
  public mySite: any;
  @ViewChild('name', { static: true }) nameRef: ElementRef;
  @ViewChild('weight', { static: true }) weightRef: ElementRef;
  @ViewChild('height', { static: true }) heightRef: ElementRef;
  @ViewChild("myNameElem") myNameElem: ElementRef;
 
  value;
  num1;
  num2;
  constructor() { }

  ngOnInit() {
  }
  sum() {    
    console.log("called=========");        
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
          alert("value======"+ sum);
          //parseFloat(<HTMLInputElement>document.getElementById('result')).value = sum;
        } 
      }
}

// convert()
//   {
//     var feet = parseInt(this.document.cform.feet.value);
//     var inches = parseInt(this.document.cform.inches.value);
//     var icm;
//     var cm;
//     icm=(feet*12)+inches;
//     cm=icm*2.54;
//     (<HTMLInputElement>document.getElementById('cm')).value  = String(cm) ;
//      //document.getElementById('cm').value = cm;
//   }
  pkconvert =function ()
  {
    var pound = parseInt(this.document.cform.pound.value);
    var kg=0;
    kg=Math.floor( pound*0.452488688 ); 
    (<HTMLInputElement>document.getElementById('kg')).value  = String(kg) ;                                 
 // document.getElementById('kg').value = kg ;
  }

  check = function ()
  {

     var age = this.document.fform.age.value;
     var bmi = this.document.fform.bmi.value;
   // var sex = parseInt(document.getElementById('male').checked ? 1 : 0);
   var sex = (<HTMLInputElement>document.getElementById('male')).checked ? 1 : 0 ;
     var fat;
     
     if(age<=15)
     {
       
        fat=((1.51*bmi)-(0.70*age)-(3.6*this.sex)+1.4);
       
      }
     else
     {
      
        fat=((1.20*bmi)+(0.23*age)-(10.8*this.sex)-5.4);
     
     }
     (<HTMLInputElement>document.getElementById('fat')).value  = String(fat) ;  
     (<HTMLInputElement>document.getElementById('fat')).value = fat;
  }


    
    
  
   
   
 

}
