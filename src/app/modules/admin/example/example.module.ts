import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ExampleComponent } from 'app/modules/admin/example/example.component';
import { EmployeesComponent } from 'app/modules/features/employees/employees.component';

const exampleRoutes: Route[] = [
    {
        path     : 'example',
        component: EmployeesComponent
    }
];

@NgModule({
    declarations: [
        ExampleComponent
    ],
    imports     : [
        RouterModule.forChild(exampleRoutes)
    ]
})
export class ExampleModule
{
}
