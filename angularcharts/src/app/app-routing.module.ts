import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistoricalComponent } from './historical/historical.component';


const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
    },
    {
        path: 'historical',
        component: HistoricalComponent,
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }