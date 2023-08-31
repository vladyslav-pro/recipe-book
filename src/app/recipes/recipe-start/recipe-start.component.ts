import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStoregeService } from 'src/app/shared/data-storege.service';

@Component({
  selector: 'app-recipe-start',
  templateUrl: './recipe-start.component.html',
  styleUrls: ['./recipe-start.component.css']
})
export class RecipeStartComponent implements OnInit, OnDestroy{
   getlist: Subscription
   constructor(
      private dataStoregeService: DataStoregeService
   ) {}

   ngOnInit(): void {
     this.getlist = this.dataStoregeService.fetchData().subscribe();
   }

   ngOnDestroy(): void {
      this.getlist.unsubscribe()
   }
}
