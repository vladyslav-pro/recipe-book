import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";

import { AuthComponent } from "./auth.component";
import { SharedModule } from "../shared/shared.module";

const authRouting: Routes = [
   { path: '', component: AuthComponent}
]

@NgModule({
   declarations: [
      AuthComponent
   ],
   imports: [
      FormsModule,
      RouterModule.forChild(authRouting),
      SharedModule
   ]
})
export class AuthModule {}