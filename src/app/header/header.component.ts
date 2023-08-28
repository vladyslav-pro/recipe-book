import { Component, EventEmitter, Output } from '@angular/core';
import { DataStoregeService } from '../shared/data-storege.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
   /*
   @Output() featureSelected = new EventEmitter<string>();

   onSelect(feature: string) {
      this.featureSelected.emit(feature);
   }
*/

   constructor(
      private dataStoregeService: DataStoregeService
   ) {}

   onSaveData() {
      this.dataStoregeService.storeRecipes()
   }

   onFetchData() {
      this.dataStoregeService.fetchData().subscribe();
   }
}
