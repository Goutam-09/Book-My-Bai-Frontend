import { Routes, } from '@angular/router';
import { MaincontentComponent } from './homecomponents/maincontent/maincontent.component';
import { RegisterComponentComponent } from './homecomponents/register-component/register-component.component';
import { LoginComponentComponent } from './homecomponents/login-component/login-component.component';
import { AdminDashBoardComponent } from './admincomponents/admin-dash-board/admin-dash-board.component';
import { HomeComponent } from './homecomponents/home/home.component';
import { AdminCountingComponent } from './admincomponents/admin-counting/admin-counting.component';
import { AdminProfileComponent } from './admincomponents/admin-profile/admin-profile.component';
import { UserDashBoardComponent } from './usercomponents/user-dash-board/user-dash-board.component';
import { homeGuard } from './Guards/home.guard';
import path from 'path';
import { UserProfileComponent } from './usercomponents/user-profile/user-profile.component';
import { UserServicesComponent } from './usercomponents/user-services/user-services.component';
import { ServiceAddFormComponent } from './admincomponents/adminforms/service-add-form/service-add-form.component';
import { TimeSlotFormComponent } from './admincomponents/adminforms/time-slot-form/time-slot-form.component';

export const routes: Routes = [



    {
        path: '',
        component: HomeComponent,
        canActivate:[
            homeGuard
        ],
        children: [
            {
                path: '',
                component: MaincontentComponent
            },
            {
                path: 'registerForm',
                component: RegisterComponentComponent
            },
            {
                path: 'loginForm',
                component: LoginComponentComponent,
            }
        ]
    },
    {
        path: 'admin-dashboard',
        component: AdminDashBoardComponent,
        children:[
        {
            path:'',
            component:AdminCountingComponent,
            
        },
        {
            path:'admin-profile',
            component:AdminProfileComponent,
        },
        {
            path:'signout-user',
            component:LoginComponentComponent
        },
        {
            path:'service-form',
            component:ServiceAddFormComponent
        },
        {
            path:'time-slot',
            component:TimeSlotFormComponent
        }
       ]
    },
    {
        path:'user-dashboard',
        component:UserDashBoardComponent,
        children:[
            {
                path:'',
                component:UserServicesComponent
            },
            {
                path:'user-profile',
                component:UserProfileComponent,
            }
            
        ]
    }

];
