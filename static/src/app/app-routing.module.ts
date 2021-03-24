import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { SockCreatorComponent } from './sock-creator/sock-creator.component';
import { SockViewComponent } from './sock-view/sock-view.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'sock-creator', component: SockCreatorComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'sock/:id', component: SockViewComponent },
  { path: 'registration', component: RegistrationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
