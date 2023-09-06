import { NgModule } from "@angular/core";

import { AlertComponent } from "./alert/alert.component";
import { LoadingSpiner } from "./loading-spiner/loading-spiner.component";
import { DropdownDirective } from "./dropdown.directive";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";
import { CommonModule } from "@angular/common";

@NgModule({
   declarations: [
      AlertComponent,
      LoadingSpiner,
      DropdownDirective,
      // PlaceholderDirective,// only for examle
   ],
   imports: [
      CommonModule
   ],
   exports: [
      AlertComponent,
      LoadingSpiner,
      DropdownDirective,
      // PlaceholderDirective,
      CommonModule
   ],
})
export class SharedModule {}