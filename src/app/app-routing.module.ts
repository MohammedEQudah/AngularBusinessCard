import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CardsComponent } from './cards/cards.component';
import { AddCardComponent } from './add-card/add-card.component';
import { ImportCardComponent } from './import-card/import-card.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'Cards',
    component:CardsComponent
  },
  {
    path:'addCard',
    component:AddCardComponent
  },
  {
    path:'importCard',
    component:ImportCardComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
