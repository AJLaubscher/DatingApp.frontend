import { MembersListComponent } from './members/members-list/members-list.component';
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MembersDetailComponent } from './members/members-detail/members-detail.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { authGuard } from './_gaurds/auth.guard';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [authGuard],
        children: [
            {path: 'members', component: MembersListComponent},
            {path: 'members/:id', component: MembersDetailComponent},
            {path: 'lists', component: ListsComponent},
            {path: 'messages', component: MessagesComponent},
        ]
    },
    {path: 'errors', component: TestErrorsComponent},
    {path: '**', component: HomeComponent, pathMatch: 'full'},
    
];
