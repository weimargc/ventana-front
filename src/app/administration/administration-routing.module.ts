import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { AdministrationComponent } from './administration.component';
import { EdituserscheduleComponent } from './components/edituserschedule/edituserschedule.component';
import { LoadfileComponent } from './components/loadfile/loadfile.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: AdministrationComponent
  },
  {
    path: 'editsch',
    canActivate: [AuthGuard],
    component: EdituserscheduleComponent
  },
  {
    path: 'loadfile',
    canActivate: [AuthGuard],
    component: LoadfileComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
