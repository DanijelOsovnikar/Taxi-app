import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './core/home-page/home-page.component';
import { ListComponent } from './core/list/list.component';
import { DetailsComponent } from './core/details/details.component';

const routes: Routes = [
  { path: 'list/:id', component: DetailsComponent },
  { path: 'list', component: ListComponent },
  { path: '', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
