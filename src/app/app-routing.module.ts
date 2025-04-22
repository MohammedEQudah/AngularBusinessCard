import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CardsComponent } from './cards/cards.component';
import { AddCardComponent } from './add-card/add-card.component';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
