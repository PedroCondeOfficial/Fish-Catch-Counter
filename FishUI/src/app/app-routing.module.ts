import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FishComponent } from './fish/fish.component';
import { CatchesComponent } from './catches/catches.component';

const routes: Routes = [
  {path: 'fish', component:FishComponent},
  {path: 'catches', component:CatchesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
