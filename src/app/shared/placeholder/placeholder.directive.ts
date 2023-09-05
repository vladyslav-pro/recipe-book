/*
   This directive create only as example for old aproach to create window error
*/
import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
   selector: '[appPlaceholder]'
})
export class PlaceholderDirective {
   
   constructor(
      public viewContainerRef: ViewContainerRef
   ) {}
}